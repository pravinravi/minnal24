import { featuredNews, latestNews } from '../../data/newsData';

export default function handler(req, res) {
  const { q, category, limit = 10, page = 1 } = req.query;

  if (!q && !category) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  const allNews = [...featuredNews, ...latestNews];

  let results = allNews;

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(n =>
      n.title.toLowerCase().includes(query) ||
      (n.excerpt && n.excerpt.toLowerCase().includes(query)) ||
      (n.categoryName && n.categoryName.includes(q)) ||
      (n.author && n.author.toLowerCase().includes(query))
    );
  }

  if (category) {
    results = results.filter(n => n.category === category || n.slug === category);
  }

  const total = results.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const paginated = results.slice(start, start + limitNum);

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  res.status(200).json({
    results: paginated,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
}
