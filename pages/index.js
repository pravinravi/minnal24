import { NextSeo } from 'next-seo';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import { SidebarAd, InlineAd } from '../components/AdSlot';
import { FeaturedCard, MediumCard, CompactCard, LatestCard } from '../components/NewsCard';
import { featuredNews, latestNews, categories } from '../data/newsData';
import { formatDate } from '../lib/utils';

const SectionHeader = ({ tamilTitle, href, color = '#CC0000' }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-1 h-7 rounded-full" style={{ backgroundColor: color }}></div>
      <h2 className="text-lg font-black text-gray-900 dark:text-white tamil-text">{tamilTitle}</h2>
    </div>
    {href && (
      <Link href={href} className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors tamil-text flex items-center gap-1">
        அனைத்தும் →
      </Link>
    )}
  </div>
);

export default function HomePage({ allNews }) {
  if (!allNews || allNews.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 tamil-text text-lg">செய்திகள் ஏற்றுகிறோம்...</p>
        </div>
      </Layout>
    );
  }

  const heroNews = allNews[0];
  const subHero = allNews.slice(1, 3);
  const gridNews = allNews.slice(3, 9);
  const sidebarNews = allNews.slice(0, 6);
  const battNews = allNews.filter(n => n.category === 'batticaloa').slice(0, 4);
  const srilankaNews = allNews.filter(n => ['srilanka', 'politics'].includes(n.category)).slice(0, 4);
  const intlNews = allNews.filter(n => n.category === 'international').slice(0, 4);
  const sportsNews = allNews.filter(n => n.category === 'sports').slice(0, 3);
  const entNews = allNews.filter(n => n.category === 'entertainment').slice(0, 3);
  const techNews = allNews.filter(n => n.category === 'technology').slice(0, 3);
  const healthNews = allNews.filter(n => n.category === 'health').slice(0, 3);

  return (
    <Layout>
      <NextSeo
        title="Minnal24 - இலங்கை & மட்டக்களப்பு தமிழ் செய்திகள்"
        description="மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம். சமீபத்திய செய்திகள், அரசியல், விளையாட்டு மற்றும் சர்வதேச தமிழ் செய்திகள்."
        canonical="https://www.minnal24.com/"
      />

      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* ===== HERO SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <FeaturedCard news={heroNews} />
          </div>
          <div className="flex flex-col gap-4">
            {subHero.map(news => <MediumCard key={news.id} news={news} />)}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold tamil-text transition-all hover:scale-105 whitespace-nowrap"
              style={{ backgroundColor: cat.color + '18', color: cat.color, border: `1.5px solid ${cat.color}35` }}>
              {cat.tamilName}
            </Link>
          ))}
        </div>

        {/* ===== MAIN + SIDEBAR ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Latest Grid */}
            {gridNews.length > 0 && (
              <section>
                <SectionHeader tamilTitle="சமீபத்திய செய்திகள்" href="/latest" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gridNews.map(news => <MediumCard key={news.id} news={news} />)}
                </div>
              </section>
            )}

            <InlineAd />

            {/* Batticaloa */}
            {battNews.length > 0 && (
              <section>
                <SectionHeader tamilTitle="மட்டக்களப்பு செய்திகள்" href="/category/batticaloa" color="#059669" />
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
                  <div className="relative h-52 img-zoom overflow-hidden">
                    <img src={battNews[0].image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'}
                      alt={battNews[0].title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 red-overlay"></div>
                    {battNews[0].isBreaking && (
                      <div className="absolute top-3 left-3">
                        <span className="pulse-red text-white text-xs font-black px-3 py-1 rounded-full">⚡ உடனடி</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="cat-badge bg-green-600 text-white text-xs mb-2 inline-block">மட்டக்களப்பு</span>
                      <Link href={`/news/${battNews[0].slug}`}>
                        <h3 className="text-white text-lg font-black tamil-text hover:text-yellow-300 transition-colors cursor-pointer line-clamp-2 leading-snug">
                          {battNews[0].title}
                        </h3>
                      </Link>
                      <span className="text-gray-300 text-xs mt-1 block tamil-text">{formatDate(battNews[0].date)}</span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {battNews.slice(1).map(news => (
                      <div key={news.id} className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        {news.image && (
                          <img src={news.image} alt={news.title}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                        )}
                        <div className="flex-1 min-w-0">
                          <Link href={`/news/${news.slug}`}>
                            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 tamil-text hover:text-green-700 dark:hover:text-green-400 transition-colors line-clamp-2 leading-snug">
                              {news.title}
                            </h4>
                          </Link>
                          <span className="text-xs text-gray-400 mt-1 block tamil-text">{formatDate(news.date)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <InlineAd />

            {/* Sri Lanka + International 2-col */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {srilankaNews.length > 0 && (
                  <div>
                    <SectionHeader tamilTitle="இலங்கை செய்திகள்" href="/category/sri-lanka" color="#2563EB" />
                    <div className="space-y-3">
                      {srilankaNews.map(news => <LatestCard key={news.id} news={news} />)}
                    </div>
                  </div>
                )}
                {intlNews.length > 0 && (
                  <div>
                    <SectionHeader tamilTitle="சர்வதேச செய்திகள்" href="/category/international" color="#D97706" />
                    <div className="space-y-3">
                      {intlNews.map(news => <LatestCard key={news.id} news={news} />)}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Sports + Entertainment */}
            {(sportsNews.length > 0 || entNews.length > 0) && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sportsNews.length > 0 && (
                    <div>
                      <SectionHeader tamilTitle="விளையாட்டு" href="/category/sports" color="#0891B2" />
                      <div className="space-y-3">
                        {sportsNews.map(news => <LatestCard key={news.id} news={news} />)}
                      </div>
                    </div>
                  )}
                  {entNews.length > 0 && (
                    <div>
                      <SectionHeader tamilTitle="பொழுதுபோக்கு" href="/category/entertainment" color="#DB2777" />
                      <div className="space-y-3">
                        {entNews.map(news => <LatestCard key={news.id} news={news} />)}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Tech + Health */}
            {(techNews.length > 0 || healthNews.length > 0) && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {techNews.length > 0 && (
                    <div>
                      <SectionHeader tamilTitle="தொழில்நுட்பம்" href="/category/technology" color="#0284C7" />
                      <div className="space-y-3">
                        {techNews.map(news => <LatestCard key={news.id} news={news} />)}
                      </div>
                    </div>
                  )}
                  {healthNews.length > 0 && (
                    <div>
                      <SectionHeader tamilTitle="சுகாதாரம்" href="/category/health" color="#16A34A" />
                      <div className="space-y-3">
                        {healthNews.map(news => <LatestCard key={news.id} news={news} />)}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            {/* Popular */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5">
              <SectionHeader tamilTitle="பிரபலமான செய்திகள்" color="#F59E0B" />
              <div className="space-y-1">
                {allNews.slice(0, 5).map((news, i) => (
                  <CompactCard key={news.id} news={news} index={i} />
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <SidebarAd />

            {/* Latest */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5">
              <SectionHeader tamilTitle="புதிய செய்திகள்" href="/latest" />
              <div className="space-y-3">
                {sidebarNews.map(news => <LatestCard key={news.id} news={news} />)}
              </div>
            </div>

            {/* Social */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-2xl p-5 text-white">
              <h3 className="font-black text-base mb-3 tamil-text">எங்களை பின்தொடருங்கள்</h3>
              <div className="space-y-2">
                {[
                  { href: 'https://facebook.com/minnal24', bg: '#1877F2', label: 'Facebook', sub: 'பின்தொடர்' },
                  { href: 'https://youtube.com/minnal24', bg: '#FF0000', label: 'YouTube', sub: 'Subscribe' },
                  { href: 'https://wa.me/94XXXXXXXXX', bg: '#25D366', label: 'WhatsApp', sub: 'Join' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
                    style={{ background: s.bg }}>
                    <span>{s.label}</span>
                    <span className="text-xs opacity-80">{s.sub}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
              <h3 className="font-black text-base mb-3 tamil-text">🌤️ வானிலை — மட்டக்களப்பு</h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-4xl font-black">28°C</div>
                  <div className="text-blue-200 text-sm tamil-text">சிறிது மேகமூட்டம்</div>
                </div>
                <div className="text-5xl">⛅</div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-500 text-center text-xs">
                {[['ஈரப்பதம்', '78%'], ['காற்று', '12km/h'], ['தெரிவு', '8km']].map(([l, v]) => (
                  <div key={l}>
                    <div className="text-blue-200 tamil-text">{l}</div>
                    <div className="font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  let adminPosts = [];
  try {
    const f = path.join(process.cwd(), 'data', 'admin-posts.json');
    if (fs.existsSync(f)) adminPosts = JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch {}

  const allNews = [...adminPosts, ...featuredNews, ...latestNews];
  return { props: { allNews: allNews.slice(0, 60) } };
}
