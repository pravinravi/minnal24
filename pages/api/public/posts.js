import fs from 'fs';
import path from 'path';
import { featuredNews, latestNews, breakingNews } from '../../../data/newsData';

const POSTS_FILE = path.join(process.cwd(), 'data', 'admin-posts.json');
const BREAKING_FILE = path.join(process.cwd(), 'data', 'admin-breaking.json');

export default function handler(req, res) {
  // Read admin-added posts
  let adminPosts = [];
  let adminBreaking = [];

  try {
    if (fs.existsSync(POSTS_FILE)) adminPosts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  } catch {}

  try {
    if (fs.existsSync(BREAKING_FILE)) adminBreaking = JSON.parse(fs.readFileSync(BREAKING_FILE, 'utf8'));
  } catch {}

  const allPosts = [...adminPosts, ...featuredNews, ...latestNews];
  const allBreaking = adminBreaking.length > 0 ? adminBreaking : breakingNews;

  res.setHeader('Cache-Control', 'public, s-maxage=30');
  res.status(200).json({
    posts: allPosts.slice(0, 50),
    breaking: allBreaking,
    total: allPosts.length,
  });
}
