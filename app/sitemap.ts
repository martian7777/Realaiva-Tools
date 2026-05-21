import { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';

const SITE_URL = 'https://tools.realaiva.com';

const tools = [
  "ai-blog-title-generator",
  "meta-description-generator",
  "ai-email-subject-line-generator",
  "youtube-title-generator",
  "ai-tool-finder",
  "ai-prompt-generator",
  "keyword-density-checker",
  "blog-outline-generator",
  "pinterest-pin-title-generator",
  "ai-product-description-generator"
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate routes for tools
  const toolRoutes = tools.map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Generate routes for blog articles
  const blogArticleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}/`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...toolRoutes,
    ...blogArticleRoutes,
  ];
}

