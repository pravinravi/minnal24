import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../components/Layout';
import AdSlot, { SidebarAd, InlineAd } from '../components/AdSlot';
import { FeaturedCard, MediumCard, CompactCard, LatestCard } from '../components/NewsCard';
import { featuredNews, latestNews, categories, popularNews } from '../data/newsData';
import { formatDate } from '../lib/utils';

const SectionHeader = ({ title, tamilTitle, href, color = '#CC0000' }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className="w-1 h-7 rounded-full" style={{ backgroundColor: color }}></div>
      <h2 className="text-xl font-black text-gray-900 tamil-text">{tamilTitle || title}</h2>
    </div>
    {href && (
      <Link href={href}
        className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 tamil-text">
        அனைத்தும் <span>→</span>
      </Link>
    )}
  </div>
);

export default function HomePage() {
  const heroNews = featuredNews[0];
  const subHeroNews = featuredNews.slice(1, 4);
  const gridNews = featuredNews.slice(4);

  return (
    <Layout>
      <NextSeo
        title="Minnal24 - இலங்கை & மட்டக்களப்பு தமிழ் செய்திகள்"
        description="மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம். சமீபத்திய செய்திகள், அரசியல், விளையாட்டு மற்றும் சர்வதேச தமிழ் செய்திகள்."
        canonical="https://www.minnal24.com/"
        openGraph={{ url: 'https://www.minnal24.com/' }}
      />

      {/* Top leaderboard ad */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" style={{ maxWidth: 728, height: 90 }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ===== HERO SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Main hero */}
          <div className="lg:col-span-2">
            <FeaturedCard news={heroNews} />
          </div>
          {/* Sub hero stack */}
          <div className="flex flex-col gap-4">
            {subHeroNews.slice(0, 2).map(news => (
              <MediumCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* ===== CATEGORY TABS ===== */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold tamil-text transition-all hover:scale-105"
              style={{ backgroundColor: cat.color + '15', color: cat.color, border: `2px solid ${cat.color}30` }}>
              {cat.tamilName}
            </Link>
          ))}
        </div>

        {/* ===== MAIN CONTENT + SIDEBAR ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Latest News Grid */}
            <section>
              <SectionHeader tamilTitle="சமீபத்திய செய்திகள்" href="/latest" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredNews.slice(3, 7).map(news => (
                  <MediumCard key={news.id} news={news} />
                ))}
              </div>
            </section>

            {/* Inline Ad */}
            <InlineAd />

            {/* Batticaloa News */}
            <section>
              <SectionHeader tamilTitle="மட்டக்களப்பு செய்திகள்" href="/category/batticaloa" color="#059669" />
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                {/* Featured batticaloa */}
                <div className="relative h-56 img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    alt="மட்டக்களப்பு"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 red-overlay"></div>
                  <div className="absolute bottom-0 p-4">
                    <span className="cat-badge bg-green-600 text-white mb-2">மட்டக்களப்பு</span>
                    <Link href="/news/batticaloa-port-expansion">
                      <h3 className="text-white text-lg font-black tamil-text hover:text-yellow-300 transition-colors cursor-pointer">
                        மட்டக்களப்பு துறைமுகம் விரிவாக்கம் - 500 கோடி ரூபாய் திட்டம்
                      </h3>
                    </Link>
                  </div>
                </div>
                {/* List items */}
                <div className="divide-y divide-gray-100">
                  {latestNews.filter(n => n.category === 'batticaloa').map(news => (
                    <div key={news.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-3">
                        <img src={news.image} alt={news.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" loading="lazy" />
                        <div>
                          <Link href={`/news/${news.slug}`}>
                            <h4 className="text-sm font-semibold text-gray-800 tamil-text hover:text-green-700 transition-colors line-clamp-2">
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

            {/* Inline Ad 2 */}
            <InlineAd />

            {/* Sri Lanka + International Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sri Lanka */}
                <div>
                  <SectionHeader tamilTitle="இலங்கை செய்திகள்" href="/category/sri-lanka" color="#2563EB" />
                  <div className="space-y-3">
                    {featuredNews.filter(n => n.category === 'srilanka' || n.category === 'politics').slice(0, 3).map((news, i) => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
                {/* International */}
                <div>
                  <SectionHeader tamilTitle="சர்வதேச செய்திகள்" href="/category/international" color="#D97706" />
                  <div className="space-y-3">
                    {featuredNews.filter(n => n.category === 'international').slice(0, 3).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Billboard Ad */}
            <div className="my-4">
              <div className="text-center text-xs text-gray-400 uppercase tracking-widest mb-2">விளம்பரம்</div>
              <div className="ad-slot rounded-xl" style={{ height: 200 }}>
                <span className="text-xs text-gray-400">Billboard Ad 970×250 - Contact: news@minnal24.com</span>
              </div>
            </div>

            {/* Sports & Entertainment */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SectionHeader tamilTitle="விளையாட்டு" href="/category/sports" color="#0891B2" />
                  <div className="space-y-3">
                    {featuredNews.filter(n => n.category === 'sports').slice(0, 3).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                    {latestNews.slice(0, 2).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeader tamilTitle="பொழுதுபோக்கு" href="/category/entertainment" color="#DB2777" />
                  <div className="space-y-3">
                    {featuredNews.filter(n => n.category === 'entertainment').slice(0, 3).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                    {latestNews.slice(2, 4).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Tech & Health */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SectionHeader tamilTitle="தொழில்நுட்பம்" href="/category/technology" color="#0284C7" />
                  <div className="space-y-3">
                    {latestNews.filter(n => n.category === 'technology').map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                    {latestNews.slice(4, 6).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeader tamilTitle="சுகாதாரம்" href="/category/health" color="#16A34A" />
                  <div className="space-y-3">
                    {latestNews.filter(n => n.category === 'health').map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                    {latestNews.slice(6, 8).map(news => (
                      <LatestCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            {/* Sidebar Ad */}
            <SidebarAd />

            {/* Popular News */}
            <div className="bg-white rounded-xl shadow-card p-5">
              <SectionHeader tamilTitle="பிரபலமான செய்திகள்" color="#F59E0B" />
              <div className="space-y-2">
                {popularNews.map((news, i) => (
                  <CompactCard key={news.id} news={news} index={i} />
                ))}
              </div>
            </div>

            {/* Latest News sidebar */}
            <div className="bg-white rounded-xl shadow-card p-5">
              <SectionHeader tamilTitle="புதிய செய்திகள்" href="/latest" />
              <div className="space-y-3">
                {latestNews.slice(0, 6).map(news => (
                  <LatestCard key={news.id} news={news} />
                ))}
              </div>
            </div>

            {/* Second sidebar ad */}
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 text-center">விளம்பரம்</div>
              <div className="ad-slot rounded-xl" style={{ height: 250 }}>
                <span className="text-xs text-gray-400">Rectangle 300×250</span>
              </div>
            </div>

            {/* Social Follow Widget */}
            <div className="bg-gradient-to-br from-red-700 to-red-900 rounded-xl shadow-card p-5 text-white">
              <h3 className="font-black text-lg mb-3 tamil-text">எங்களை பின்தொடருங்கள்</h3>
              <div className="space-y-2">
                <a href="https://facebook.com/minnal24" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-blue-600 rounded-lg px-4 py-2.5 hover:bg-blue-500 transition-colors text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                    Facebook
                  </span>
                  <span className="text-blue-200 text-xs">பின்தொடர்</span>
                </a>
                <a href="https://youtube.com/minnal24" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-red-600 rounded-lg px-4 py-2.5 hover:bg-red-500 transition-colors text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
                    YouTube
                  </span>
                  <span className="text-red-200 text-xs">Subscribe</span>
                </a>
                <a href="https://wa.me/94XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-green-600 rounded-lg px-4 py-2.5 hover:bg-green-500 transition-colors text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp
                  </span>
                  <span className="text-green-200 text-xs">Join</span>
                </a>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white">
              <h3 className="font-black text-lg mb-3 tamil-text flex items-center gap-2">
                🌤️ வானிலை - மட்டக்களப்பு
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black">28°C</div>
                  <div className="text-blue-200 text-sm tamil-text">சிறிது மேகமூட்டம்</div>
                </div>
                <div className="text-6xl">⛅</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-blue-500">
                <div className="text-center text-xs">
                  <div className="text-blue-200 tamil-text">ஈரப்பதம்</div>
                  <div className="font-bold">78%</div>
                </div>
                <div className="text-center text-xs">
                  <div className="text-blue-200 tamil-text">காற்று</div>
                  <div className="font-bold">12 km/h</div>
                </div>
                <div className="text-center text-xs">
                  <div className="text-blue-200 tamil-text">தெரிவு</div>
                  <div className="font-bold">8 km</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
