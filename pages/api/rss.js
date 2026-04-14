import { featuredNews, latestNews } from '../../data/newsData';

export default function handler(req, res) {
  const baseUrl = 'https://www.minnal24.com';
  const allNews = [...featuredNews, ...latestNews].slice(0, 30);

  const escapeXml = (str) => str
    ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    : '';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Minnal24 - இலங்கை தமிழ் செய்திகள்</title>
    <link>${baseUrl}</link>
    <description>மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம்</description>
    <language>ta</language>
    <copyright>© ${new Date().getFullYear()} Minnal24.com</copyright>
    <managingEditor>news@minnal24.com (Minnal24 News)</managingEditor>
    <webMaster>tech@minnal24.com (Minnal24 Tech)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Minnal24</title>
      <link>${baseUrl}</link>
    </image>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${allNews.map(news => `
    <item>
      <title>${escapeXml(news.title)}</title>
      <link>${baseUrl}/news/${news.slug}</link>
      <description>${escapeXml(news.excerpt || '')}</description>
      <pubDate>${new Date(news.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/news/${news.slug}</guid>
      <category>${escapeXml(news.categoryName)}</category>
      <author>news@minnal24.com (${escapeXml(news.author || 'Minnal24')})</author>
      <media:content url="${escapeXml(news.image)}" medium="image"/>
    </item>`).join('')}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=600');
  res.status(200).send(rss);
}
