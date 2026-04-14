import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../components/Layout';
import AdSlot, { SidebarAd, InlineAd } from '../components/AdSlot';
import { FeaturedCard, MediumCard, CompactCard, LatestCard } from '../components/NewsCard';
import { categories, popularNews } from '../data/newsData';
import { formatDate } from '../lib/utils';

const SectionHeader = ({ title, tamilTitle, href, color = '#CC0000' }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className="w-1 h-7 rounded-full" style={{ backgroundColor: color }}></div>
      <h2 className="text-xl font-black text-gray-900 dark:text-white tamil-text">{tamilTitle || title}</h2>
    </div>
    {href && (
      <Link href={href} className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 tamil-text">
        அனைத்தும் <span>→</span>
      </Link>
    )}
  </div>
);

export default function HomePage({ allNews, breakingFromAdmin }) {
  const heroNews = allNews[0];
  const subHeroNews = allNews.slice(1, 3);
  const gridNews = allNews.slice(3, 9);
  const latestNews = allNews.slice(0, 8);
  const battNews = allNews.filter(n => n.category === 'batticaloa').slice(0, 4);
  const srilankaNews = allNews.filter(n => n.category === 'srilanka' || n.category === 'politics').slice(0, 3);
  const intlNews = allNews.filter(n => n.category === 'international').slice(0, 3);
  const sportsNews = allNews.filter(n => n.category === 'sports').slice(0, 3);
  const entNews = allNews.filter(n => n.category === 'entertainment').slice(0, 3);

  if (!heroNews) return <Layout><div className="text-center py-20 tamil-text text-gray-500">செய்திகள் ஏற்றுகிறோம்...</div></Layout>;

  return (
    <Layout>
      <NextSeo
        title="Minnal24 - இலங்கை & மட்டக்களப்பு தமிழ் செய்திகள்"
        description="மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம்."
        canonical="https://www.minnal24.com/"
        openGraph={{ url: 'https://www.minnal24.com/' }}
      />

      <div className="bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <FeaturedCard news={heroNews} />
          </div>
          <div className="flex flex-col gap-4">
            {subHeroNews.map(news => <MediumCard key={news.id} news={news} />)}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold tamil-text transition-all hover:scale-105"
              style={{ backgroundColor: cat.color + '15', color: cat.color, border: `2px solid ${cat.color}30` }}>
              {cat.tamilName}
            </Link>
          ))}
        </div>

        {/* MAIN + SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">

            {/* Latest */}
            <section>
              <SectionHeader tamilTitle="சமீபத்திய செய்திகள்" href="/latest" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridNews.map(news => <MediumCard key={news.id} news={news} />)}
              </div>
            </section>

            <InlineAd />

            {/* Batticaloa */}
            {battNews.length > 0 && (
              <section>
                <SectionHeader tamilTitle="மட்டக்களப்பு செய்திகள்" href="/category/batticaloa" color="#059669" />
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden">
                  <div className="relative h-48 img-zoom">
                    <img src={battNews[0].image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'}
                      alt={battNews[0].title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 red-overlay"></div>
                    <div className="absolute bottom-0 p-4">
                      <Link href={`/news/${battNews[0].slug}`}>
                        <h3 className="text-white text-lg font-black tamil-text hover:text-yellow-300 transition-colors cursor-pointer">
                          {battNews[0].title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {battNews.slice(1).map(news => (
                      <div key={news.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex gap-3">
                          <img src={news.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70'}
                            alt={news.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                          <div>
                            <Link href={`/news/${news.slug}`}>
                              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tamil-text hover:text-green-700 transition-colors line-clamp-2">
                                {news.title}
                              </h4>
                            </Link>
                            <span className="text-xs text-gray-400 mt-1 tamil-text">{formatDate(news.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <InlineAd />

            {/* Sri Lanka + International */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SectionHeader tamilTitle="இலங்கை செய்திகள்" href="/category/sri-lanka" color="#2563EB" />
                  <div className="space-y-3">
                    {srilankaNews.map(news => <LatestCard key={news.id} news={news} />)}
                  </div>
                </div>
                <div>
                  <SectionHeader tamilTitle="சர்வதேச செய்திகள்" href="/category/international" color="#D97706" />
                  <div className="space-y-3">
                    {intlNews.map(news => <LatestCard key={news.id} news={news} />)}
                  </div>
                </div>
              </div>
            </section>

            {/* Sports + Entertainment */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SectionHeader tamilTitle="விளையாட்டு" href="/category/sports" color="#0891B2" />
                  <div className="space-y-3">
                    {sportsNews.map(news => <LatestCard key={news.id} news={news} />)}
                  </div>
                </div>
                <div>
                  <SectionHeader tamilTitle="பொழுதுபோக்கு" href="/category/entertainment" color="#DB2777" />
                  <div className="space-y-3">
                    {entNews.map(news => <LatestCard key={news.id} news={news} />)}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <SidebarAd />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-5">
              <SectionHeader tamilTitle="பிரபலமான செய்திகள்" color="#F59E0B" />
              <div className="space-y-2">
                {allNews.slice(0, 5).map((news, i) => <CompactCard key={news.id} news={news} index={i} />)}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-5">
              <SectionHeader tamilTitle="புதிய செய்திகள்" href="/latest" />
              <div className="space-y-3">
                {latestNews.map(news => <LatestCard key={news.id} news={news} />)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 text-center">விளம்பரம்</div>
              <div className="ad-slot rounded-xl" style={{ height: 250 }}>
                <span className="text-xs text-gray-400">Rectangle 300×250</span>
              </div>
            </div>
            {/* Social widget */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-xl shadow-card p-5 text-white">
              <h3 className="font-black text-lg mb-3 tamil-text">எங்களை பின்தொடருங்கள்</h3>
              <div className="space-y-2">
                {[
                  { href: 'https://facebook.com/minnal24', bg: 'bg-blue-600', label: 'Facebook', tag: 'பின்தொடர்' },
                  { href: 'https://youtube.com/minnal24', bg: 'bg-red-600', label: 'YouTube', tag: 'Subscribe' },
                  { href: 'https://wa.me/94XXXXXXXXX', bg: 'bg-green-600', label: 'WhatsApp', tag: 'Join' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between ${s.bg} rounded-lg px-4 py-2.5 hover:opacity-90 transition-opacity text-sm font-semibold`}>
                    <span>{s.label}</span>
                    <span className="text-xs opacity-75">{s.tag}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Weather */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white">
              <h3 className="font-black text-lg mb-3 tamil-text flex items-center gap-2">🌤️ வானிலை - மட்டக்களப்பு</h3>
              <div className="flex items-center justify-between">
                <div><div className="text-4xl font-black">28°C</div><div className="text-blue-200 text-sm tamil-text">சிறிது மேகமூட்டம்</div></div>
                <div className="text-6xl">⛅</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  const { featuredNews, latestNews } = require('../data/newsData');

  let adminPosts = [];
  try {
    const f = path.join(process.cwd(), 'data', 'admin-posts.json');
    if (fs.existsSync(f)) adminPosts = JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch {}

  const allNews = [...adminPosts, ...featuredNews, ...latestNews];

  return {
    props: { allNews: allNews.slice(0, 50) },
  };
}
