const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = new Database('/app/data/antiscam.db');

// Add is_admin column (already done, but harmless)
try { db.exec('ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0'); } catch(e) {}

// Create ai_configs table
try {
  db.exec(`CREATE TABLE IF NOT EXISTS ai_configs (
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
  )`);
  console.log('ai_configs table created');
} catch(e) { console.log('ai_configs error:', e.message); }

// Create ai_chat_history table
try {
  db.exec(`CREATE TABLE IF NOT EXISTS ai_chat_history (
    id TEXT PRIMARY KEY,
    demonstration_id TEXT,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch())
  )`);
  console.log('ai_chat_history table created');
} catch(e) { console.log('ai_chat_history error:', e.message); }

// Create ai_scenes table (for scene definitions with AI prompts)
try {
  db.exec(`CREATE TABLE IF NOT EXISTS ai_scenes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    scene_key TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    difficulty INTEGER DEFAULT 1,
    ai_system_prompt TEXT,
    enabled INTEGER DEFAULT 1,
    created_at INTEGER DEFAULT (unixepoch()),
    updated_at INTEGER DEFAULT (unixepoch())
  )`);
  console.log('ai_scenes table created');
} catch(e) { console.log('ai_scenes error:', e.message); }

// Set admin
const testUser = db.prepare('SELECT id FROM users WHERE email = ?').get('test@example.com');
if (testUser) {
  db.prepare('UPDATE users SET is_admin = 1 WHERE email = ?').run('test@example.com');
  console.log('Admin set for test@example.com');
} else {
  console.log('test@example.com not found');
}

// Seed default AI scene (brush order rebate scenario)
const sceneKey = 'brush_order_rebate';
const existing = db.prepare('SELECT id FROM ai_scenes WHERE scene_key = ?').get(sceneKey);
if (!existing) {
  db.prepare(`INSERT INTO ai_scenes (id, name, scene_key, description, category, difficulty, ai_system_prompt, enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
    uuidv4(), '刷单返利诈骗', sceneKey,
    '模拟刷单返利场景，诈骗分子先让受害者完成小额任务并返现，等大额垫付后拉黑',
    'AI场景演练', 3,
    `你是一个诈骗分子，正在模拟"刷单返利"诈骗场景。诈骗分子通过小额返利建立信任，然后诱导大额垫付后拉黑。要求：1. 完全沉浸角色 2. 回复简短自然 3. 适时输出[TRANSFER:金额:收款人:备注]触发转账面板 4. 用户识破时结束输出[END:用户识破] 5. 用户转账成功输出[END:诈骗成功]`,
    1
  );
  console.log('Default AI scene seeded');
}

console.log('Migration complete!');
console.log('is_admin column check:', db.prepare('SELECT is_admin FROM users WHERE email = ?').get('test@example.com'));
console.log('ai_configs count:', db.prepare('SELECT COUNT(*) as c FROM ai_configs').get().c);
console.log('ai_scenes count:', db.prepare('SELECT COUNT(*) as c FROM ai_scenes').get().c);