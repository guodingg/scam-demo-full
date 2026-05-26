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

// In-memory rate limiting: { ip: { count, resetAt } }
const authRateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 auth requests per minute

const checkRateLimit = (req, res, type) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const key = `${ip}:${type}`;
  const now = Date.now();
  if (!authRateLimit[key] || authRateLimit[key].resetAt < now) {
    authRateLimit[key] = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
    return true;
  }
  if (authRateLimit[key].count >= RATE_LIMIT_MAX) {
    return false;
  }
  authRateLimit[key].count++;
  return true;
};

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  nickname TEXT,
  password_hash TEXT,
  age_group TEXT,
  fraud_experience TEXT DEFAULT 'none',
  is_guest INTEGER DEFAULT 0,
  is_admin INTEGER DEFAULT 0,
  linked_guest_id TEXT,
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

CREATE TABLE IF NOT EXISTS ai_configs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  scene TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  api_key TEXT,
  base_url TEXT,
  system_prompt TEXT,
  config_params TEXT,
  enabled INTEGER DEFAULT 1,
  is_default INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_by TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS ai_chat_history (
  id TEXT PRIMARY KEY,
  demonstration_id TEXT,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
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

// ─── Auth Routes ───────────────────────────────────────────────

// Register
app.post('/api/auth/register', async (req, res) => {
  if (!checkRateLimit(req, res, 'register')) return res.status(429).json({ success: false, error: '操作过于频繁，请1分钟后再试' });
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
  if (!checkRateLimit(req, res, 'login')) return res.status(429).json({ success: false, error: '登录次数超限，请1分钟后再试' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: '邮箱和密码不能为空' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
  if (!user) return res.status(401).json({ success: false, error: '邮箱或密码错误' });
  if (user.is_guest) return res.status(401).json({ success: false, error: '该账号为游客模式，请使用其他邮箱注册' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ success: false, error: '邮箱或密码错误' });

  const { accessToken, refreshToken } = signTokens(user.id);
  saveRefreshToken(user.id, refreshToken);

  res.json({ success: true, data: { user_id: user.id, access_token: accessToken, refresh_token: refreshToken, user: { id: user.id, email: user.email, nickname: user.nickname || '', is_guest: false, is_admin: !!user.is_admin } } });
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

// Change password
app.put('/api/auth/password', requireAuth, async (req, res) => {
  const { old_password, new_password } = req.body;
  if (!old_password || !new_password) return res.status(400).json({ success: false, error: '旧密码和新密码都不能为空' });
  if (new_password.length < 6) return res.status(400).json({ success: false, error: '新密码至少6位' });
  if (old_password === new_password) return res.status(400).json({ success: false, error: '新密码不能与旧密码相同' });

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ success: false, error: '用户不存在' });
  if (user.is_guest) return res.status(400).json({ success: false, error: '游客账号不支持修改密码，请先注册正式账号' });

  const valid = await bcrypt.compare(old_password, user.password_hash);
  if (!valid) return res.status(401).json({ success: false, error: '旧密码错误' });

  const password_hash = await bcrypt.hash(new_password, 12);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(password_hash, req.userId);
  res.json({ success: true, message: '密码修改成功' });
});

// Guest binding: migrate guest data to registered account
app.post('/api/auth/bind-guest', requireAuth, async (req, res) => {
  const guest_id = req.body.guest_id;
  if (!guest_id) return res.status(400).json({ success: false, error: 'guest_id required' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ success: false, error: '用户不存在' });
  if (!user.is_guest) return res.status(400).json({ success: false, error: '只有游客账号才能绑定' });


  // Migrate demonstrations and actions from guest to current user
  db.prepare('UPDATE user_demonstrations SET user_id = ? WHERE user_id = ?').run(req.userId, guest_id);
  db.prepare('UPDATE user_achievements SET user_id = ? WHERE user_id = ?').run(req.userId, guest_id);
  db.prepare('UPDATE auth_tokens SET user_id = ? WHERE user_id = ?').run(req.userId, guest_id);
  // Mark guest as migrated
  db.prepare('UPDATE users SET linked_guest_id = ?, email = ? WHERE id = ?').run(guest_id, user.email, req.userId);
  db.prepare('DELETE FROM users WHERE id = ?').run(guest_id);
  res.json({ success: true, message: '账号绑定成功，历史演练数据已保留' });
});

// Export user data (GDPR)
app.get('/api/users/:id/export', requireAuth, (req, res) => {
  if (req.userId !== req.params.id) return res.status(403).json({ success: false, error: '无权限' });
  const user = db.prepare('SELECT id, email, nickname, age_group, fraud_experience, is_guest, created_at FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ success: false, error: '用户不存在' });
  const demos = db.prepare('SELECT * FROM user_demonstrations WHERE user_id = ?').all(req.userId);
  const achs = db.prepare('SELECT a.*, ua.unlocked_at FROM user_achievements ua JOIN achievements a ON a.id = ua.achievement_id WHERE ua.user_id = ?').all(req.userId);
  res.json({ success: true, data: { user, demonstrations: demos, achievements: achs } });
});


// Delete user account (GDPR)
app.delete('/api/users/:id', requireAuth, (req, res) => {
  if (req.userId !== req.params.id) return res.status(403).json({ success: false, error: '无权限' });
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ success: false, error: '用户不存在' });
  if (user.is_guest) return res.status(400).json({ success: false, error: '游客账号无法注销，请注册正式账号' });

  db.prepare('DELETE FROM user_actions WHERE demonstration_id IN (SELECT id FROM user_demonstrations WHERE user_id = ?)').run(req.userId);
  db.prepare('DELETE FROM user_demonstrations WHERE user_id = ?').run(req.userId);
  db.prepare('DELETE FROM user_achievements WHERE user_id = ?').run(req.userId);
  db.prepare('DELETE FROM auth_tokens WHERE user_id = ?').run(req.userId);
  db.prepare('DELETE FROM users WHERE id = ?').run(req.userId);
  res.json({ success: true, message: '账号已注销' });
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
  try {
    const list = Object.values(scenesData).map(s => ({
      id: s.id, name: s.name, category: s.category,
      description: s.description, difficulty: s.difficulty,
      estimated_time: s.estimated_time
    }));
    console.log('[DEBUG] /api/scenes returning', list.length, 'items');
    res.json({ success: true, data: list });
  } catch(e) {
    console.error('[ERROR] /api/scenes:', e);
    res.status(500).json({ success: false, error: e.message });
  }
});

app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong', ts: Date.now() });
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
  res.json({ success: true, data: { id: user.id, email: user.email || '', nickname: user.nickname || '', age_group: user.age_group || '', fraud_experience: user.fraud_experience || 'none', is_guest: !!user.is_guest, is_admin: !!user.is_admin, created_at: user.created_at } });
});

