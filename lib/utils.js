// lib/utils.js

export function formatDate(dateString, locale = 'ta-LK') {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} நிமிடங்களுக்கு முன்`;
  if (diffHours < 24) return `${diffHours} மணி நேரத்திற்கு முன்`;
  if (diffDays < 7) return `${diffDays} நாட்களுக்கு முன்`;
  
  return date.toLocaleDateString('ta-LK', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

export function formatViews(views) {
  if (!views) return '0';
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} நிமிட வாசிப்பு`;
}

export function buildSEOTitle(title, suffix = 'Minnal24') {
  return `${title} | ${suffix}`;
}
