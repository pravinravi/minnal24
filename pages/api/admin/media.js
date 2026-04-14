import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const MEDIA_FILE = path.join(process.cwd(), 'data', 'admin-media.json');

function isAuthed(req) {
  const cookies = parse(req.headers.cookie || '');
  return !!cookies.admin_token;
}

function readMedia() {
  try { if (fs.existsSync(MEDIA_FILE)) return JSON.parse(fs.readFileSync(MEDIA_FILE, 'utf8')); } catch {}
  return [];
}

function writeMedia(data) {
  fs.mkdirSync(path.dirname(MEDIA_FILE), { recursive: true });
  fs.writeFileSync(MEDIA_FILE, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') return res.status(200).json(readMedia());

  if (req.method === 'POST') {
    const media = readMedia();
    const newItem = {
      id: Date.now(),
      url: req.body.url,
      alt: req.body.alt || '',
      source: req.body.source || 'url',
      addedAt: new Date().toISOString(),
    };
    media.unshift(newItem);
    writeMedia(media);
    return res.status(200).json({ success: true, item: newItem });
  }

  if (req.method === 'DELETE') {
    const media = readMedia().filter(m => String(m.id) !== String(req.query.id));
    writeMedia(media);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
