const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'antiscam.db');
const JWT_SECRET = process.env.JWT_SECRET || 'antiscam-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'antiscam-refresh-secret-change-in-production';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  nickname TEXT,
  password_hash TEXT,
  age_group TEXT,
  fraud_experience TEXT DEFAULT 'none',
  is_guest INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS auth_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  refresh_token TEXT UNIQUE,
  expires_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_demonstrations (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  scene_id TEXT,
  status TEXT DEFAULT 'in_progress',
  start_time INTEGER DEFAULT (unixepoch()),
  end_time INTEGER,
  final_score INTEGER,
  risk_level TEXT,
  weak_dimensions TEXT,
  actions_log TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_actions (
  id TEXT PRIMARY KEY,
  demonstration_id TEXT,
  stage_id TEXT,
  action_type TEXT,
  action_detail TEXT,
  score_change INTEGER,
  tags TEXT,
  timestamp INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (demonstration_id) REFERENCES user_demonstrations(id)
);

CREATE TABLE IF NOT EXISTS system_configs (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  condition_type TEXT NOT NULL,
  condition_value TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  achievement_id TEXT,
  unlocked_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (achievement_id) REFERENCES achievements(id),
  UNIQUE(user_id, achievement_id)
);
`);

// Seed achievements
const achievementDefs = [
  { id: 'A01', key: 'first_demo', name: '初出茅庐', description: '完成第一次演练', icon: '🎯', condition_type: 'demo_count', condition_value: '1' },
  { id: 'A02', key: 'scene_S01', name: '识破垫付', description: '完成经典垫付单场景', icon: '💳', condition_type: 'complete_scene', condition_value: 'S01' },
  { id: 'A03', key: 'scene_S02', name: '连单警觉', description: '完成连单陷阱场景', icon: '🔗', condition_type: 'complete_scene', condition_value: 'S02' },
  { id: 'A04', key: 'scene_S03', name: '求职防骗', description: '完成虚假招聘场景', icon: '💼', condition_type: 'complete_scene', condition_value: 'S03' },
  { id: 'A05', key: 'scene_S04', name: '高佣免疫', description: '完成高佣返利场景', icon: '📈', condition_type: 'complete_scene', condition_value: 'S04' },
  { id: 'A06', key: 'scene_S05', name: '扫码洞察', description: '完成扫码认证场景', icon: '📱', condition_type: 'complete_scene', condition_value: 'S05' },
  { id: 'A07', key: 'scene_S06', name: '熟人识破', description: '完成假冒熟人场景', icon: '👥', condition_type: 'complete_scene', condition_value: 'S06' },
  { id: 'A08', key: 'score_80', name: '警觉者', description: '单次演练得分达到80分以上', icon: '🛡️', condition_type: 'score_threshold', condition_value: '80' },
  { id: 'A09', key: 'score_100', name: '防骗达人', description: '单次演练获得满分', icon: '🏆', condition_type: 'score_threshold', condition_value: '100' },
  { id: 'A10', key: 'all_scenes', name: '全能防骗王', description: '完成所有6个场景', icon: '👑', condition_type: 'all_scenes', condition_value: '6' },
  { id: 'A11', key: 'demo_3_times', name: '老练', description: '同一场景演练3次以上', icon: '🔄', condition_type: 'scene_repeat', condition_value: '3' },
  { id: 'A12', key: 'total_score_500', name: '累计勋章', description: '累计得分超过500分', icon: '🎖️', condition_type: 'total_score', condition_value: '500' },
  { id: 'A13', key: 'radar_balanced', name: '均衡防守', description: '雷达图所有维度均达到60分以上', icon: '⚖️', condition_type: 'radar_balanced', condition_value: '60' },
];

const insertAch = db.prepare('INSERT OR IGNORE INTO achievements (id, key, name, description, icon, condition_type, condition_value) VALUES (?, ?, ?, ?, ?, ?, ?)');
for (const a of achievementDefs) {
  insertAch.run(a.id, a.key, a.name, a.description, a.icon, a.condition_type, a.condition_value);
}

// Load scenes
let scenesData = {};
try {
  const raw = fs.readFileSync(path.join(DATA_DIR, 'scenes.json'), 'utf8');
  const parsed = JSON.parse(raw);
  parsed.scenes.forEach(s => { scenesData[s.id] = s; });
} catch(e) {
  console.warn('Scenes JSON not found');
}

// ─── Auth Middleware ────────────────────────────────────────────
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    req.userId = null;
    return next();
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.isGuest = false;
    next();
  } catch(e) {
    req.userId = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  if (!req.userId) return res.status(401).json({ success: false, error: '请先登录' });
  next();
};

// ─── Helpers ─────────────────────────────────────────────────
const signTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const saveRefreshToken = (userId, refreshToken) => {
  const id = uuidv4();
  const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
  db.prepare('INSERT INTO auth_tokens (id, user_id, refresh_token, expires_at) VALUES (?, ?, ?, ?)').run(id, userId, refreshToken, expiresAt);
  return expiresAt;
};

const verifyRefreshToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const row = db.prepare('SELECT * FROM auth_tokens WHERE refresh_token = ? AND expires_at > ?').get(token, Math.floor(Date.now() / 1000));
    if (!row) return null;
    return payload;
  } catch(e) { return null; }
};

// Check & unlock achievements after a demo completes
const checkAchievements = (userId) => {
  const unlocked = [];

  // Get all achievements
  const allAchs = db.prepare('SELECT * FROM achievements').all();
  // Get user's already-unlocked
  const userUnlocked = db.prepare('SELECT achievement_id FROM user_achievements WHERE user_id = ?').all(userId).map(r => r.achievement_id);

  const demos = db.prepare('SELECT * FROM user_demonstrations WHERE user_id = ? AND status = ?').all(userId, 'completed');
  const scoredDemos = demos.filter(d => d.final_score != null);
  const totalScore = scoredDemos.reduce((s, d) => s + d.final_score, 0);
  const completedScenes = [...new Set(demos.map(d => d.scene_id))];
  const sceneCounts = {};
  demos.forEach(d => { sceneCounts[d.scene_id] = (sceneCounts[d.scene_id] || 0) + 1; });

  // Radar dims
  const actions = db.prepare(`
    SELECT ua.tags FROM user_actions ua
    JOIN user_demonstrations ud ON ud.id = ua.demonstration_id
    WHERE ud.user_id = ? AND ud.status = 'completed'
  `).all(userId);
  const dimMap = {
    '话术识别': ['识别诱饵','识破本质','识破伪造','识破异常','主动核实','核实信息','核实身份','查证识破','识破话术','识破套路','识破伪装','质疑来源','轻信熟人','轻信招聘','轻信短信'],
    '紧急判断': ['质疑规则','质疑金额','质疑异常','质疑垫付','质疑安全','质疑权限','质疑计算','冲动报名','冲动垫付','冲动转账','冲动点击','恐慌反应','犹豫不决','犹豫','试探','接受任务','被迫继续'],
    '止损意识': ['见好就收','止损觉醒','止损报警','止损退出','坚持提现','要求退款','要求退出','识破操作','沉没成本','继续垫付','继续转账','加大投入','大额垫付','继续任务','借贷转账','贷款转账','放弃止损','陷入困境','填写敏感信息','泄露验证码','接受复购'],
    '证据保留': ['保留证据','记录聊天','核实单号'],
    '报案流程': ['正确报警','报警','止损报警']
  };
  const dims = { '话术识别': 0, '紧急判断': 0, '止损意识': 0, '证据保留': 0, '报案流程': 0 };
  const dimCount = {};
  actions.forEach(a => {
    try {
      const tags = JSON.parse(a.tags);
      tags.forEach(t => {
        if (dimMap['话术识别'].includes(t)) { dims['话术识别'] += 15; dimCount['话术识别'] = (dimCount['话术识别'] || 0) + 1; }
        if (dimMap['紧急判断'].includes(t)) { dims['紧急判断'] += 15; dimCount['紧急判断'] = (dimCount['紧急判断'] || 0) + 1; }
        if (dimMap['止损意识'].includes(t)) { dims['止损意识'] += 15; dimCount['止损意识'] = (dimCount['止损意识'] || 0) + 1; }
        if (dimMap['证据保留'].includes(t)) { dims['证据保留'] += 15; dimCount['证据保留'] = (dimCount['证据保留'] || 0) + 1; }
        if (dimMap['报案流程'].includes(t)) { dims['报案流程'] += 15; dimCount['报案流程'] = (dimCount['报案流程'] || 0) + 1; }
      });
    } catch(e) {}
  });
  Object.keys(dims).forEach(k => { dims[k] = Math.min(100, dims[k]); });

  for (const ach of allAchs) {
    if (userUnlocked.includes(ach.id)) continue;
    let shouldUnlock = false;


    switch (ach.condition_type) {
      case 'demo_count':
        shouldUnlock = demos.length >= parseInt(ach.condition_value);
        break;
      case 'complete_scene':
        shouldUnlock = completedScenes.includes(ach.condition_value);
        break;
      case 'score_threshold':
        shouldUnlock = scoredDemos.some(d => d.final_score >= parseInt(ach.condition_value));
        break;
      case 'all_scenes':
        shouldUnlock = completedScenes.length >= parseInt(ach.condition_value);
        break;
      case 'scene_repeat':
        shouldUnlock = Object.values(sceneCounts).some(c => c >= parseInt(ach.condition_value));
        break;
      case 'total_score':
        shouldUnlock = totalScore >= parseInt(ach.condition_value);
        break;
      case 'radar_balanced':
        shouldUnlock = Object.values(dims).every(v => v >= parseInt(ach.condition_value));
        break;
    }

    if (shouldUnlock) {
      db.prepare('INSERT INTO user_achievements (id, user_id, achievement_id) VALUES (?, ?, ?)').run(uuidv4(), userId, ach.id);
      unlocked.push(ach);
    }
  }

  return unlocked;
};

app.use(cors());
app.use(express.json());
app.use(authenticateToken);
app.use(express.static(path.join(__dirname, '../dist')));

// ─── Auth Routes ───────────────────────────────────────────────

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, nickname } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: '邮箱和密码不能为空' });
  if (password.length < 6) return res.status(400).json({ success: false, error: '密码至少6位' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existing) return res.status(409).json({ success: false, error: '该邮箱已注册' });

  const password_hash = await bcrypt.hash(password, 12);
  const userId = uuidv4();
  db.prepare('INSERT INTO users (id, email, password_hash, nickname, is_guest) VALUES (?, ?, ?, ?, 0)').run(userId, email.toLowerCase(), password_hash, nickname || email.split('@')[0]);

  const { accessToken, refreshToken } = signTokens(userId);
  saveRefreshToken(userId, refreshToken);

  res.json({ success: true, data: { user_id: userId, access_token: accessToken, refresh_token: refreshToken, user: { id: userId, email: email.toLowerCase(), nickname: nickname || '', is_guest: false } } });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: '邮箱和密码不能为空' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!user) return res.status(401).json({ success: false, error: '邮箱或密码错误' });
  if (user.is_guest) return res.status(401).json({ success: false, error: '该账号为游客模式，请使用其他邮箱注册' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ success: false, error: '邮箱或密码错误' });

  const { accessToken, refreshToken } = signTokens(user.id);
  saveRefreshToken(user.id, refreshToken);

  res.json({ success: true, data: { user_id: user.id, access_token: accessToken, refresh_token: refreshToken, user: { id: user.id, email: user.email, nickname: user.nickname || '', is_guest: false } } });
});

// Refresh token
app.post('/api/auth/refresh', (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(400).json({ success: false, error: 'refresh_token required' });

  const payload = verifyRefreshToken(refresh_token);
  if (!payload) return res.status(401).json({ success: false, error: 'token已过期，请重新登录' });

  // Delete old refresh token
  db.prepare('DELETE FROM auth_tokens WHERE refresh_token = ?').run(refresh_token);

  const { accessToken, refreshToken } = signTokens(payload.userId);
  saveRefreshToken(payload.userId, refreshToken);

  res.json({ success: true, data: { access_token: accessToken, refresh_token: refreshToken } });
});

// Logout
app.post('/api/auth/logout', requireAuth, (req, res) => {
  db.prepare('DELETE FROM auth_tokens WHERE user_id = ?').run(req.userId);
  res.json({ success: true });
});

// Guest mode - create anonymous account
app.post('/api/auth/guest', (req, res) => {
  const guestId = 'guest_' + uuidv4().replace(/-/g, '').slice(0, 16);
  const nickname = '游客_' + Math.random().toString(36).slice(2, 6);
  db.prepare('INSERT INTO users (id, nickname, is_guest) VALUES (?, ?, 1)').run(guestId, nickname);

  const { accessToken, refreshToken } = signTokens(guestId);
  saveRefreshToken(guestId, refreshToken);

  res.json({ success: true, data: { user_id: guestId, access_token: accessToken, refresh_token: refreshToken, user: { id: guestId, nickname, is_guest: true } } });
});

// ─── Scenes ───────────────────────────────────────────────────
app.get('/api/scenes', (req, res) => {
  const list = Object.values(scenesData).map(s => ({
    id: s.id, name: s.name, category: s.category,
    description: s.description, difficulty: s.difficulty,
    estimated_time: s.estimated_time
  }));
  res.json({ success: true, data: list });
});

app.get('/api/scenes/:id', (req, res) => {
  const scene = scenesData[req.params.id];
  if (!scene) return res.status(404).json({ success: false, error: 'Scene not found' });
  res.json({ success: true, data: scene });
});

// ─── Demonstrations ───────────────────────────────────────────
app.post('/api/demonstrations', (req, res) => {
  // Support both authenticated and guest user_id override
  const targetUserId = req.userId || req.body.user_id;
  const { scene_id } = req.body;
  if (!scene_id) return res.status(400).json({ success: false, error: 'scene_id required' });
  if (!targetUserId) return res.status(400).json({ success: false, error: 'user_id required' });

  // Ensure user exists
  const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get(targetUserId);
  if (!existingUser) return res.status(404).json({ success: false, error: 'User not found' });

  const demoId = uuidv4();
  db.prepare('INSERT INTO user_demonstrations (id, user_id, scene_id) VALUES (?, ?, ?)').run(demoId, targetUserId, scene_id);

  res.json({ success: true, data: { demonstration_id: demoId, user_id: targetUserId } });
});

app.post('/api/demonstrations/:id/actions', (req, res) => {
  const { stage_id, action_type, action_detail, score_change, tags } = req.body;
  const actionId = uuidv4();
  db.prepare(`INSERT INTO user_actions (id, demonstration_id, stage_id, action_type, action_detail, score_change, tags) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(actionId, req.params.id, stage_id, action_type, action_detail || '', score_change || 0, JSON.stringify(tags || []));
  res.json({ success: true, data: { action_id: actionId } });
});

