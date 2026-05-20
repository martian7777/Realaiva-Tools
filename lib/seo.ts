import type { Metadata } from 'next';

export const SITE_URL = 'https://tools.realaiva.com';

export function getToolSEO(name: string, output: string, audience: string, slug: string): Metadata {
  const seoTitle = `Free ${name} – Generate ${output} Fast`;
  const metaDescription = `Use this free ${name} to create ${output} for ${audience}. Generate better ideas, improve SEO, and copy results instantly.`;
  const url = `${SITE_URL}/${slug}/`;

  return {
    title: seoTitle,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateToolSchema(name: string, slug: string, faqs: { question: string; answer: string }[]) {
  const url = `${SITE_URL}/${slug}/`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "url": url,
    "applicationCategory": "SEOApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Realaiva"
    }
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "url": url,
    "applicationCategory": "SEOApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": name,
        "item": url
      }
    ]
  };

  return [webAppSchema, softwareAppSchema, faqSchema, breadcrumbSchema];
}
