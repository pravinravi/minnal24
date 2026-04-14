import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const USERS_FILE = path.join(process.cwd(), 'data', 'admin-users.json');

function isAuthed(req) {
  const cookies = parse(req.headers.cookie || '');
  return !!cookies.admin_token;
}

function readUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch {}
  return [{ id: 1, username: 'admin', name: 'Admin User', role: 'admin', email: 'admin@minnal24.com', createdAt: new Date().toISOString() }];
}

function writeUsers(users) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export default function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') return res.status(200).json(readUsers());

  if (req.method === 'POST') {
    const users = readUsers();
    const { username, name, email, role, password } = req.body;
    if (!username || !name || !role) return res.status(400).json({ error: 'Required fields missing' });
    if (users.find(u => u.username === username)) return res.status(400).json({ error: 'Username already exists' });
    const newUser = { id: Date.now(), username, name, email, role, password: password || 'minnal24@2024', createdAt: new Date().toISOString() };
    users.push(newUser);
    writeUsers(users);
    return res.status(200).json({ success: true, user: { ...newUser, password: '***' } });
  }

  if (req.method === 'DELETE') {
    const users = readUsers().filter(u => String(u.id) !== String(req.query.id));
    writeUsers(users);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