app.patch('/api/demonstrations/:id', (req, res) => {
  const { status, final_score, risk_level, weak_dimensions } = req.body;
  const demo = db.prepare('SELECT * FROM user_demonstrations WHERE id = ?').get(req.params.id);
  if (!demo) return res.status(404).json({ success: false, error: 'Demonstration not found' });

  // Only allow the demo owner to update
  if (req.userId && demo.user_id !== req.userId) return res.status(403).json({ success: false, error: '无权限' });

  const updates = ['status = ?', 'end_time = unixepoch()'];
  const params = [status || 'completed'];

  if (final_score !== undefined) { updates.push('final_score = ?'); params.push(final_score); }
  if (risk_level !== undefined) { updates.push('risk_level = ?'); params.push(risk_level); }
  if (weak_dimensions !== undefined) { updates.push('weak_dimensions = ?'); params.push(JSON.stringify(weak_dimensions)); }

  params.push(req.params.id);
  db.prepare(`UPDATE user_demonstrations SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  // Check achievements on completion
  let newAchievements = [];
  if (status === 'completed' || status === 'completed_completed') {
    newAchievements = checkAchievements(demo.user_id);
  }

  res.json({ success: true, data: { new_achievements: newAchievements } });
});

// ─── Stats ─────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE status != ?').get('in_progress');
  const avgScore = db.prepare('SELECT AVG(final_score) as avg FROM user_demonstrations WHERE final_score IS NOT NULL').get();
  const highRisk = db.prepare("SELECT COUNT(*) as c FROM user_demonstrations WHERE risk_level = 'high' OR risk_level = 'critical'").get();

  const scoreRanges = {
    '0-20': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 0 AND 20').get().c,
    '21-40': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 21 AND 40').get().c,
    '41-60': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 41 AND 60').get().c,
    '61-80': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 61 AND 80').get().c,
    '81-100': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 81 AND 100').get().c,
  };

  const sceneStats = db.prepare(`
    SELECT scene_id, COUNT(*) as attempts, AVG(final_score) as avg_score,
      SUM(CASE WHEN risk_level IN ('high','critical') THEN 1 ELSE 0 END) as high_risk_count
    FROM user_demonstrations WHERE status != 'in_progress' GROUP BY scene_id
  `).all();

  const weakDimRows = db.prepare("SELECT weak_dimensions FROM user_demonstrations WHERE weak_dimensions IS NOT NULL").all();
  const dimCounts = {};
  weakDimRows.forEach(row => {
    try {
      JSON.parse(row.weak_dimensions).forEach(d => { dimCounts[d] = (dimCounts[d] || 0) + 1; });
    } catch(e) {}
  });

  res.json({ success: true, data: { total_demonstrations: total.c, avg_score: Math.round(avgScore.avg || 0), high_risk_count: highRisk.c, high_risk_rate: total.c > 0 ? Math.round(highRisk.c / total.c * 100) : 0, score_distribution: scoreRanges, scene_stats: sceneStats, weak_dimensions: dimCounts, update_time: new Date().toISOString() } });
});

// ─── User ──────────────────────────────────────────────────────
app.get('/api/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  // Only allow owner or same-user access
  if (req.userId && user.id !== req.userId) return res.status(403).json({ success: false, error: '无权限' });
  res.json({ success: true, data: { id: user.id, email: user.email || '', nickname: user.nickname || '', age_group: user.age_group || '', fraud_experience: user.fraud_experience || 'none', is_guest: !!user.is_guest, created_at: user.created_at } });
});

app.put('/api/users/:id/profile', (req, res) => {
  if (req.userId && req.userId !== req.params.id) return res.status(403).json({ success: false, error: '无权限' });
  const { nickname, age_group, fraud_experience } = req.body;
  const updates = [], params = [];
  if (nickname !== undefined) { updates.push('nickname = ?'); params.push(nickname); }
  if (age_group !== undefined) { updates.push('age_group = ?'); params.push(age_group); }
  if (fraud_experience !== undefined) { updates.push('fraud_experience = ?'); params.push(fraud_experience); }
  if (updates.length === 0) return res.status(400).json({ success: false, error: 'No fields to update' });
  params.push(req.params.id);
  try {
    db.prepare('UPDATE users SET ' + updates.join(', ') + ' WHERE id = ?').run(...params);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: { id: user.id, email: user.email || '', nickname: user.nickname, age_group: user.age_group, fraud_experience: user.fraud_experience } });
  } catch(e) { res.status(500).json({ success: false, error: e.message }); }
});

app.get('/api/users/:id/stats', (req, res) => {
  const targetUserId = req.params.id;
  // Allow if authenticated as same user
  if (req.userId && req.userId !== targetUserId) return res.status(403).json({ success: false, error: '无权限' });

  const demos = db.prepare('SELECT * FROM user_demonstrations WHERE user_id = ? ORDER BY start_time DESC').all(targetUserId);
  const totalDemos = demos.length;
  const scored = demos.filter(d => d.final_score != null);
  const avgScore = scored.length > 0 ? scored.reduce((s, d) => s + d.final_score, 0) / scored.length : 0;
  const totalScore = scored.reduce((s, d) => s + d.final_score, 0);

  const sceneCounts = {};
  const riskCounts = { low: 0, medium: 0, high: 0, critical: 0 };
  demos.forEach(d => {
    sceneCounts[d.scene_id] = (sceneCounts[d.scene_id] || 0) + 1;
    if (d.risk_level) riskCounts[d.risk_level] = (riskCounts[d.risk_level] || 0) + 1;
  });

  const actions = db.prepare(`
    SELECT ua.tags FROM user_actions ua
    JOIN user_demonstrations ud ON ud.id = ua.demonstration_id
    WHERE ud.user_id = ? AND ud.status != 'in_progress'
  `).all(targetUserId);

  const dims = { '话术识别': 0, '紧急判断': 0, '止损意识': 0, '证据保留': 0, '报案流程': 0 };
  const dimMap = {
    '话术识别': ['识别诱饵','识破本质','识破伪造','识破异常','主动核实','核实信息','核实身份','查证识破','识破话术','识破套路','识破伪装','质疑来源','轻信熟人','轻信招聘','轻信短信'],
    '紧急判断': ['质疑规则','质疑金额','质疑异常','质疑垫付','质疑安全','质疑权限','质疑计算','冲动报名','冲动垫付','冲动转账','冲动点击','恐慌反应','犹豫不决','犹豫','试探','接受任务','被迫继续'],
    '止损意识': ['见好就收','止损觉醒','止损报警','止损退出','坚持提现','要求退款','要求退出','识破操作','沉没成本','继续垫付','继续转账','加大投入','大额垫付','继续任务','借贷转账','贷款转账','放弃止损','陷入困境','填写敏感信息','泄露验证码','接受复购'],
    '证据保留': ['保留证据','记录聊天','核实单号'],
    '报案流程': ['正确报警','报警','止损报警']
  };
  actions.forEach(a => {
    try {
      const tags = JSON.parse(a.tags);
      tags.forEach(t => {
        Object.entries(dimMap).forEach(([dim, tagList]) => {
          if (tagList.includes(t)) dims[dim] = Math.min(100, dims[dim] + 15);
        });
      });
    } catch(e) {}
  });

  res.json({ success: true, data: { total_demos: totalDemos, avg_score: Math.round(avgScore), total_score: totalScore, scene_distribution: sceneCounts, risk_distribution: riskCounts, radar_dimensions: dims } });
});

// ─── Achievements ──────────────────────────────────────────────
app.get('/api/achievements', (req, res) => {
  const allAchs = db.prepare('SELECT * FROM achievements ORDER BY id').all();
  if (!req.userId) return res.json({ success: true, data: allAchs.map(a => ({ ...a, unlocked: false })) });

  const userAchs = db.prepare('SELECT achievement_id, unlocked_at FROM user_achievements WHERE user_id = ?').all(req.userId);
  const unlockedMap = {};
  userAchs.forEach(r => { unlockedMap[r.achievement_id] = r.unlocked_at; });

  res.json({ success: true, data: allAchs.map(a => ({ ...a, unlocked: !!unlockedMap[a.id], unlocked_at: unlockedMap[a.id] || null })) });
});

app.get('/api/users/:id/achievements', (req, res) => {
  if (req.userId && req.userId !== req.params.id) return res.status(403).json({ success: false, error: '无权限' });
  const userAchs = db.prepare(`
    SELECT a.*, ua.unlocked_at
    FROM user_achievements ua
    JOIN achievements a ON a.id = ua.achievement_id
    WHERE ua.user_id = ?
    ORDER BY ua.unlocked_at DESC
  `).all(req.params.id);
  res.json({ success: true, data: userAchs });
});

// ─── SPA fallback ──────────────────────────────────────────────
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(distIndex)) res.sendFile(distIndex);
  else res.send('<p>Build the frontend first: <code>npm run build</code></p>');
});

app.listen(PORT, () => {
  console.log(`AntiScam server running on port ${PORT}`);
  console.log(`Database: ${DB_PATH}`);
  console.log(`Scenes loaded: ${Object.keys(scenesData).length}`);
});