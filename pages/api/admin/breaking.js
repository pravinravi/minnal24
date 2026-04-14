import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const FILE = path.join(process.cwd(), 'data', 'admin-breaking.json');

function isAuthed(req) {
  const cookies = parse(req.headers.cookie || '');
  return !!cookies.admin_token;
}

function read() {
  try { if (fs.existsSync(FILE)) return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch {}
  return [];
}
function write(data) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') return res.status(200).json(read());

  if (req.method === 'POST') {
    const list = read();
    list.unshift(req.body.text);
    write(list);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const list = read();
    list.splice(Number(req.query.idx), 1);
    write(list);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
