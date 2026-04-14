// pages/robots.txt.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /

Disallow: /api/
Disallow: /_next/

Sitemap: https://www.minnal24.com/sitemap.xml`);
}