app.put('/api/users/:id/profile', (req, res) => {
  if (req.userId && req.userId !== req.params.id) return res.status(403).json({ success: false, error: '无权限' });
  const { nickname, age_group, fraud_experience, password } = req.body;
  const updates = [], params = [];
  if (nickname !== undefined) { updates.push('nickname = ?'); params.push(nickname); }
  if (age_group !== undefined) { updates.push('age_group = ?'); params.push(age_group); }
  if (fraud_experience !== undefined) { updates.push('fraud_experience = ?'); params.push(fraud_experience); }
  if (password !== undefined && password !== '') {
    if (password.length < 6) return res.status(400).json({ success: false, error: '密码至少6位' });
    updates.push('password_hash = ?'); params.push(bcrypt.hashSync(password, 10));
  }
  if (updates.length === 0) return res.status(400).json({ success: false, error: 'No fields to update' });
  params.push(req.params.id);
  try {
    db.prepare('UPDATE users SET ' + updates.join(', ') + ' WHERE id = ?').run(...params);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: { id: user.id, email: user.email || '', nickname: user.nickname, age_group: user.age_group, fraud_experience: user.fraud_experience, is_guest: !!user.is_guest } });
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

// ─── Admin: AI Configs (per-scene multi-provider) ───────────────────────
app.get('/api/admin/ai-configs', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const { scene, provider } = req.query;
  let query = 'SELECT * FROM ai_configs WHERE 1=1';
  const params = [];
  if (scene) { query += ' AND scene = ?'; params.push(scene); }
  if (provider) { query += ' AND provider = ?'; params.push(provider); }
  query += ' ORDER BY display_order, created_at DESC';
  const configs = db.prepare(query).all(...params);
  res.json({ success: true, data: configs.map(c => ({ ...c, api_key: c.api_key ? '[已设置]' : '[未设置]' })) });
});

