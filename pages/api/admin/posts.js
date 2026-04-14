import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const POSTS_FILE = path.join(process.cwd(), 'data', 'admin-posts.json');
const BREAKING_FILE = path.join(process.cwd(), 'data', 'admin-breaking.json');

function isAuthed(req) {
  const cookies = parse(req.headers.cookie || '');
  return !!cookies.admin_token;
}

function readPosts() {
  try {
    if (fs.existsSync(POSTS_FILE)) return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  } catch {}
  return [];
}

function writePosts(posts) {
  fs.mkdirSync(path.dirname(POSTS_FILE), { recursive: true });
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

function readBreaking() {
  try {
    if (fs.existsSync(BREAKING_FILE)) return JSON.parse(fs.readFileSync(BREAKING_FILE, 'utf8'));
  } catch {}
  return [
    'மட்டக்களப்பு மாவட்டத்தில் புதிய மேம்பாட்டு திட்டங்கள் அறிவிப்பு',
    'இலங்கை அரசியல் நிலைமை குறித்து நாடாளுமன்றத்தில் விவாதம்',
  ];
}

export default function handler(req, res) {
  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    return res.status(200).json({ posts: readPosts(), breaking: readBreaking() });
  }

  if (req.method === 'POST') {
    const posts = readPosts();
    const newPost = { ...req.body, id: req.body.id || Date.now() };
    posts.unshift(newPost);
    writePosts(posts);
    return res.status(200).json({ success: true, post: newPost });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const posts = readPosts().filter(p => String(p.id) !== String(id));
    writePosts(posts);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
