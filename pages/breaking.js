import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import { MediumCard } from '../components/NewsCard';
import AdSlot, { SidebarAd } from '../components/AdSlot';
import { featuredNews, latestNews, breakingNews, popularNews } from '../data/newsData';
import { CompactCard } from '../components/NewsCard';

export default function BreakingPage() {
  const allBreaking = [...featuredNews, ...latestNews].filter(n => n.isBreaking);

  return (
    <Layout>
      <NextSeo
        title="உடனடி செய்திகள் - Breaking News"
        description="இலங்கை மற்றும் மட்டக்களப்பு உடனடி செய்திகள் - Minnal24.com"
        canonical="https://www.minnal24.com/breaking"
      />

      {/* Breaking hero */}
      <div className="pulse-red py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="bg-white text-red-600 font-black text-sm px-3 py-1 rounded-full animate-bounce">⚡ LIVE</span>
            <h1 className="text-2xl font-black text-white tamil-text">உடனடி செய்திகள்</h1>
          </div>
          <div className="mt-3 space-y-2">
            {breakingNews.map((news, i) => (
              <div key={i} className="flex items-start gap-2 text-white text-sm tamil-text">
                <span className="text-yellow-300 font-black flex-shrink-0">●</span>
                <span>{news}</span>
              </div>
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
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 bg-red-600 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-black text-gray-900 tamil-text">உடனடி செய்திகள்</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allBreaking.length > 0
                ? allBreaking.map(n => <MediumCard key={n.id} news={n} />)
                : [...featuredNews].slice(0, 6).map(n => <MediumCard key={n.id} news={n} />)
              }
            </div>
          </div>
          <aside>
            <SidebarAd />
            <div className="mt-6 bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                <h3 className="font-black text-gray-900 tamil-text">பிரபலமான செய்திகள்</h3>
              </div>
              <div className="space-y-2">
                {popularNews.map((n, i) => <CompactCard key={n.id} news={n} index={i} />)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
