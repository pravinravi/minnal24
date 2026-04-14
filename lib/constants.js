// lib/constants.js - Global site constants

export const SITE = {
  name: 'Minnal24',
  tagline: 'மட்டக்களப்பு & இலங்கை தமிழ் செய்திகள்',
  url: 'https://www.minnal24.com',
  email: 'news@minnal24.com',
  adsEmail: 'ads@minnal24.com',
  phone: '+94XXXXXXXXX',
  whatsapp: '94XXXXXXXXX',
  address: 'Batticaloa, Sri Lanka',
  founded: '2020',
  language: 'ta',
  locale: 'ta_LK',
  region: 'LK-5',
  coordinates: { lat: 7.7102, lng: 81.6924 },
};

export const SOCIAL = {
  facebook: 'https://www.facebook.com/minnal24',
  youtube: 'https://www.youtube.com/minnal24',
  twitter: 'https://twitter.com/minnal24news',
  instagram: 'https://www.instagram.com/minnal24',
  telegram: 'https://t.me/minnal24news',
  whatsapp: 'https://wa.me/94XXXXXXXXX',
};

export const AD_SIZES = {
  leaderboard: { w: 728, h: 90 },
  rectangle: { w: 300, h: 250 },
  largeRectangle: { w: 336, h: 280 },
  halfPage: { w: 300, h: 600 },
  skyscraper: { w: 160, h: 600 },
  mobileBanner: { w: 320, h: 50 },
  billboard: { w: 970, h: 250 },
};

export const BREAKING_REFRESH_INTERVAL = 30000; // 30 seconds
export const NEWS_REVALIDATE_SECONDS = 60;
export const CATEGORY_REVALIDATE_SECONDS = 120;
export const HOME_REVALIDATE_SECONDS = 30;

export const ITEMS_PER_PAGE = 12;
export const SIDEBAR_NEWS_COUNT = 6;
export const POPULAR_NEWS_COUNT = 5;
export const RELATED_NEWS_COUNT = 3;
