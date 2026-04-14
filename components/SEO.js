// components/SEO.js - Reusable SEO component
import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';

export function ArticleSEO({ article }) {
  const url = `https://www.minnal24.com/news/${article.slug}`;

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.excerpt}
        canonical={url}
        openGraph={{
          type: 'article',
          url,
          title: article.title,
          description: article.excerpt,
          images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
          article: {
            publishedTime: new Date(article.date).toISOString(),
            authors: [`https://www.minnal24.com`],
            tags: [article.categoryName, 'Tamil News', 'Sri Lanka'],
          },
        }}
      />
      <ArticleJsonLd
        url={url}
        title={article.title}
        images={[article.image]}
        datePublished={new Date(article.date).toISOString()}
        dateModified={new Date(article.date).toISOString()}
        authorName={article.author || 'Minnal24 Reporter'}
        publisherName="Minnal24"
        publisherLogo="https://www.minnal24.com/logo.png"
        description={article.excerpt}
        isAccessibleForFree={true}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'முகப்பு', item: 'https://www.minnal24.com' },
          { position: 2, name: article.categoryName, item: `https://www.minnal24.com/category/${article.category}` },
          { position: 3, name: article.title, item: url },
        ]}
      />
    </>
  );
}

export function CategorySEO({ category }) {
  const url = `https://www.minnal24.com/category/${category.slug}`;
  return (
    <>
      <NextSeo
        title={`${category.tamilName} செய்திகள்`}
        description={`${category.tamilName} பிரிவில் சமீபத்திய செய்திகள் - Minnal24.com`}
        canonical={url}
        openGraph={{ type: 'website', url }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'முகப்பு', item: 'https://www.minnal24.com' },
          { position: 2, name: category.tamilName, item: url },
        ]}
      />
    </>
  );
}
