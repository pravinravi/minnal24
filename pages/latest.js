import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import AdSlot, { SidebarAd } from '../components/AdSlot';
import { MediumCard, CompactCard } from '../components/NewsCard';
import { featuredNews, latestNews, categories, popularNews } from '../data/newsData';

const allNews = [...featuredNews, ...latestNews];

export default function LatestPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = selectedCat === 'all'
    ? allNews
    : allNews.filter(n => n.category === selectedCat);

  const visible = filtered.slice(0, visibleCount);

  return (
    <Layout>
      <NextSeo
        title="சமீபத்திய செய்திகள் - Latest News"
        description="Minnal24.com-ல் சமீபத்திய மட்டக்களப்பு மற்றும் இலங்கை தமிழ் செய்திகள்"
        canonical="https://www.minnal24.com/latest"
      />

      <div className="bg-gradient-to-r from-red-700 to-red-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-black text-white tamil-text mb-4">சமீபத்திய செய்திகள்</h1>
          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setSelectedCat('all')}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedCat === 'all' ? 'bg-white text-red-700' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              அனைத்தும்
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all tamil-text ${selectedCat === cat.id ? 'bg-white text-red-700' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                {cat.tamilName}
              </button>
            ))}
          </div>
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
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-500 text-sm tamil-text">
                {filtered.length} செய்திகள் கிடைக்கின்றன
              </p>
            </div>

            {visible.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visible.map(news => (
                    <MediumCard key={news.id} news={news} />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 8)}
                      className="bg-red-600 text-white px-8 py-3 rounded-xl font-black tamil-text hover:bg-red-700 transition-colors">
                      மேலும் செய்திகள் →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <p className="text-gray-500 tamil-text">இந்த பிரிவில் செய்திகள் இல்லை</p>
              </div>
            )}
          </div>

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

            {/* Newsletter */}
            <div className="mt-6 bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5 text-white">
              <h3 className="font-black text-lg tamil-text mb-1">📧 நியூஸ்லெட்டர்</h3>
              <p className="text-red-200 text-xs tamil-text mb-3">
                தினசரி முக்கிய செய்திகளை மின்னஞ்சலில் பெறுங்கள்
              </p>
              <form onSubmit={e => e.preventDefault()} className="space-y-2">
                <input
                  type="email"
                  placeholder="உங்கள் மின்னஞ்சல்"
                  className="w-full px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-black text-sm hover:bg-yellow-300 transition-colors tamil-text">
                  பதிவு செய்
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
