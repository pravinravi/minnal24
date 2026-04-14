import { featuredNews, latestNews, categories } from '../../data/newsData';

export default function handler(req, res) {
  const baseUrl = 'https://www.minnal24.com';
  const allNews = [...featuredNews, ...latestNews];

  const staticPages = ['', '/about', '/contact', '/advertise', '/breaking', '/videos'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>${page === '' ? 'hourly' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.7'}</priority>
  </url>`).join('')}
  ${categories.map(cat => `
  <url>
    <loc>${baseUrl}/category/${cat.slug}</loc>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${allNews.map(news => `
  <url>
    <loc>${baseUrl}/news/${news.slug}</loc>
    <changefreq>never</changefreq>
    <priority>0.6</priority>
    <news:news>
      <news:publication>
        <news:name>Minnal24</news:name>
        <news:language>ta</news:language>
      </news:publication>
      <news:publication_date>${news.date}T00:00:00+05:30</news:publication_date>
      <news:title>${news.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
  res.status(200).send(sitemap);
}
