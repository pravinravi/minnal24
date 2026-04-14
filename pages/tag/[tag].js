import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import { MediumCard, CompactCard } from '../../components/NewsCard';
import AdSlot, { SidebarAd } from '../../components/AdSlot';
import { featuredNews, latestNews, popularNews } from '../../data/newsData';

export default function TagPage({ tag, news }) {
  return (
    <Layout>
      <NextSeo
        title={`#${tag} செய்திகள்`}
        description={`${tag} என்ற குறிச்சொல் தொடர்பான செய்திகள் - Minnal24.com`}
        noindex
      />

      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">#</span>
            <h1 className="text-2xl font-black text-white tamil-text">{tag}</h1>
          </div>
          <p className="text-gray-400 text-sm mt-1 tamil-text">{news.length} செய்திகள் கிடைக்கின்றன</p>
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
            {news.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {news.map(n => <MediumCard key={n.id} news={n} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-gray-500 tamil-text">இந்த குறிச்சொல்லுக்கு செய்திகள் இல்லை</p>
              </div>
            )}
          </div>
          <aside>
            <SidebarAd />
            <div className="mt-6 bg-white rounded-xl shadow-card p-5">
              <h3 className="font-black text-gray-900 tamil-text mb-4">பிரபலமான செய்திகள்</h3>
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

export async function getStaticPaths() {
  const allTags = ['மட்டக்களப்பு', 'இலங்கை', 'தமிழ் செய்திகள்', 'அரசியல்', 'விளையாட்டு', 'சர்வதேசம்', 'சுகாதாரம்', 'தொழில்நுட்பம்', 'வணிகம்', 'பொழுதுபோக்கு'];
  return {
    paths: allTags.map(tag => ({ params: { tag: encodeURIComponent(tag) } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const tag = decodeURIComponent(params.tag);
  const all = [...featuredNews, ...latestNews];
  const news = all.filter(n =>
    n.categoryName === tag ||
    (n.title && n.title.includes(tag)) ||
    (n.excerpt && n.excerpt.includes(tag))
  );
  return { props: { tag, news }, revalidate: 60 };
}