app.post('/api/admin/ai-configs', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const { name, scene, provider, model, api_key, base_url, system_prompt, config_params, enabled, is_default, display_order } = req.body;
  if (!name || !scene || !provider || !model) return res.status(400).json({ success: false, error: 'name, scene, provider, model 必填' });
  if (is_default) db.prepare('UPDATE ai_configs SET is_default = 0 WHERE scene = ?').run(scene);
  const id = require('uuid').v4();
  db.prepare(`INSERT INTO ai_configs (id, name, scene, provider, model, api_key, base_url, system_prompt, config_params, enabled, is_default, display_order, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    id, name, scene, provider, model, api_key || '', base_url || '', system_prompt || '',
    JSON.stringify(config_params || {}), enabled !== false ? 1 : 0, is_default ? 1 : 0, display_order || 0, req.userId
  );
  const config = db.prepare('SELECT * FROM ai_configs WHERE id = ?').get(id);
  res.json({ success: true, data: { ...config, api_key: config.api_key ? '[已设置]' : '[未设置]' } });
});

app.put('/api/admin/ai-configs/:id', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const config = db.prepare('SELECT * FROM ai_configs WHERE id = ?').get(req.params.id);
  if (!config) return res.status(404).json({ success: false, error: '配置不存在' });
  const { name, scene, provider, model, api_key, base_url, system_prompt, config_params, enabled, is_default, display_order } = req.body;
  if (is_default && !config.is_default) db.prepare('UPDATE ai_configs SET is_default = 0 WHERE scene = ?').run(scene || config.scene);
  const fields = ['name','scene','provider','model','base_url','system_prompt','config_params','enabled','is_default','display_order'];
  const values = { name, scene, provider, model, base_url, system_prompt, config_params, enabled, is_default, display_order };
  const updates = []; const params = [];
  for (const f of fields) {
    if (values[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(f === 'config_params' ? JSON.stringify(values[f]) : (f === 'enabled' || f === 'is_default' ? (values[f] ? 1 : 0) : values[f]));
    }
  }
  if (api_key) { updates.push('api_key = ?'); params.push(api_key); }
  updates.push('updated_at = unixepoch()');
  params.push(req.params.id);
  db.prepare(`UPDATE ai_configs SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  const updated = db.prepare('SELECT * FROM ai_configs WHERE id = ?').get(req.params.id);
  res.json({ success: true, data: { ...updated, api_key: updated.api_key ? '[已设置]' : '[未设置]' } });
});

app.delete('/api/admin/ai-configs/:id', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const config = db.prepare('SELECT * FROM ai_configs WHERE id = ?').get(req.params.id);
  if (!config) return res.status(404).json({ success: false, error: '配置不存在' });
  db.prepare('DELETE FROM ai_configs WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.get('/api/admin/scenes-list', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const scenes = db.prepare('SELECT DISTINCT scene FROM ai_configs ORDER BY scene').all().map(r => r.scene);
  res.json({ success: true, data: scenes });
});

app.post('/api/admin/users/:id/toggle-admin', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  if (req.params.id === req.userId) return res.status(400).json({ success: false, error: '不能修改自己的管理员状态' });
  const target = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!target) return res.status(404).json({ success: false, error: '用户不存在' });
  const newVal = target.is_admin ? 0 : 1;
  db.prepare('UPDATE users SET is_admin = ? WHERE id = ?').run(newVal, req.params.id);
  res.json({ success: true, data: { is_admin: newVal } });
});

