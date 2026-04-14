// lib/api.js - API helper functions for fetching news
// Replace these with your actual CMS/API endpoints when ready

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.minnal24.com';
const CMS_API = process.env.CMS_API_URL || null;

/**
 * Fetch all posts from WordPress REST API (if using WordPress as headless CMS)
 * Usage: const posts = await fetchWordPressPosts({ category: 'batticaloa', perPage: 10 })
 */
export async function fetchWordPressPosts({ category, perPage = 10, page = 1, slug } = {}) {
  if (!CMS_API) return null;

  let url = `${CMS_API}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`;
  if (category) url += `&categories=${category}`;
  if (slug) url += `&slug=${slug}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const posts = await res.json();
    return posts.map(normalizeWordPressPost);
  } catch (err) {
    console.error('fetchWordPressPosts error:', err);
    return null;
  }
}

/**
 * Normalize WordPress post shape to match our news schema
 */
function normalizeWordPressPost(post) {
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';

  return {
    id: post.id,
    title: post.title?.rendered || '',
    excerpt: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
    content: post.content?.rendered || '',
    image: featuredImage,
    date: post.date,
    slug: post.slug,
    author: post._embedded?.author?.[0]?.name || 'Minnal24',
    category: post.categories?.[0] || 'general',
    categoryName: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'செய்திகள்',
    views: 0,
    isBreaking: post.tags?.includes('breaking') || false,
  };
}

/**
 * Fetch a single post by slug
 */
export async function fetchPostBySlug(slug) {
  const posts = await fetchWordPressPosts({ slug });
  return posts?.[0] || null;
}

/**
 * Fetch posts by category slug
 */
export async function fetchPostsByCategory(categorySlug, perPage = 12) {
  return fetchWordPressPosts({ category: categorySlug, perPage });
}

/**
 * Generate full URL for a news article
 */
export function getArticleUrl(slug) {
  return `${SITE_URL}/news/${slug}`;
}

/**
 * Generate full URL for a category page
 */
export function getCategoryUrl(slug) {
  return `${SITE_URL}/category/${slug}`;
}

/**
 * Format number of views in Tamil-friendly short format
 */
export function formatViewCount(count) {
  if (!count) return '0';
  if (count >= 100000) return `${(count / 100000).toFixed(1)} லட்சம்`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return String(count);
}

/**
 * Get relative time in Tamil
 */
export function getRelativeTimeTamil(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'இப்போதுதான்';
  if (diffMins < 60) return `${diffMins} நிமிடங்களுக்கு முன்`;
  if (diffHours < 24) return `${diffHours} மணி நேரத்திற்கு முன்`;
  if (diffDays < 7) return `${diffDays} நாட்களுக்கு முன்`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} வாரங்களுக்கு முன்`;
  return date.toLocaleDateString('ta-LK', { year: 'numeric', month: 'long', day: 'numeric' });
}
