import ToolLayout from "@/components/ToolLayout";
import PinterestGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Pinterest Pin Title Generator";
const OUTPUT_TYPE = "Pinterest titles and descriptions";
const AUDIENCE = "bloggers, Etsy sellers, and content creators";
const SLUG = "pinterest-pin-title-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is a Pinterest Pin Title Generator?",
    answer: "It is an AI tool designed specifically for Pinterest SEO. It generates optimized titles, descriptions, image text, and hashtags for your Pins, helping them rank higher in Pinterest search results."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva Pinterest Pin Title Generator is 100% free."
  },
  {
    question: "How does this tool work?",
    answer: "You provide what your Pin is about (your blog post or product), select your niche, and tone. The AI then writes a complete Pinterest package including the title, description, and hashtags."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes! Pinterest is a visual search engine, not just a social media app. Using the right keywords in your Pin title and description is critical to driving free, passive traffic to your website over time."
  },
  {
    question: "Does it store my data?",
    answer: "No, your Pin details are not stored on our servers."
  },
  {
    question: "What makes a good Pinterest title?",
    answer: "A great Pin title is clear, keyword-rich, and directly promises a solution or inspiration. Since Pinterest truncates titles on mobile feeds, prioritize your most important keywords in the first 40 characters."
  },
  {
    question: "Can I use this for business?",
    answer: "Yes. Many e-commerce brands, digital template sellers, and corporate blogs rely on Pinterest to drive consistent, high-converting top-of-funnel traffic."
  }
];

const contentSections = [
  {
    title: "How Pinterest titles work",
    content: <p>Pinterest operates much more like Google than Instagram. Users go to Pinterest with high commercial and inspirational intent. They search for specific terms (e.g., "Fall wedding ideas" or "SEO tips for beginners"). Your Pin title is the strongest signal to the Pinterest algorithm about what your image represents.</p>
  },
  {
    title: "Pinterest SEO tips",
    content: (
      <ul>
        <li><strong>Keyword research:</strong> Use the Pinterest search bar's autocomplete feature to find what people are actively searching for.</li>
        <li><strong>Consistency:</strong> The text overlay on your graphic (Canva image), your Pin Title, and your Pin Description should all share the same thematic keywords.</li>
        <li><strong>Call to Action:</strong> Don't forget to tell the user what to do in your description (e.g., "Click the link to download the free template!").</li>
      </ul>
    )
  },
  {
    title: "Pin title examples",
    content: (
      <ul>
        <li><strong>Bad:</strong> My Summer Routine</li>
        <li><strong>Good:</strong> Ultimate Summer Morning Routine for College Students | Productivity Tips</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "YouTube Title Generator", slug: "youtube-title-generator" },
  { name: "AI Product Description Generator", slug: "ai-product-description-generator" }
];

export default function PinterestGeneratorPage() {
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
        <PinterestGeneratorClient />
      </ToolLayout>
    </>
  );
}
