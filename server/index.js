const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'antiscam.db');

// Ensure data dir
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// DB init
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nickname TEXT,
  age_group TEXT,
  fraud_experience TEXT DEFAULT 'none',
  created_at INTEGER DEFAULT (unixepoch())
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
`);

// Seed scene data check
const sceneCount = db.prepare('SELECT COUNT(*) as c FROM system_configs WHERE key = ?').get('scenes_loaded');
if (!sceneCount || sceneCount.c === 0) {
  db.prepare('INSERT INTO system_configs (key, value) VALUES (?, ?)').run('scenes_loaded', 'true');
}

// Load scenes from JSON
let scenesData = {};
try {
  const raw = fs.readFileSync(path.join(DATA_DIR, 'scenes.json'), 'utf8');
  const parsed = JSON.parse(raw);
  parsed.scenes.forEach(s => { scenesData[s.id] = s; });
} catch(e) {
  console.warn('Scenes JSON not found, using empty store');
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// --- API Routes ---

// Scenes
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

// Start demonstration
app.post('/api/demonstrations', (req, res) => {
  const { user_id, scene_id } = req.body;
  if (!scene_id) return res.status(400).json({ success: false, error: 'scene_id required' });

  const userId = user_id || uuidv4();
  const demoId = uuidv4();

  // Ensure user exists
  const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!existingUser) {
    db.prepare('INSERT INTO users (id) VALUES (?)').run(userId);
  }

  db.prepare('INSERT INTO user_demonstrations (id, user_id, scene_id) VALUES (?, ?, ?)').run(demoId, userId, scene_id);

  res.json({ success: true, data: { demonstration_id: demoId, user_id: userId } });
});

// Record action
app.post('/api/demonstrations/:id/actions', (req, res) => {
  const { stage_id, action_type, action_detail, score_change, tags } = req.body;
  const actionId = uuidv4();

  db.prepare(`
    INSERT INTO user_actions (id, demonstration_id, stage_id, action_type, action_detail, score_change, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(actionId, req.params.id, stage_id, action_type, action_detail || '', score_change || 0, JSON.stringify(tags || []));

  res.json({ success: true, data: { action_id: actionId } });
});

