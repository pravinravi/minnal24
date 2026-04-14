import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Analytics, { trackPageView } from '../components/Analytics';

const defaultSEO = {
  titleTemplate: '%s | Minnal24 - இலங்கை தமிழ் செய்திகள்',
  defaultTitle: 'Minnal24 - இலங்கை & மட்டக்களப்பு தமிழ் செய்திகள் | minnal24.com',
  description: 'மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம். சமீபத்திய செய்திகள், அரசியல், விளையாட்டு, பொழுதுபோக்கு மற்றும் சர்வதேச தமிழ் செய்திகள்.',
  openGraph: {
    type: 'website',
    locale: 'ta_LK',
    url: 'https://www.minnal24.com/',
    site_name: 'Minnal24',
    images: [{ url: 'https://www.minnal24.com/og-image.jpg', width: 1200, height: 630, alt: 'Minnal24 News' }],
  },
  twitter: {
    handle: '@minnal24news',
    site: '@minnal24news',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    { name: 'keywords', content: 'Tamil news, Sri Lanka news, Batticaloa news, மட்டக்களப்பு செய்திகள், இலங்கை தமிழ் செய்திகள், Minnal24' },
    { name: 'author', content: 'Minnal24 News Team' },
    { name: 'language', content: 'Tamil' },
    { name: 'geo.region', content: 'LK-5' },
    { name: 'geo.placename', content: 'Batticaloa, Sri Lanka' },
    { name: 'robots', content: 'index, follow' },
  ],
  additionalLinkTags: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/manifest.json' },
  ],
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => trackPageView(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Source+Sans+3:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultSeo {...defaultSEO} />
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
