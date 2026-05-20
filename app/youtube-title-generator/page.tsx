import ToolLayout from "@/components/ToolLayout";
import YoutubeTitleGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "YouTube Title Generator";
const OUTPUT_TYPE = "video titles";
const AUDIENCE = "content creators, marketers, and YouTubers";
const SLUG = "youtube-title-generator";

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG);

const faqs = [
  {
    question: "What is a YouTube Title Generator?",
    answer: "It is an AI-powered tool designed to help creators generate highly clickable and search-optimized video titles based on their topic, format, and emotional angle."
  },
  {
    question: "Is this tool free?",
    answer: "Yes, the Realaiva YouTube Title Generator is perfectly free for all creators."
  },
  {
    question: "How does this tool work?",
    answer: "You provide your video topic and target keyword, then select the format, audience, and clickbait level. The tool then acts as an algorithmic expert, producing high-ranking titles and even suggesting short text inserts for your thumbnails."
  },
  {
    question: "Can I use it for SEO?",
    answer: "Yes. Integrating your main keywords effectively into your YouTube title is critical for ranking in YouTube Search and Suggested Videos."
  },
  {
    question: "Does it store my data?",
    answer: "No, we rely on a secure cloud AI connection to generate the ideas instantly and do not store your concepts or channel details."
  },
  {
    question: "What makes a good YouTube title?",
    answer: "The best titles are typically under 60 characters (to avoid being cut off on mobile), evoke strong emotion (curiosity, fear, or excitement), and directly address the viewer's core desire."
  },
  {
    question: "Why do I need thumbnail text?",
    answer: "Your title and thumbnail must work together. While the title can provide detail, your thumbnail text should only be 2 to 4 words that create an immediate visual 'hook'."
  }
];

const contentSections = [
  {
    title: "How YouTube titles affect clicks",
    content: <p>On YouTube, your Click-Through Rate (CTR) and Average View Duration dictate whether the algorithm recommends your video. If your title is boring or confusing, viewers will ignore it, even if the video quality is incredible. A great title bridges the gap between what people search for and what they actually want to see.</p>
  },
  {
    title: "YouTube title examples",
    content: (
      <ul>
        <li><strong>Curiosity Angle:</strong> I Tried the Best AI Tools (So You Don't Have To)</li>
        <li><strong>Urgency/Time Angle:</strong> Learn Next.js in 15 Minutes</li>
        <li><strong>Factual/How-To:</strong> How to Build a PC for Beginners (2026 Guide)</li>
      </ul>
    )
  },
  {
    title: "Mistakes to avoid",
    content: (
      <ul>
        <li><strong>Making the title too long:</strong> Anything over 60 characters gets truncated on most mobile screens. If you must use a long title, put the hook at the beginning.</li>
        <li><strong>Repeating the thumbnail:</strong> If your title says "How to Cook Steak", your thumbnail shouldn't just say "How to Cook Steak". Your thumbnail text could say "The Perfect Sear."</li>
        <li><strong>Extreme Clickbait:</strong> Using titles that completely lie about the video content will cause viewers to click off immediately, killing your channel's retention metrics.</li>
      </ul>
    )
  }
];

const relatedTools = [
  { name: "Pinterest Pin Title Generator", slug: "pinterest-pin-title-generator" },
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" }
];

export default function YoutubeTitleGeneratorPage() {
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
        <YoutubeTitleGeneratorClient />
      </ToolLayout>
    </>
  );
}