// Complete demonstration
app.patch('/api/demonstrations/:id', (req, res) => {
  const { status, final_score, risk_level, weak_dimensions } = req.body;

  const updates = ['status = ?', 'end_time = unixepoch()'];
  const params = [status || 'completed'];

  if (final_score !== undefined) {
    updates.push('final_score = ?');
    params.push(final_score);
  }
  if (risk_level !== undefined) {
    updates.push('risk_level = ?');
    params.push(risk_level);
  }
  if (weak_dimensions !== undefined) {
    updates.push('weak_dimensions = ?');
    params.push(JSON.stringify(weak_dimensions));
  }

  params.push(req.params.id);
  db.prepare(`UPDATE user_demonstrations SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  res.json({ success: true });
});

// Statistics
app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE status != ?').get('in_progress');
  const avgScore = db.prepare('SELECT AVG(final_score) as avg FROM user_demonstrations WHERE final_score IS NOT NULL').get();
  const highRisk = db.prepare("SELECT COUNT(*) as c FROM user_demonstrations WHERE risk_level = 'high' OR risk_level = 'critical'").get();

  // Score distribution
  const scoreRanges = {
    '0-20': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 0 AND 20').get().c,
    '21-40': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 21 AND 40').get().c,
    '41-60': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 41 AND 60').get().c,
    '61-80': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 61 AND 80').get().c,
    '81-100': db.prepare('SELECT COUNT(*) as c FROM user_demonstrations WHERE final_score BETWEEN 81 AND 100').get().c,
  };

  // Scene stats
  const sceneStats = db.prepare(`
    SELECT scene_id, COUNT(*) as attempts,
      AVG(final_score) as avg_score,
      SUM(CASE WHEN risk_level IN ('high','critical') THEN 1 ELSE 0 END) as high_risk_count
    FROM user_demonstrations
    WHERE status != 'in_progress'
    GROUP BY scene_id
  `).all();

  // Weak dimensions
  const weakDimRows = db.prepare("SELECT weak_dimensions FROM user_demonstrations WHERE weak_dimensions IS NOT NULL").all();
  const dimCounts = {};
  weakDimRows.forEach(row => {
    try {
      const dims = JSON.parse(row.weak_dimensions);
      dims.forEach(d => { dimCounts[d] = (dimCounts[d] || 0) + 1; });
    } catch(e) {}
  });

  res.json({
    success: true,
    data: {
      total_demonstrations: total.c,
      avg_score: Math.round(avgScore.avg || 0),
      high_risk_count: highRisk.c,
      high_risk_rate: total.c > 0 ? Math.round(highRisk.c / total.c * 100) : 0,
      score_distribution: scoreRanges,
      scene_stats: sceneStats,
      weak_dimensions: dimCounts,
      update_time: new Date().toISOString()
    }
  });
});

// User profile - get
app.get('/api/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) { return res.status(404).json({ success: false, error: 'User not found' }); }
  res.json({ success: true, data: { id: user.id, nickname: user.nickname || '', age_group: user.age_group || '', fraud_experience: user.fraud_experience || 'none', created_at: user.created_at } });
});

// User profile - update
app.put('/api/users/:id/profile', (req, res) => {
  const { nickname, age_group, fraud_experience } = req.body;
  const updates = [], params = [];
  if (nickname !== undefined) { updates.push('nickname = ?'); params.push(nickname); }
  if (age_group !== undefined) { updates.push('age_group = ?'); params.push(age_group); }
  if (fraud_experience !== undefined) { updates.push('fraud_experience = ?'); params.push(fraud_experience); }
  if (updates.length === 0) { return res.status(400).json({ success: false, error: 'No fields to update' }); }
  params.push(req.params.id);
  try {
    db.prepare('UPDATE users SET ' + updates.join(', ') + ' WHERE id = ?').run(...params);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.json({ success: true, data: { id: user.id, nickname: user.nickname, age_group: user.age_group, fraud_experience: user.fraud_experience } });
  } catch(e) { res.status(500).json({ success: false, error: e.message }); }
});

// User stats with radar dimensions
app.get('/api/users/:id/stats', (req, res) => {
  const demos = db.prepare('SELECT * FROM user_demonstrations WHERE user_id = ? ORDER BY start_time DESC').all(req.params.id);
  const totalDemos = demos.length;
  const scored = demos.filter(d => d.final_score != null);
  const avgScore = scored.length > 0 ? scored.reduce((s, d) => s + d.final_score, 0) / scored.length : 0;

  const sceneCounts = {};
  const riskCounts = { low: 0, medium: 0, high: 0, critical: 0 };
  demos.forEach(d => {
    sceneCounts[d.scene_id] = (sceneCounts[d.scene_id] || 0) + 1;
    if (d.risk_level) riskCounts[d.risk_level] = (riskCounts[d.risk_level] || 0) + 1;
  });

  // Calculate radar dimensions from action tags
  const actions = db.prepare(`
    SELECT ua.tags, ud.final_score, ud.scene_id
    FROM user_actions ua
    JOIN user_demonstrations ud ON ud.id = ua.demonstration_id
    WHERE ud.user_id = ? AND ud.status != 'in_progress'
  `).all(req.params.id);

  const dims = { '话术识别': 0, '紧急判断': 0, '止损意识': 0, '证据保留': 0, '报案流程': 0 };
  const dimMax = 100;
  const dimMap = {
    // 话术识别
    '识别诱饵': '话术识别', '识破本质': '话术识别', '识破伪造': '话术识别', '识破异常': '话术识别',
    '主动核实': '话术识别', '核实信息': '话术识别', '核实身份': '话术识别', '查证识破': '话术识别',
    '识破话术': '话术识别', '识破套路': '话术识别', '识破伪装': '话术识别', '质疑来源': '话术识别',
    '轻信熟人': '话术识别', '轻信招聘': '话术识别', '轻信短信': '话术识别',
    // 紧急判断
    '质疑规则': '紧急判断', '质疑金额': '紧急判断', '质疑异常': '紧急判断', '质疑垫付': '紧急判断',
    '质疑安全': '紧急判断', '质疑权限': '紧急判断', '质疑计算': '紧急判断',
    '冲动报名': '紧急判断', '冲动垫付': '紧急判断', '冲动转账': '紧急判断', '冲动点击': '紧急判断',
    '恐慌反应': '紧急判断', '犹豫不决': '紧急判断', '犹豫': '紧急判断', '试探': '紧急判断',
    '接受任务': '紧急判断', '被迫继续': '紧急判断',
    // 止损意识
    '见好就收': '止损意识', '止损觉醒': '止损意识', '止损报警': '止损意识', '止损退出': '止损意识',
    '坚持提现': '止损意识', '要求退款': '止损意识', '要求退出': '止损意识',
    '识破操作': '止损意识', '沉没成本': '止损意识', '继续垫付': '止损意识', '继续转账': '止损意识',
    '加大投入': '止损意识', '大额垫付': '止损意识', '继续任务': '止损意识', '借贷转账': '止损意识',
    '贷款转账': '止损意识', '放弃止损': '止损意识', '陷入困境': '止损意识',
    '填写敏感信息': '止损意识', '泄露验证码': '止损意识',
    '接受复购': '止损意识',
    // 证据保留
    '保留证据': '证据保留', '记录聊天': '证据保留', '核实单号': '证据保留',
    // 报案流程
    '正确报警': '报案流程', '报警': '报案流程', '止损报警': '报案流程'
  };

  const dimCount = {};
  actions.forEach(a => {
    try {
      const tags = JSON.parse(a.tags);
      tags.forEach(t => {
        if (dimMap[t]) {
          dims[dimMap[t]] += 15;
          dimCount[dimMap[t]] = (dimCount[dimMap[t]] || 0) + 1;
        }
      });
    } catch(e) {}
  });
  // Normalize to 0-100
  Object.keys(dims).forEach(k => {
    dims[k] = Math.min(dimMax, Math.round(dims[k]));
  });

  res.json({
    success: true,
    data: {
      total_demos: totalDemos,
      avg_score: Math.round(avgScore),
      scene_distribution: sceneCounts,
      risk_distribution: riskCounts,
      radar_dimensions: dims
    }
  });
});

// SPA fallback
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
  } else {
    res.send('<p>Build the frontend first: <code>npm run build</code></p>');
  }
});

app.listen(PORT, () => {
  console.log(`AntiScam server running on port ${PORT}`);
  console.log(`Database: ${DB_PATH}`);
  console.log(`Scenes loaded: ${Object.keys(scenesData).length}`);
});