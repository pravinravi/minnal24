import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AdSlot, { SidebarAd } from '../../components/AdSlot';
import { MediumCard, LatestCard, CompactCard } from '../../components/NewsCard';
import { featuredNews, latestNews, categories, popularNews } from '../../data/newsData';

export default function CategoryPage({ category, news }) {
  if (!category) return null;

  return (
    <Layout>
      <NextSeo
        title={`${category.tamilName} செய்திகள்`}
        description={`${category.tamilName} பிரிவில் உள்ள சமீபத்திய செய்திகள் - Minnal24.com`}
        canonical={`https://www.minnal24.com/category/${category.slug}`}
      />

      {/* Category hero banner */}
      <div className="text-white py-10" style={{ background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <nav className="text-white/70 text-sm tamil-text">
              <Link href="/" className="hover:text-white transition-colors">முகப்பு</Link>
              <span className="mx-2">›</span>
              <span className="text-white font-semibold">{category.tamilName}</span>
            </nav>
          </div>
          <h1 className="text-4xl font-black tamil-text">{category.tamilName}</h1>
          <p className="text-white/80 text-sm mt-1 tamil-text">{news.length} செய்திகள் கிடைக்கின்றன</p>
        </div>
      </div>

      {/* Ad */}
      <div className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* News grid */}
          <div className="lg:col-span-2">
            {news.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {news.map(item => (
                    <MediumCard key={item.id} news={item} />
                  ))}
                </div>
                {/* Load more */}
                <div className="mt-8 text-center">
                  <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold tamil-text hover:bg-red-700 transition-colors">
                    மேலும் செய்திகள் →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">📰</div>
                <p className="tamil-text text-lg">இந்த பிரிவில் செய்திகள் இல்லை</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <SidebarAd />
            <div className="mt-6 bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                <h3 className="font-black text-gray-900 tamil-text">பிரபலமான செய்திகள்</h3>
              </div>
              <div className="space-y-2">
                {popularNews.map((n, i) => (
                  <CompactCard key={n.id} news={n} index={i} />
                ))}
              </div>
            </div>
            {/* All categories */}
            <div className="mt-6 bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                <h3 className="font-black text-gray-900 tamil-text">பகுதிகள்</h3>
              </div>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link key={cat.id} href={`/category/${cat.slug}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${cat.id === category.id ? 'text-white font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={cat.id === category.id ? { backgroundColor: cat.color } : {}}>
                    <span className="tamil-text text-sm">{cat.tamilName}</span>
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = categories.map(cat => ({ params: { slug: cat.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) return { notFound: true };

  const allNews = [...featuredNews, ...latestNews];
  const news = allNews.filter(n => n.category === category.id || n.category === params.slug);

  return {
    props: { category, news },
    revalidate: 60,
  };
}
