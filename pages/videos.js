import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import AdSlot, { SidebarAd } from '../components/AdSlot';
import { CompactCard } from '../components/NewsCard';
import { popularNews } from '../data/newsData';

const videos = [
  { id: 1, title: 'மட்டக்களப்பு சமீபத்திய நிகழ்வுகள் | Minnal24 நேரடி', thumb: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', duration: '12:45', views: '45K', date: '2024-12-15', youtubeId: 'dQw4w9WgXcQ' },
  { id: 2, title: 'இலங்கை அரசியல் | ஜனாதிபதி உரை முழுமையான பதிவு', thumb: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80', duration: '28:10', views: '89K', date: '2024-12-14', youtubeId: 'dQw4w9WgXcQ' },
  { id: 3, title: 'தமிழ் கிரிக்கெட் | இலங்கை vs இந்தியா போட்டி சிறப்பு', thumb: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80', duration: '5:22', views: '120K', date: '2024-12-13', youtubeId: 'dQw4w9WgXcQ' },
  { id: 4, title: 'மட்டக்களப்பு வெள்ள நிலவரம் | சிறப்பு அறிக்கை', thumb: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&q=80', duration: '8:30', views: '62K', date: '2024-12-12', youtubeId: 'dQw4w9WgXcQ' },
  { id: 5, title: 'சர்வதேச தமிழர் நிலைமை | சிறப்பு நிகழ்ச்சி', thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', duration: '19:05', views: '33K', date: '2024-12-11', youtubeId: 'dQw4w9WgXcQ' },
  { id: 6, title: 'தமிழ் தொழில்நுட்பம் | AI மாற்றங்கள்', thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', duration: '14:50', views: '28K', date: '2024-12-10', youtubeId: 'dQw4w9WgXcQ' },
];

export default function VideosPage() {
  return (
    <Layout>
      <NextSeo
        title="வீடியோ செய்திகள் - Video News"
        description="Minnal24 வீடியோ செய்திகள் - மட்டக்களப்பு மற்றும் இலங்கை தமிழ் வீடியோ செய்திகள்"
        canonical="https://www.minnal24.com/videos"
      />

      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📹</span>
            <div>
              <h1 className="text-2xl font-black text-white tamil-text">வீடியோ செய்திகள்</h1>
              <p className="text-gray-400 text-sm tamil-text">Minnal24 YouTube சேனலில் இருந்து</p>
            </div>
            <a href="https://youtube.com/minnal24" target="_blank" rel="noopener noreferrer"
              className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
              Subscribe
            </a>
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
            {/* Featured video */}
            <div className="bg-black rounded-xl overflow-hidden shadow-xl mb-6">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Minnal24 Latest Video"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-gray-900">
                <h2 className="text-white font-black tamil-text text-lg">{videos[0].title}</h2>
                <div className="flex items-center gap-3 mt-1 text-gray-400 text-sm">
                  <span>👁 {videos[0].views} பார்வைகள்</span>
                  <span>•</span>
                  <span className="tamil-text">{videos[0].date}</span>
                </div>
              </div>
            </div>

            {/* Video grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.slice(1).map(video => (
                <article key={video.id} className="news-card bg-white rounded-xl shadow-card overflow-hidden group cursor-pointer">
                  <div className="relative img-zoom">
                    <img src={video.thumb} alt={video.title} className="w-full h-44 object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 tamil-text text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <span>👁 {video.views}</span>
                      <span>•</span>
                      <span className="tamil-text">{video.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a href="https://youtube.com/minnal24" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors tamil-text">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>
                YouTube-ல் மேலும் வீடியோக்கள்
              </a>
            </div>
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
