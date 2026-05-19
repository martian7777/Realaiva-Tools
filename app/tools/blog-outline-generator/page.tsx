import ToolLayout from "@/components/ToolLayout";
import BlogOutlineClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Blog Outline Generator";
const OUTPUT_TYPE = "article outlines";
const AUDIENCE = "writers, bloggers, and SEO managers";
const SLUG = "blog-outline-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is a blog outline?",
    answer: "A blog outline is the structural skeleton of your article. It breaks down your main topic into logical sections using headings (H1, H2, H3), ensuring your final piece flows well and covers all necessary subtopics."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva Blog Outline Generator is completely free."
  },
  {
    question: "How does this tool work?",
    answer: "You provide a topic, target keywords, and your desired word count. The AI then constructs an SEO-optimized hierarchy of headings, suggests internal links, outputs image prompts, and generates a FAQ section."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Absolutely. A well-structured outline is the foundation of on-page SEO. By organizing content logically with proper nested headings, you make it easier for Google to crawl, understand, and rank your article."
  },
  {
    question: "Does it store my data?",
    answer: "No, your topic ideas and generated outlines are processed in real-time and are not saved on our servers."
  },
  {
    question: "Why do I need an outline before writing?",
    answer: "Writing without an outline often leads to rambling, missed crucial points, and repetitive content. An outline ensures you hit your word count target efficiently while keeping the reader engaged from start to finish."
  },
  {
    question: "Can I use this for business?",
    answer: "Yes, content marketing teams use outlines to standardize writing output, ensuring that freelance writers or in-house marketers hit all the required SEO points before drafting."
  }
];

const contentSections = [
  {
    title: "What is a blog outline?",
    content: <p>A blog outline is a roadmap for your content. Before writing a single paragraph, an outline organizes your thoughts into a logical flow. It defines the structure using HTML heading tags (H1, H2, H3) so that you know exactly what topics will be covered, in what order, and how deep you need to go to satisfy the reader's intent.</p>
  },
  {
    title: "How outlines improve SEO",
    content: (
      <ul>
        <li><strong>Crawlabilitiy:</strong> Properly nested headings (H2s inside H1s, H3s inside H2s) create a clean document structure that search engine bots prefer.</li>
        <li><strong>Comprehensive Topic Coverage:</strong> By outlining first, you can ensure you answer the "People Also Ask" questions and cover semantic subtopics, increasing topical authority.</li>
        <li><strong>Readability:</strong> Large walls of text cause users to bounce. Outlines naturally break content into digestible, skimmable chunks, which increases time-on-page.</li>
      </ul>
    )
  },
  {
    title: "Blog outline examples",
    content: (
      <ul>
        <li><strong>H1:</strong> Best AI Tools for Students in 2026</li>
        <li><strong>H2:</strong> What Are AI Tools for Students?</li>
        <li><strong>H2:</strong> Best AI Writing Tools</li>
        <li><strong>H3:</strong> tool 1... tool 2...</li>
        <li><strong>H2:</strong> Free vs Paid Tools</li>
        <li><strong>H2:</strong> FAQs</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Keyword Density Checker", slug: "keyword-density-checker" }
];

export default function BlogOutlinePage() {
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
        <BlogOutlineClient />
      </ToolLayout>
    </>
  );
}
