import { MetadataRoute } from 'next';

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
  const routes = tools.map((slug) => ({
    url: `https://realaiva.com/tools/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://realaiva.com/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://realaiva.com/tools/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...routes,
  ];
}
