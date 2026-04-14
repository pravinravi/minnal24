import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ta" dir="ltr">
      <Head>
        <meta name="theme-color" content="#CC0000" />
        <meta name="msapplication-TileColor" content="#CC0000" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        {/* Structured data for news organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Minnal24",
              "url": "https://www.minnal24.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.minnal24.com/logo.png",
                "width": 600,
                "height": 200
              },
              "description": "மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம்",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Batticaloa",
                "addressCountry": "LK"
              },
              "sameAs": [
                "https://www.facebook.com/minnal24",
                "https://www.twitter.com/minnal24news",
                "https://www.youtube.com/minnal24"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
