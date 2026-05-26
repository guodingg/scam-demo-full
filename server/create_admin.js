const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = new Database('/app/data/antiscam.db');

// Create admin user
const email = 'admin@antiscam.com';
const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
if (!existing) {
  const hash = bcrypt.hashSync('Admin@123456', 12);
  db.prepare(`INSERT INTO users (id, email, nickname, password_hash, is_guest, is_admin, created_at)
    VALUES (?, ?, ?, ?, 0, 1, unixepoch())`).run(
    uuidv4(), email, '系统管理员', hash
  );
  console.log('Admin created: admin@antiscam.com / Admin@123456');
} else {
  const hash = bcrypt.hashSync('Admin@123456', 12);
  db.prepare('UPDATE users SET password_hash = ?, is_admin = 1 WHERE email = ?').run(hash, email);
  console.log('Admin reset: admin@antiscam.com / Admin@123456');
}

console.log('Done!');