import { parse, serialize } from 'cookie';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  if (!cookies.admin_token) return res.status(401).json({ auth: false });
  return res.status(200).json({ auth: true });
}
