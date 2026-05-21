import ToolLayout from "@/components/ToolLayout";
import YoutubeTitleGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "YouTube Title Generator";
const OUTPUT_TYPE = "video titles";
const AUDIENCE = "content creators, marketers, and YouTubers";
const SLUG = "youtube-title-generator";
const FOCUS_KEYWORD = "YouTube title generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=80&auto=format&fit=crop",
  alt: "YouTube title generator creating clickable video title ideas on a creator dashboard",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free YouTube Title Generator for 10x More Clickable Video Ideas",
  metaDescription:
    "Use our free YouTube title generator to create clickable, SEO-friendly video titles for tutorials, reviews, shorts, vlogs, and educational videos in seconds.",
});

const faqs = [
  {
    question: "What is a YouTube title generator?",
    answer:
      "A YouTube title generator is an AI tool that creates clickable, SEO-friendly video titles based on your topic, audience, and tone — designed to improve CTR and ranking on YouTube Search.",
  },
  {
    question: "Is this YouTube title generator free?",
    answer: "Yes, the Realaiva YouTube title generator is 100% free for creators of any size.",
  },
  {
    question: "How does this YouTube title generator work?",
    answer:
      "Enter your topic and target keyword, then pick a format (tutorial, review, shorts), audience, and tone. The tool produces ranked titles and optional thumbnail text ideas.",
  },
  {
    question: "Does the YouTube title generator help with SEO?",
    answer:
      "Yes. Integrating the right keyword into your YouTube title is critical for ranking in YouTube Search and Suggested Videos.",
  },
  {
    question: "Does this tool store my video ideas?",
    answer: "No. Your topics are processed in real time and never stored.",
  },
  {
    question: "What is the ideal YouTube title length?",
    answer:
      "Under 60 characters for full mobile display. Longer titles still work, but place the hook in the first 50 characters.",
  },
  {
    question: "What is the difference between clickbait and a click-worthy title?",
    answer:
      "A click-worthy title creates curiosity and matches what the viewer actually sees. Clickbait promises something the video does not deliver, hurting retention and long-term ranking.",
  },
];

const contentSections = [
  {
    title: "What Is a YouTube Title Generator?",
    content: (
      <>
        <p>
          A YouTube title generator is a free AI tool that produces clickable, SEO-friendly titles
          for any video — tutorials, vlogs, reviews, shorts, or educational content. The Realaiva
          YouTube title generator turns your topic into a ranked list of titles that fit YouTube&apos;s
          algorithm and viewer expectations on mobile.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This YouTube Title Generator",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Type your video topic.</li>
          <li>Add the focus keyword if you have one.</li>
          <li>Select format: tutorial, review, listicle, story, or shorts.</li>
          <li>Pick a tone (curious, urgent, expert).</li>
          <li>Generate and pick a title that fits inside 60 characters.</li>
        </ol>
      </>
    ),
  },
  {
    title: "Why Your YouTube Title Matters",
    content: (
      <>
        <p>
          YouTube&apos;s recommendation engine weighs Click-Through Rate (CTR) and Average View
          Duration. Your title is the single biggest CTR lever you control. A good title bridges the
          gap between what people are searching for and what they actually want to watch.
        </p>
        <p>
          Get the title right and even a 5-minute video can outperform an hour-long competitor with
          a weaker hook.
        </p>
      </>
    ),
  },
  {
    title: "What Makes a Good YouTube Title?",
    content: (
      <>
        <p>
          In my opinion, the best YouTube titles are not the loudest ones. They are the clearest
          ones. A title should make the viewer immediately understand what problem the video solves
          or what result they will get.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Hook in the first 5 words.</li>
          <li>One specific number or outcome.</li>
          <li>Match the thumbnail — never repeat the same words.</li>
          <li>Front-load the focus keyword for search ranking.</li>
        </ul>
      </>
    ),
  },
  {
    title: "YouTube Title Examples by Video Type",
    content: (
      <>
        <p><strong>Weak:</strong> My YouTube SEO Tips</p>
        <p><strong>Better:</strong> How to Rank YouTube Videos Faster: 7 SEO Tips for Beginners</p>
        <p><strong>Weak:</strong> AI Tools</p>
        <p><strong>Better:</strong> I Tested 7 AI Tools for YouTube Creators — These Actually Helped</p>
        <p><strong>Weak:</strong> Cooking Pasta</p>
        <p><strong>Better:</strong> The 15-Minute Pasta Recipe That Tastes Like a Restaurant</p>
      </>
    ),
  },
  {
    title: "YouTube Title Formulas You Can Use",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>How-To:</strong> How to [Outcome] in [Timeframe]</li>
          <li><strong>Listicle:</strong> [Number] [Things] That [Surprising Outcome]</li>
          <li><strong>I Tried:</strong> I Tried [Trend] So You Don&apos;t Have To</li>
          <li><strong>Versus:</strong> [Option A] vs [Option B] — Which Is Better in 2026?</li>
          <li><strong>Mistake:</strong> [Number] [Topic] Mistakes Beginners Always Make</li>
        </ul>
      </>
    ),
  },
  {
    title: "Clickbait vs Click-Worthy Titles",
    content: (
      <>
        <p>
          The line is honesty. A click-worthy title creates curiosity and is fully delivered by the
          video. Clickbait promises something the video does not show. Clickbait still gets the
          click, but retention crashes and YouTube&apos;s algorithm stops promoting the channel.
        </p>
        <p>
          Use the YouTube title generator to push for curiosity without overpromising. If a title
          makes you uncomfortable, rewrite it.
        </p>
      </>
    ),
  },
  {
    title: "Related Creator Tools",
    content: (
      <>
        <p>Pair the YouTube title generator with these other Realaiva tools:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a> — for the blog version of your video.</li>
          <li><a className="underline" href="/ai-prompt-generator">AI Prompt Generator</a> — for scripts, descriptions, and chapter markers.</li>
          <li><a className="underline" href="/pinterest-pin-title-generator">Pinterest Pin Title Generator</a> — to drive Pinterest traffic to your video.</li>
          <li><a className="underline" href="/blog-outline-generator">Blog Outline Generator</a> — for the video&apos;s outline before scripting.</li>
        </ul>
        <p>
          Full read:{" "}
          <a className="underline" href="/blog/best-ai-tools-for-digital-marketing">
            Best AI Tools for Digital Marketing
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
  { name: "Pinterest Pin Title Generator", slug: "pinterest-pin-title-generator" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
];

const externalRefs = [
  {
    label: "YouTube Creator Academy",
    href: "https://creatoracademy.youtube.com/page/education",
  },
  {
    label: "Google SEO Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
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
        intro={`The free ${FOCUS_KEYWORD} by Realaiva helps creators and marketers write ${OUTPUT_TYPE} that lift CTR — for tutorials, vlogs, shorts, and reviews.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <YoutubeTitleGeneratorClient />
      </ToolLayout>
    </>
  );
}
