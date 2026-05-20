import ToolLayout from "@/components/ToolLayout";
import MetaDescriptionGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Meta Description Generator";
const OUTPUT_TYPE = "SEO Meta Descriptions";
const AUDIENCE = "blog posts, product pages, tools, and services";
const SLUG = "meta-description-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is a meta description?",
    answer: "A meta description is an HTML attribute that provides a brief summary of a web page. Search engines like Google often display this summary in search results below the page title."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva Meta Description Generator is 100% free to use."
  },
  {
    question: "How does this tool work?",
    answer: "Enter your page topic, target keyword, and choose your preferred page type and tone. The AI then writes compelling descriptions optimized to fit within the ideal character limits and maximize click-through rates."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes, using optimized meta descriptions helps explain to both users and search engines what your page is about, which can improve your organic click-through rate (CTR) and indirectly benefit your SEO."
  },
  {
    question: "Does it store my data?",
    answer: "No, your data is processed securely to generate the results and is not permanently stored."
  },
  {
    question: "What makes a good meta description?",
    answer: "A good meta description clearly states the value or answer the page provides, includes the main keyword naturally, uses an active voice, and ends with a clear call-to-action—all within 150 to 160 characters."
  },
  {
    question: "Can I use this for business?",
    answer: "Absolutely. E-commerce sites, service businesses, and content publishers use concise meta descriptions to entice users to click their links over competitors in the SERPs."
  }
];

const contentSections = [
  {
    title: "What is a meta description?",
    content: <p>A meta description is a short snippet of HTML code that summarizes a webpage's content. While it is not a direct ranking factor for Google, a well-written meta description acts as an organic advertisement, giving searchers a compelling reason to click on your link instead of someone else's.</p>
  },
  {
    title: "Ideal meta description length",
    content: <p>The optimal length for a meta description is generally between <strong>150 and 160 characters</strong> (including spaces). If your description is longer, Google will likely truncate it with an ellipsis (...), which can lose the impact of your message and your call-to-action.</p>
  },
  {
    title: "How to write a good meta description",
    content: (
      <ul>
        <li><strong>Be Specific:</strong> Clearly explain what the user will find on the page.</li>
        <li><strong>Include the Focus Keyword:</strong> While it may not boost rankings directly, Google bolds the search terms in the description, drawing the eye.</li>
        <li><strong>Write a strong Call-to-Action (CTA):</strong> Use phrases like "Read more," "Learn how," "Buy now," or "Get started today."</li>
        <li><strong>Ensure uniqueness:</strong> Every page on your website should have a unique meta description.</li>
      </ul>
    )
  },
  {
    title: "Examples of good meta descriptions",
    content: (
      <ul>
        <li><strong>E-commerce:</strong> "Looking for the best running shoes for flat feet? Browse our top 10 picks with arch support. Free shipping on orders over $50. Shop the collection today!" (158 chars)</li>
        <li><strong>Blog Post:</strong> "Learn how to write SEO-friendly blog posts step-by-step. Discover proven formatting, keyword research, and optimization strategies to rank higher. Start reading!" (160 chars)</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" }
];

export default function MetaDescriptionGeneratorPage() {
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
        <MetaDescriptionGeneratorClient />
      </ToolLayout>
    </>
  );
}
