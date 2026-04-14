import { serialize } from 'cookie';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'data', 'admin-config.json');

function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch {}
  return { username: 'admin', password: 'minnal24@admin' };
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const config = getConfig();

  if (username === config.username && password === config.password) {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    res.setHeader('Set-Cookie', serialize('admin_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/',
    }));
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
