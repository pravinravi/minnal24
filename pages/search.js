import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import { MediumCard } from '../components/NewsCard';
import AdSlot, { SidebarAd } from '../components/AdSlot';
import { featuredNews, latestNews, categories } from '../data/newsData';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    const allNews = [...featuredNews, ...latestNews];
    const filtered = allNews.filter(n =>
      n.title.toLowerCase().includes(q.toLowerCase()) ||
      (n.excerpt && n.excerpt.toLowerCase().includes(q.toLowerCase())) ||
      (n.categoryName && n.categoryName.includes(q))
    );
    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, [q]);

  return (
    <Layout>
      <NextSeo title={q ? `"${q}" தேடல் முடிவுகள்` : 'தேடல்'} noindex />

      <div className="bg-red-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-black text-white tamil-text mb-4">
            {q ? `"${q}" தேடல் முடிவுகள்` : 'செய்திகளை தேடுங்கள்'}
          </h1>
          <form action="/search" method="get" className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="செய்திகளை தேடுங்கள்..."
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400 tamil-text text-base"
            />
            <button type="submit" className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-black hover:bg-yellow-300 transition-colors tamil-text">
              தேடு
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white py-3 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-card overflow-hidden">
                    <div className="skeleton h-44"></div>
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4 w-1/3"></div>
                      <div className="skeleton h-5 w-full"></div>
                      <div className="skeleton h-5 w-4/5"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : q && results.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg tamil-text">"{q}" க்கு எந்த முடிவும் கிடைக்கவில்லை</p>
                <p className="text-gray-400 text-sm mt-2 tamil-text">வேறு வார்த்தைகளில் தேடி பாருங்கள்</p>
              </div>
            ) : (
              <>
                {q && <p className="text-gray-500 text-sm mb-4 tamil-text">{results.length} முடிவுகள் கிடைத்தன</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(q ? results : [...featuredNews, ...latestNews]).slice(0, 12).map(news => (
                    <MediumCard key={news.id} news={news} />
                  ))}
                </div>
              </>
            )}
          </div>
          <aside>
            <SidebarAd />
            <div className="mt-6 bg-white rounded-xl shadow-card p-5">
              <h3 className="font-black text-gray-900 tamil-text mb-4">பகுதிகள்</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <a key={cat.id} href={`/category/${cat.slug}`}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold tamil-text transition-all hover:scale-105"
                    style={{ backgroundColor: cat.color + '20', color: cat.color, border: `1.5px solid ${cat.color}40` }}>
                    {cat.tamilName}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
