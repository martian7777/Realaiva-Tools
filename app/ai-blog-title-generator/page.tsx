import ToolLayout from "@/components/ToolLayout";
import BlogTitleGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Blog Title Generator";
const OUTPUT_TYPE = "SEO Blog Titles";
const AUDIENCE = "articles, guides, reviews, and list posts";
const SLUG = "ai-blog-title-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is an AI Blog Title Generator?",
    answer: "An AI Blog Title Generator is a tool that uses artificial intelligence to automatically suggest catchy, SEO-friendly titles for your blog posts based on a topic or focus keyword you provide."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva AI Blog Title Generator is 100% free to use."
  },
  {
    question: "How does this tool work?",
    answer: "Simply enter your topic, optional target keyword, and select your preferred tone and audience. The AI will then analyze your inputs and generate multiple highly engaging title options, including a 'Best Pick'."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Absolutely. The tool is specifically designed to incorporate your target keywords naturally, improving your chances of ranking higher on search engines and increasing click-through rates (CTR)."
  },
  {
    question: "Does it store my data?",
    answer: "No, we do not store your inputs or generate results on our servers. Your data is processed securely in real-time."
  },
  {
    question: "What makes a good blog title?",
    answer: "A good blog title is clear, includes the main keyword near the beginning, addresses the search intent of the user, and promises a specific benefit or solution, often utilizing numbers or strong emotional words."
  },
  {
    question: "Can I use this for business?",
    answer: "Yes, businesses, marketers, and independent creators can use these titles to improve content marketing efforts, attract more organic traffic, and boost conversions."
  }
];

const contentSections = [
  {
    title: "What is an AI Blog Title Generator?",
    content: <p>An AI Blog Title Generator is a smart tool that uses natural language processing to create optimized headlines for your articles. Instead of spending hours brainstorming, you can instantly get dozens of creative, click-worthy ideas tailored to your specific audience and niche.</p>
  },
  {
    title: "How to write SEO-friendly blog titles",
    content: (
      <ul>
        <li><strong>Front-load your main keyword:</strong> Place your primary keyword as close to the beginning of the title as possible.</li>
        <li><strong>Match search intent:</strong> Understand whether your audience is looking for information (how-to), a comparison, or a transactional page.</li>
        <li><strong>Keep it under 60 characters:</strong> This ensures your title doesn't get cut off in Google search results.</li>
        <li><strong>Use modifiers:</strong> Words like "Best," "Guide," "2026," or "Checklist" can attract long-tail searches.</li>
      </ul>
    )
  },
  {
    title: "Blog title examples",
    content: (
      <ul>
        <li><strong>Listicle:</strong> 10 Best AI Tools for Students in 2026</li>
        <li><strong>How-to:</strong> How to Write SEO-Friendly Blog Titles (Step-by-Step Guide)</li>
        <li><strong>Review:</strong> Jasper AI Review: Is it Worth the Price?</li>
      </ul>
    )
  },
  {
    title: "Common title mistakes",
    content: (
      <ul>
        <li><strong>Keyword stuffing:</strong> Forcing too many keywords makes the title look unnatural and spammy.</li>
        <li><strong>Clickbait without substance:</strong> Overpromising in the title and underdelivering in the content will hurt your bounce rate.</li>
        <li><strong>Being too vague:</strong> "Marketing Tips" is too broad. "7 B2B Marketing Tips for Local Businesses" is much better.</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
  { name: "Meta Description Generator", slug: "meta-description-generator" }
];

export default function BlogTitleGeneratorPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The ${TOOL_NAME} by Realaiva helps bloggers, marketers, students, and business owners create SEO-friendly ${OUTPUT_TYPE.toLowerCase()} in seconds.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <BlogTitleGeneratorClient />
      </ToolLayout>
    </>
  );
}
