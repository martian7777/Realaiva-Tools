import type { Metadata } from 'next';

export const SITE_URL = 'https://tools.realaiva.com';
export const ORG_NAME = 'Realaiva';

export interface ToolSEOOptions {
  focusKeyword: string;
  seoTitle: string;
  metaDescription: string;
}

export function getToolSEO(
  name: string,
  output: string,
  audience: string,
  slug: string,
  opts?: ToolSEOOptions
): Metadata {
  const seoTitle =
    opts?.seoTitle ?? `Free ${name} – Generate ${output} Fast`;
  const metaDescription =
    opts?.metaDescription ??
    `Use this free ${name} to create ${output} for ${audience}. Generate better ideas, improve SEO, and copy results instantly.`;
  const url = `${SITE_URL}/${slug}/`;

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: opts?.focusKeyword
      ? [opts.focusKeyword, name, 'free AI tools', 'Realaiva']
      : [name, 'free AI tools', 'Realaiva'],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      url,
      siteName: 'Realaiva Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
    },
  };
}

export function generateToolSchema(
  name: string,
  slug: string,
  faqs: { question: string; answer: string }[]
) {
  const url = `${SITE_URL}/${slug}/`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: ORG_NAME },
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url,
    applicationCategory: 'SEOApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };

  return [webAppSchema, softwareAppSchema, faqSchema, breadcrumbSchema];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  excerpt: string;
  hero: { src: string; alt: string };
  publishedAt: string;
  updatedAt: string;
}

export function getArticleSEO(a: ArticleMeta): Metadata {
  const url = `${SITE_URL}/blog/${a.slug}/`;
  return {
    title: a.seoTitle,
    description: a.metaDescription,
    keywords: [a.focusKeyword, 'AI tools', 'Realaiva blog'],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: a.seoTitle,
      description: a.metaDescription,
      url,
      siteName: 'Realaiva Tools',
      type: 'article',
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      images: [{ url: a.hero.src, alt: a.hero.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.seoTitle,
      description: a.metaDescription,
      images: [a.hero.src],
    },
  };
}

export function generateArticleSchema(
  a: ArticleMeta,
  faqs: { question: string; answer: string }[]
) {
  const url = `${SITE_URL}/blog/${a.slug}/`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.metaDescription,
    image: [a.hero.src],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    author: { '@type': 'Organization', name: ORG_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: ORG_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: a.focusKeyword,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null;

  return faqSchema
    ? [articleSchema, breadcrumbSchema, faqSchema]
    : [articleSchema, breadcrumbSchema];
}

export function slugifyHeading(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}
