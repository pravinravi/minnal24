import Link from 'next/link';
import { formatDate, formatViews } from '../lib/utils';
import { categories } from '../data/newsData';

const getCategoryColor = (catId) => {
  const cat = categories.find(c => c.id === catId);
  return cat?.color || '#CC0000';
};

// Large featured card
export function FeaturedCard({ news }) {
  const color = getCategoryColor(news.category);
  return (
    <article className="news-card relative overflow-hidden rounded-xl bg-white shadow-card group h-full">
      <div className="img-zoom relative h-72 md:h-80 lg:h-96">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 red-overlay"></div>
        {news.isBreaking && (
          <div className="absolute top-3 left-3">
            <span className="pulse-red text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              ⚡ உடனடி
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <div className="mb-2">
            <span className="cat-badge text-white" style={{ backgroundColor: color }}>
              {news.categoryName}
            </span>
          </div>
          <Link href={`/news/${news.slug}`}>
            <h2 className="text-white font-black text-lg md:text-xl lg:text-2xl tamil-text leading-snug line-clamp-3 hover:text-yellow-300 transition-colors cursor-pointer">
              {news.title}
            </h2>
          </Link>
          <div className="flex items-center gap-3 mt-2 text-gray-300 text-xs">
            <span className="tamil-text">{formatDate(news.date)}</span>
            <span>•</span>
            <span className="tamil-text">{news.author}</span>
            <span>•</span>
            <span>👁 {formatViews(news.views)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// Medium card
export function MediumCard({ news }) {
  const color = getCategoryColor(news.category);
  return (
    <article className="news-card bg-white rounded-xl shadow-card overflow-hidden group h-full flex flex-col">
      <div className="img-zoom relative h-44 md:h-48">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        {news.isBreaking && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider">
              ⚡ உடனடி
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="cat-badge text-white text-xs" style={{ backgroundColor: color }}>
            {news.categoryName}
          </span>
        </div>
        <Link href={`/news/${news.slug}`}>
          <h3 className="font-bold text-gray-900 tamil-text text-base leading-snug hover:text-red-600 transition-colors line-clamp-3 cursor-pointer flex-1">
            {news.title}
          </h3>
        </Link>
        {news.excerpt && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 tamil-text">{news.excerpt}</p>
        )}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
          <span className="tamil-text">{formatDate(news.date)}</span>
          <span>•</span>
          <span>👁 {formatViews(news.views)}</span>
        </div>
      </div>
    </article>
  );
}

// Compact list card (for sidebar)
export function CompactCard({ news, index }) {
  const color = getCategoryColor(news.category);
  return (
    <article className="flex gap-3 group p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 font-black text-2xl text-gray-200 w-8 text-center leading-tight pt-1">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="img-zoom flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <span className="text-xs font-bold" style={{ color }}>
            {news.categoryName}
          </span>
        </div>
        <Link href={`/news/${news.slug}`}>
          <h4 className="text-sm font-semibold text-gray-800 tamil-text line-clamp-2 leading-snug hover:text-red-600 transition-colors cursor-pointer">
            {news.title}
          </h4>
        </Link>
        <div className="text-xs text-gray-400 mt-1 tamil-text">{formatDate(news.date)}</div>
      </div>
    </article>
  );
}

// Horizontal list card (for latest news)
export function LatestCard({ news }) {
  const color = getCategoryColor(news.category);
  return (
    <article className="flex gap-3 group border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <div className="img-zoom flex-shrink-0 w-24 h-18 rounded-lg overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-24 h-18 object-cover"
          style={{ height: 72 }}
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold" style={{ color }}>{news.categoryName}</span>
        <Link href={`/news/${news.slug}`}>
          <h4 className="text-sm font-semibold text-gray-800 tamil-text line-clamp-2 hover:text-red-600 transition-colors cursor-pointer leading-snug">
            {news.title}
          </h4>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span className="tamil-text">{formatDate(news.date)}</span>
          <span>• 👁 {formatViews(news.views)}</span>
        </div>
      </div>
    </article>
  );
}