// ─── AI Chat ──────────────────────────────────────────────────
const AI_PROVIDERS = {
  minimax: { baseUrl: 'https://api.minimaxi.chat/v1', model: 'MiniMax-M2.7', name: 'MiniMax' },
  moonshot: { baseUrl: 'https://api.moonshot.cn/v1', model: 'moonshot-v1-8k', name: 'Kimi' },
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini', name: 'OpenAI' },
  qwen: { baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus', name: '通义千问' },
  wenxin: { baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1', model: 'ernie-4.0-8k-latest', name: '文心一言' },
  custom: { baseUrl: '', model: '', name: '自定义' },
  deepseek: { baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat', name: 'DeepSeek' },
};

const getAiConfig = () => {
  try {
    const row = db.prepare('SELECT value FROM system_configs WHERE key = ?').get('ai_config');
    return row ? JSON.parse(row.value) : { provider: 'minimax', api_key: '', model: '' };
  } catch(e) { return { provider: 'minimax', api_key: '', model: '' }; }
};

const saveAiConfig = (config) => {
  db.prepare('INSERT OR REPLACE INTO system_configs (key, value, updated_at) VALUES (?, ?, unixepoch())').run('ai_config', JSON.stringify(config));
};

const callAi = async (messages, userId, sceneId) => {
  // Find AI config for this scene, fallback to system default
  let config = { provider: 'minimax', api_key: '', model: '' };
  try {
    if (sceneId) {
      const row = db.prepare('SELECT * FROM ai_configs WHERE scene = ? AND enabled = 1 ORDER BY is_default DESC, display_order ASC LIMIT 1').get(sceneId);
      if (row && row.api_key) {
        config = { provider: row.provider, api_key: row.api_key, model: row.model, base_url: row.base_url || '' };
      }
    }
    if (!config.api_key) {
      const sys = db.prepare('SELECT value FROM system_configs WHERE key = ?').get('ai_config');
      if (sys) { const c = JSON.parse(sys.value); if (c.api_key) config = c; }
    }
  } catch(e) { /* fallback to defaults */ }
  if (!config.api_key) throw new Error('AI未配置，请管理员在后台设置API密钥');
  const provider = AI_PROVIDERS[config.provider] || AI_PROVIDERS.minimax;
  const baseUrl = config.base_url || provider.baseUrl;
  const endpoint = baseUrl + '/chat/completions';
  const body = { model: config.model || provider.model, messages, stream: false };
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.api_key}` };
  if (config.provider === 'wenxin') {
    headers['Authorization'] = `Bearer ${config.api_key}`;
  }
  const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI请求失败: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
};

// Admin: get AI config
app.get('/api/admin/ai-config', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const config = getAiConfig();
  config.api_key = config.api_key ? config.api_key.slice(0, 6) + '***' + config.api_key.slice(-4) : '';
  res.json({ success: true, data: config });
});

// Admin: update AI config
app.put('/api/admin/ai-config', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const { provider, api_key, model } = req.body;
  if (!provider) return res.status(400).json({ success: false, error: 'provider required' });
  const current = getAiConfig();
  saveAiConfig({ provider, api_key: api_key || current.api_key, model: model || AI_PROVIDERS[provider]?.model || '' });
  res.json({ success: true });
});

// Admin: dashboard stats
app.get('/api/admin/stats', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users WHERE is_guest = 0').get().c;
  const todayStart = Math.floor(Date.now() / 1000) - 86400;
  const todayDemos = db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE start_time > ?').get(todayStart).c;
  const totalDemos = db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE status != ?').get('in_progress').c;
  const avgScore = db.prepare('SELECT AVG(final_score) as avg FROM user_demonstrations WHERE final_score IS NOT NULL').get().avg || 0;
  const sceneStats = db.prepare('SELECT scene_id, COUNT(*) as count FROM user_demonstrations GROUP BY scene_id ORDER BY count DESC LIMIT 6').all();
  res.json({ success: true, data: { total_users: totalUsers, today_demos: todayDemos, total_demos: totalDemos, avg_score: Math.round(avgScore), scene_stats: sceneStats } });
});

// Admin: list users (paginated)
app.get('/api/admin/users', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  const users = db.prepare('SELECT id, email, nickname, is_guest, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
  const total = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  res.json({ success: true, data: { users, total, page, pages: Math.ceil(total / limit) } });
});

// Admin: list today's demos
app.get('/api/admin/demos', requireAuth, (req, res) => {
  const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.userId);
  if (!user?.is_admin) return res.status(403).json({ success: false, error: '需要管理员权限' });
  const todayStart = Math.floor(Date.now() / 1000) - 86400;
  const demos = db.prepare(`
    SELECT ud.id, ud.user_id, ud.scene_id, ud.status, ud.final_score, ud.start_time,
      u.nickname, u.email
    FROM user_demonstrations ud
    LEFT JOIN users u ON u.id = ud.user_id
    WHERE ud.start_time > ?
    ORDER BY ud.start_time DESC
    LIMIT 50
  `).all(todayStart);
  res.json({ success: true, data: demos });
});

// AI Chat: send message (non-streaming for simplicity)
app.post('/api/ai/chat', requireAuth, (req, res) => {
  const { scene_id, demonstration_id, message, history } = req.body;
  if (!message?.trim()) return res.status(400).json({ success: false, error: '消息不能为空' });
  const scene = scenesData[scene_id];
  if (!scene) return res.status(404).json({ success: false, error: '场景不存在' });
  const userId = req.userId;
  const demoId = demonstration_id || null;
  // Build system prompt
  const systemPrompt = `你是一个诈骗分子，正在模拟"${scene.name}"诈骗场景。
诈骗类型: ${scene.category}
场景描述: ${scene.description}
你的角色设定: ${scene.ai_persona || '一个狡猾的诈骗分子，善于利用心理弱点诱导受害者转账。'}

要求:
1. 完全沉浸在角色中，用聊天的方式一步步诱导用户
2. 当需要让用户转账时，生成一个"转账面板"格式指令: [TRANSFER:金额:收款人:备注]
3. 不要透露自己是AI或提及任何关于诈骗教育的内容
4. 用户在尝试"防范"，你要绕过他们的防备
5. 回复简短自然，像真实聊天（1-3句话）
6. 当用户明确拒绝或表现出警惕时，不要强迫，换个角度继续
7. 如果用户已经转账或被骗成功，可以结束对话并输出 [END:诈骗成功]
8. 如果用户识破骗局，可以输出 [END:用户识破]`;
  const msgs = [{ role: 'system', content: systemPrompt }];
  if (history && history.length > 0) msgs.push(...history.map(h => ({ role: h.role === 'scammer' ? 'assistant' : 'user', content: h.content })));
  msgs.push({ role: 'user', content: message });
  callAi(msgs, userId, scene_id).then(reply => {
    // Save to history
    const id1 = uuidv4(), id2 = uuidv4();
    db.prepare('INSERT INTO ai_chat_history (id, demonstration_id, user_id, role, content) VALUES (?, ?, ?, ?, ?)').run(id1, demoId, userId, 'user', message);
    db.prepare('INSERT INTO ai_chat_history (id, demonstration_id, user_id, role, content) VALUES (?, ?, ?, ?, ?)').run(id2, demoId, userId, 'scammer', reply);
    // Parse transfer指令
    let transfer = null;
    const transferMatch = reply.match(/\[TRANSFER:([^:]+):([^:]+):([^\]]+)\]/);
    if (transferMatch) {
      transfer = { amount: transferMatch[1], recipient: transferMatch[2], note: transferMatch[3] };
    }
    const ended = reply.includes('[END:') ? (reply.includes('诈骗成功') ? 'scammed' : 'detected') : null;
    res.json({ success: true, data: { reply, transfer, ended } });
  }).catch(err => {
    res.status(500).json({ success: false, error: err.message });
  });
});

// AI Chat: get history for a demo
app.get('/api/ai/chat/:demoId', requireAuth, (req, res) => {
  const history = db.prepare('SELECT role, content, created_at FROM ai_chat_history WHERE demonstration_id = ? ORDER BY created_at ASC').all(req.params.demoId);
  res.json({ success: true, data: history });
});

const distIndexPath = path.join(__dirname, '../dist/index.html');

// ─── SPA fallback + static assets (must be last) ────────────────────────
app.get('*', (req, res) => {
  const url = req.path;
  // Serve static assets from /app/dist/assets/
  if (url.startsWith('/assets/')) {
    const filePath = path.join(__dirname, '../dist', url);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(url);
      const mimeTypes = {
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
      };
      res.type(mimeTypes[ext] || 'application/octet-stream').sendFile(filePath);
      return;
    }
  }
  // Inject scenes data into index.html for all other routes
  if (fs.existsSync(distIndexPath)) {
    let html = fs.readFileSync(distIndexPath, 'utf8');
    const scenesJson = JSON.stringify(Object.values(scenesData));
    const inject = `<script>window.__SCENES__=${scenesJson};</script>`;
    // Inject BEFORE the first script tag (works regardless of hashed filename)
    html = html.replace(/<script type="module"/, inject + '<script type="module"');
    res.type('html').send(html);
  } else {
    res.send('<p>Build the frontend first: <code>npm run build</code></p>');
  }
});

app.listen(PORT, () => {
  console.log(`AntiScam server running on port ${PORT}`);
  console.log(`Database: ${DB_PATH}`);
  console.log(`Scenes loaded: ${Object.keys(scenesData).length}`);
});