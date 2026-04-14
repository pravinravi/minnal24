import { NextSeo, ArticleJsonLd } from 'next-seo';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Layout from '../../components/Layout';
import { SidebarAd } from '../../components/AdSlot';
import { CompactCard, LatestCard } from '../../components/NewsCard';
import { featuredNews, latestNews } from '../../data/newsData';
import { formatDate, getReadingTime } from '../../lib/utils';

function getAllNews() {
  let adminPosts = [];
  try {
    const f = path.join(process.cwd(), 'data', 'admin-posts.json');
    if (fs.existsSync(f)) adminPosts = JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch {}
  return [...adminPosts, ...featuredNews, ...latestNews];
}

export default function NewsArticle({ news, relatedNews }) {
  if (!news) return null;

  return (
    <Layout>
      <NextSeo
        title={news.title}
        description={news.excerpt || news.title}
        canonical={`https://www.minnal24.com/news/${news.slug}`}
        openGraph={{
          type: 'article',
          url: `https://www.minnal24.com/news/${news.slug}`,
          title: news.title,
          description: news.excerpt || news.title,
          images: [{ url: news.image || 'https://www.minnal24.com/og-image.jpg', width: 1200, height: 630, alt: news.title }],
          article: {
            publishedTime: news.date,
            authors: [`https://www.minnal24.com`],
            tags: [news.categoryName, 'Tamil News', 'Sri Lanka'],
          },
        }}
      />
      <ArticleJsonLd
        url={`https://www.minnal24.com/news/${news.slug}`}
        title={news.title}
        images={[news.image || 'https://www.minnal24.com/og-image.jpg']}
        datePublished={news.date}
        authorName={news.author || 'Minnal24 News'}
        publisherName="Minnal24"
        publisherLogo="https://www.minnal24.com/logo.png"
        description={news.excerpt || news.title}
      />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <nav className="text-xs text-gray-500 tamil-text flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-red-600 transition-colors">முகப்பு</Link>
            <span>›</span>
            <Link href={`/category/${news.category}`} className="hover:text-red-600 transition-colors">{news.categoryName}</Link>
            <span>›</span>
            <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{news.title?.slice(0, 40)}...</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article */}
          <article className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
              {/* Hero image */}
              {news.image && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {news.isBreaking && (
                    <div className="absolute top-4 left-4">
                      <span className="pulse-red text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                        ⚡ உடனடி
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Article header */}
              <div className="p-6 md:p-8">
                {/* Category badge */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Link href={`/category/${news.category}`}>
                    <span className="cat-badge text-white cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#CC0000' }}>
                      {news.categoryName}
                    </span>
                  </Link>
                  {news.isBreaking && (
                    <span className="bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full uppercase">
                      ⚡ Breaking
                    </span>
                  )}
                  {news.featured && (
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-black px-3 py-1 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tamil-text leading-snug mb-5">
                  {news.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-5 mb-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="tamil-text font-semibold text-gray-700 dark:text-gray-300">{news.author || 'Minnal24 News'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="tamil-text">{formatDate(news.date)}</span>
                  </div>
                  {news.views > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{news.views?.toLocaleString()} பார்வைகள்</span>
                    </div>
                  )}
                </div>

                {/* Share buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-gray-500 tamil-text font-semibold">பகிர்:</span>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://minnal24.com/news/${news.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=https://minnal24.com/news/${news.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-gray-800 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                    Twitter
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(news.title + ' - https://minnal24.com/news/' + news.slug)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <button onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(`https://minnal24.com/news/${news.slug}`); }}
                    className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    🔗 நகலெடு
                  </button>
                </div>

                {/* Excerpt highlight */}
                {news.excerpt && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 px-5 py-4 mb-6 rounded-r-xl">
                    <p className="text-gray-700 dark:text-gray-300 text-base font-semibold tamil-text leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                )}

                {/* Article body */}
                <div className="prose prose-lg max-w-none">
                  {news.content ? (
                    <div className="tamil-text text-gray-700 dark:text-gray-300 leading-loose text-base whitespace-pre-wrap">
                      {news.content}
                    </div>
                  ) : (
                    <>
                      <p className="tamil-text text-gray-700 dark:text-gray-300 leading-loose mb-4">
                        இந்த செய்தி மட்டக்களப்பு மாவட்டம் மற்றும் இலங்கை தமிழர்களுக்கு மிகவும் முக்கியமானது.
                        அதிகாரிகளிடமிருந்து கிடைத்த தகவல்களின் படி, இந்த விவகாரம் விரைவில் தீர்வு காணப்படும்.
                      </p>
                      <p className="tamil-text text-gray-700 dark:text-gray-300 leading-loose mb-4">
                        இந்த விவகாரத்தில் பல்வேறு தரப்பினரும் தங்கள் கருத்துக்களை தெரிவித்துள்ளனர்.
                        மேலும் விவரங்களுக்கு Minnal24.com-ஐ தொடர்ந்து பின்தொடருங்கள்.
                      </p>
                    </>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 tamil-text font-semibold">குறிச்சொற்கள்:</span>
                  {[news.categoryName, 'மட்டக்களப்பு', 'இலங்கை', 'தமிழ் செய்திகள்'].map(tag => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors tamil-text">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Related News */}
            {relatedNews?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-7 bg-red-600 rounded-full"></div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white tamil-text">தொடர்புடைய செய்திகள்</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedNews.map(n => (
                    <Link key={n.id} href={`/news/${n.slug}`}>
                      <article className="news-card bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden cursor-pointer">
                        {n.image && (
                          <div className="img-zoom h-36 overflow-hidden">
                            <img src={n.image} alt={n.title} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        )}
                        <div className="p-3">
                          <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 tamil-text line-clamp-2 hover:text-red-600 transition-colors leading-snug">
                            {n.title}
                          </h4>
                          <span className="text-xs text-gray-400 mt-1 block tamil-text">{formatDate(n.date)}</span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            <SidebarAd />
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
                <h3 className="font-black text-gray-900 dark:text-white tamil-text">பிரபலமான செய்திகள்</h3>
              </div>
              <div className="space-y-2">
                {relatedNews?.slice(0, 5).map((n, i) => (
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
  const allNews = getAllNews();
  const paths = allNews.map(news => ({ params: { slug: news.slug } })).filter(p => p.params.slug);
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const allNews = getAllNews();
  const news = allNews.find(n => n.slug === params.slug);

  if (!news) {
    return { notFound: true };
  }

  const relatedNews = allNews
    .filter(n => n.id !== news.id && n.category === news.category)
    .slice(0, 3);

  return {
    props: { news, relatedNews },
    revalidate: 30,
  };
}
