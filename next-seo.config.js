// next-seo.config.js
const SEO = {
  titleTemplate: '%s | Minnal24 - இலங்கை தமிழ் செய்திகள்',
  defaultTitle: 'Minnal24 - இலங்கை & மட்டக்களப்பு தமிழ் செய்திகள்',
  description:
    'மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம். சமீபத்திய செய்திகள், அரசியல், விளையாட்டு மற்றும் சர்வதேச தமிழ் செய்திகள்.',
  canonical: 'https://www.minnal24.com',
  openGraph: {
    type: 'website',
    locale: 'ta_LK',
    url: 'https://www.minnal24.com/',
    site_name: 'Minnal24',
    images: [
      {
        url: 'https://www.minnal24.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Minnal24 Tamil News',
      },
    ],
  },
  twitter: {
    handle: '@minnal24news',
    site: '@minnal24news',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    { name: 'keywords', content: 'Tamil news, Sri Lanka Tamil news, Batticaloa news, மட்டக்களப்பு, இலங்கை, Minnal24' },
    { name: 'author', content: 'Minnal24 News Team' },
    { name: 'language', content: 'Tamil' },
    { name: 'geo.region', content: 'LK-5' },
    { name: 'geo.placename', content: 'Batticaloa, Sri Lanka' },
    { name: 'geo.position', content: '7.7102;81.6924' },
    { name: 'ICBM', content: '7.7102, 81.6924' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'theme-color', content: '#CC0000' },
  ],
  additionalLinkTags: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'Minnal24 RSS Feed' },
  ],
};

export default SEO;
