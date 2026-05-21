import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle, getAllArticleSlugs } from "@/lib/articles";
import { getArticleSEO, generateArticleSchema } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return getArticleSEO(article);
}

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const schema = generateArticleSchema(article, article.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticleLayout article={article} />
    </>
  );
}
