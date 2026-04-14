import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const CONFIG_FILE = path.join(process.cwd(), 'data', 'admin-config.json');

function isAuthed(req) {
  const cookies = parse(req.headers.cookie || '');
  return !!cookies.admin_token;
}

export default function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const config = { username: 'admin', password };
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));

  return res.status(200).json({ success: true });
}
