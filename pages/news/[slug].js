import { NextSeo, ArticleJsonLd } from 'next-seo';
import Link from 'next/link';
import Layout from '../../components/Layout';
import AdSlot, { SidebarAd, InlineAd } from '../../components/AdSlot';
import { CompactCard, LatestCard } from '../../components/NewsCard';
import { featuredNews, latestNews, popularNews } from '../../data/newsData';
import { formatDate, getReadingTime } from '../../lib/utils';

export default function NewsArticle({ news, relatedNews }) {
  if (!news) return null;

  const articleBody = `
    ${news.excerpt}
    
    இந்த செய்தி மட்டக்களப்பு மாவட்டம் மற்றும் இலங்கை தமிழர்களுக்கு மிகவும் முக்கியமான ஒன்றாகும். 
    இது குறித்த விரிவான தகவல்கள் கீழே கொடுக்கப்பட்டுள்ளன.
    
    இந்த விவகாரத்தில் பல்வேறு தரப்பினரும் தங்கள் கருத்துக்களை தெரிவித்துள்ளனர். 
    அரசியல் வட்டாரங்களில் இது பெரும் விவாதத்தை ஏற்படுத்தியுள்ளது.
    
    மக்கள் தங்கள் கவலைகளை வெளிப்படுத்தியுள்ளனர். அதிகாரிகள் விரைவில் நடவடிக்கை எடுப்பார்கள் என்று எதிர்பார்க்கப்படுகிறது.
    
    இது குறித்த மேலும் விவரங்களுக்கு Minnal24.com-ஐ தொடர்ந்து பின்தொடருங்கள்.
  `;

  return (
    <Layout>
      <NextSeo
        title={news.title}
        description={news.excerpt}
        canonical={`https://www.minnal24.com/news/${news.slug}`}
        openGraph={{
          type: 'article',
          url: `https://www.minnal24.com/news/${news.slug}`,
          title: news.title,
          description: news.excerpt,
          images: [{ url: news.image, width: 1200, height: 630, alt: news.title }],
          article: {
            publishedTime: news.date,
            authors: [`https://www.minnal24.com/author/${news.author}`],
            tags: [news.categoryName, 'Tamil News', 'Sri Lanka', 'Batticaloa'],
          },
        }}
      />
      <ArticleJsonLd
        url={`https://www.minnal24.com/news/${news.slug}`}
        title={news.title}
        images={[news.image]}
        datePublished={news.date}
        authorName={news.author}
        publisherName="Minnal24"
        publisherLogo="https://www.minnal24.com/logo.png"
        description={news.excerpt}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <nav className="text-xs text-gray-500 tamil-text flex items-center gap-1">
            <Link href="/" className="hover:text-red-600 transition-colors">முகப்பு</Link>
            <span>›</span>
            <Link href={`/category/${news.slug}`} className="hover:text-red-600 transition-colors">{news.categoryName}</Link>
            <span>›</span>
            <span className="text-gray-700 line-clamp-1">{news.title.slice(0, 50)}...</span>
          </nav>
        </div>
      </div>

      {/* Top Ad */}
      <div className="bg-white py-3 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              {/* Article header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                {/* Category & Breaking badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Link href={`/category/${news.category}`}>
                    <span className="cat-badge text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer">
                      {news.categoryName}
                    </span>
                  </Link>
                  {news.isBreaking && (
                    <span className="pulse-red text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      ⚡ உடனடி செய்தி
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tamil-text leading-snug mb-4">
                  {news.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="tamil-text font-semibold text-gray-700">{news.author}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="tamil-text">{formatDate(news.date)}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{news.views?.toLocaleString()} பார்வைகள்</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">⏱ {getReadingTime(articleBody)}</span>
                </div>

                {/* Share buttons */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 tamil-text font-semibold">பகிர்:</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://minnal24.com/news/${news.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=https://minnal24.com/news/${news.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                    Twitter
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(news.title + ' - https://minnal24.com/news/' + news.slug)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors">
                    📱 WhatsApp
                  </a>
                  <button
                    onClick={() => navigator.clipboard?.writeText(`https://minnal24.com/news/${news.slug}`)}
                    className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                    🔗 நகலெடு
                  </button>
                </div>
              </div>

              {/* Hero image */}
              <div className="relative">
                <img src={news.image} alt={news.title} className="w-full h-72 md:h-96 object-cover" />
                <div className="bg-gray-50 px-6 py-2 text-xs text-gray-500 italic">
                  படம்: Minnal24 கலைஞர்கள்
                </div>
              </div>

              {/* Article body */}
              <div className="p-6 md:p-8">
                {/* Excerpt highlighted */}
                <div className="bg-red-50 border-l-4 border-red-600 px-5 py-4 mb-6 rounded-r-lg">
                  <p className="text-gray-700 text-base font-semibold tamil-text leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                {/* Body paragraphs */}
                <div className="prose prose-lg max-w-none">
                  <p className="tamil-text text-gray-700 leading-loose mb-4">
                    இந்த செய்தி மட்டக்களப்பு மாவட்டம் மற்றும் இலங்கை தமிழர்களுக்கு மிகவும் முக்கியமான ஒன்றாகும். 
                    இது குறித்த விரிவான தகவல்கள் தொகுக்கப்பட்டுள்ளன. அதிகாரிகளிடமிருந்து கிடைத்த தகவல்களின் படி, 
                    இந்த விவகாரம் விரைவில் தீர்வு காணப்படும் என்று எதிர்பார்க்கப்படுகிறது.
                  </p>

                  <InlineAd />

                  <p className="tamil-text text-gray-700 leading-loose mb-4">
                    இந்த விவகாரத்தில் பல்வேறு தரப்பினரும் தங்கள் கருத்துக்களை தெரிவித்துள்ளனர். 
                    அரசியல் வட்டாரங்களில் இது பெரும் விவாதத்தை ஏற்படுத்தியுள்ளது. 
                    சமூக ஆர்வலர்கள் இதுகுறித்து தீவிர கவனம் செலுத்தி வருகின்றனர்.
                  </p>

                  <h2 className="text-xl font-black text-gray-900 tamil-text mt-6 mb-3">முக்கிய அம்சங்கள்</h2>

                  <p className="tamil-text text-gray-700 leading-loose mb-4">
                    மக்கள் தங்கள் கவலைகளை வெளிப்படுத்தியுள்ளனர். அதிகாரிகள் விரைவில் நடவடிக்கை எடுப்பார்கள் என்று 
                    எதிர்பார்க்கப்படுகிறது. இந்த செய்தியை தொடர்ந்து கண்காணிக்க Minnal24.com-ஐ பின்தொடருங்கள்.
                  </p>

                  <p className="tamil-text text-gray-700 leading-loose">
                    கிழக்கு மாகாண வாசிகளுக்கு இது மிக முக்கியமான செய்தியாகும். மேலும் விவரங்களுக்கு 
                    எங்கள் செய்தி ஆசிரியர் குழுவை news@minnal24.com என்ற மின்னஞ்சலில் தொடர்பு கொள்ளலாம்.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm text-gray-500 tamil-text font-semibold">குறிச்சொற்கள்:</span>
                  {[news.categoryName, 'மட்டக்களப்பு', 'இலங்கை', 'தமிழ் செய்திகள்'].map(tag => (
                    <Link key={tag} href={`/tag/${tag}`}
                      className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors tamil-text">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-red-600 rounded-full"></div>
                  <h2 className="text-xl font-black text-gray-900 tamil-text">தொடர்புடைய செய்திகள்</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedNews.slice(0, 3).map(n => (
                    <article key={n.id} className="news-card bg-white rounded-xl shadow-card overflow-hidden">
                      <div className="img-zoom h-36">
                        <img src={n.image} alt={n.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <Link href={`/news/${n.slug}`}>
                          <h4 className="text-sm font-bold text-gray-800 tamil-text line-clamp-2 hover:text-red-600 transition-colors">
                            {n.title}
                          </h4>
                        </Link>
                        <span className="text-xs text-gray-400 tamil-text">{formatDate(n.date)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </article>

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
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = [...featuredNews, ...latestNews].map(news => ({
    params: { slug: news.slug },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const allNews = [...featuredNews, ...latestNews];
  const news = allNews.find(n => n.slug === params.slug);

  if (!news) {
    return { notFound: true };
  }

  const relatedNews = allNews
    .filter(n => n.id !== news.id && n.category === news.category)
    .slice(0, 3);

  return {
    props: { news, relatedNews },
    revalidate: 60,
  };
}
