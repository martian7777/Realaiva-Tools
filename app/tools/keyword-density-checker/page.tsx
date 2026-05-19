import ToolLayout from "@/components/ToolLayout";
import KeywordDensityClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Keyword Density Checker";
const OUTPUT_TYPE = "keyword density analysis";
const AUDIENCE = "SEO professionals, writers, and marketers";
const SLUG = "keyword-density-checker";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is keyword density?",
    answer: "Keyword density is the percentage of times a specific keyword or phrase appears on a web page compared to the total number of words on that page."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, our Keyword Density Checker is completely free."
  },
  {
    question: "How does this tool work?",
    answer: "You paste your written content into the tool and optionally define a focus keyword. It calculates the word count, character count, and analyzes the exact percentage density of your focus keyword and other frequent phrases."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes, this is a core technical SEO tool. While keyword density alone doesn't guarantee rankings, avoiding unnatural keyword stuffing is crucial to staying compliant with Google's spam policies."
  },
  {
    question: "Does it store my text data?",
    answer: "No, all analysis is done directly in your browser. None of your pasted text is sent to or stored on our servers."
  },
  {
    question: "What makes a good keyword density?",
    answer: "While there is no strict rule, most SEO experts agree that a natural density between 0.5% and 1.5% is ideal. Anything over 2.5% or 3% runs the risk of looking like spam to search engines."
  },
  {
    question: "Can I use this for business?",
    answer: "Absolutely. Content managers and SEO agencies use these tools to audit writer submissions before publishing them on their corporate blogs."
  }
];

const contentSections = [
  {
    title: "What is keyword density?",
    content: <p>In SEO, keyword density measures how frequently a given keyword or search phrase appears within a piece of text. In the early days of Google, pushing your keyword density aggressively high was a way to rank. Today, algorithms are much smarter and rely on thematic relevance and natural language processing rather than strictly counting exact match keywords.</p>
  },
  {
    title: "Ideal keyword density",
    content: <p>Most modern SEO guidance suggests keeping your primary keyword density between <strong>0.5% to 1.5%</strong>. If you write an 800-word article, you only need to use your main focus keyword about 4 to 12 times. The priority is always natural phrasing and readability.</p>
  },
  {
    title: "Why keyword stuffing is bad",
    content: (
      <ul>
        <li><strong>Google Penalties:</strong> Google's helpful content updates actively demote pages that read like they were written for search engines rather than human beings.</li>
        <li><strong>Poor UX:</strong> Repeating the exact same phrase over and over destroys the flow of your writing, reducing credibility and increasing user bounce rates.</li>
        <li><strong>Loss of LSI opportunities:</strong> Instead of repeating the same word 20 times, you could have used 10 different secondary (LSI) keywords to rank for a wider variety of terms.</li>
      </ul>
    )
  },
  {
    title: "How to use keywords naturally",
    content: (
      <ul>
        <li>Put your main keyword in the H1, URL, and the first 100 words.</li>
        <li>Use synonyms and related variations throughout the body text instead of repeating the exact phrase.</li>
        <li>Aim to answer user intent completely rather than fixating strictly on the math behind the word count.</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" }
];

export default function KeywordDensityPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The ${TOOL_NAME} by Realaiva helps bloggers, marketers, students, and business owners check SEO optimization and avoid keyword stuffing in seconds.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
      >
        <KeywordDensityClient />
      </ToolLayout>
    </>
  );
}
