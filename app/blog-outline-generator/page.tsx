import ToolLayout from "@/components/ToolLayout";
import BlogOutlineClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "Blog Outline Generator";
const OUTPUT_TYPE = "article outlines";
const AUDIENCE = "writers, bloggers, and SEO managers";
const SLUG = "blog-outline-generator";
const FOCUS_KEYWORD = "blog outline generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80&auto=format&fit=crop",
  alt: "Blog outline generator creating SEO-friendly article structure on a planning board",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free Blog Outline Generator for SEO-Friendly Article Planning in 2026",
  metaDescription:
    "Create structured blog outlines for SEO articles, how-to guides, listicles, reviews, and pillar posts with our free blog outline generator. Plan before you write.",
});

const faqs = [
  {
    question: "What is a blog outline generator?",
    answer:
      "A blog outline generator is a free AI tool that builds an H2/H3 structure for an article based on your topic and focus keyword, so the post is organized before you write a single paragraph.",
  },
  {
    question: "Is this blog outline generator free?",
    answer: "Yes, the Realaiva blog outline generator is 100% free.",
  },
  {
    question: "How does this blog outline generator work?",
    answer:
      "Enter your topic, target keyword, and desired word count. The blog outline generator constructs an SEO-friendly heading hierarchy, suggests internal links, and proposes an FAQ section.",
  },
  {
    question: "Can the blog outline generator help with SEO?",
    answer:
      "Yes. A clear H2/H3 structure makes content easier for Google to crawl and easier for readers to skim, which improves both rankings and time-on-page.",
  },
  {
    question: "Does the blog outline generator store my data?",
    answer:
      "No. Your topic ideas and generated outlines are processed in real time and not stored.",
  },
  {
    question: "Why do I need an outline before writing?",
    answer:
      "Writing without an outline often leads to rambling drafts that miss key subtopics. An outline keeps the article focused and saves rewriting later.",
  },
  {
    question: "Can the blog outline generator be used for business?",
    answer:
      "Yes. Content teams use it to standardise writer output and ensure every article hits the same SEO checklist.",
  },
];

const contentSections = [
  {
    title: "What Is a Blog Outline Generator?",
    content: (
      <>
        <p>
          A blog outline generator is a free AI tool that produces the structural skeleton of an
          article — H1, H2s, H3s, FAQ, and CTA — based on a topic and a focus keyword. The Realaiva
          blog outline generator gives you a ready-to-write structure aligned with search intent in
          under 10 seconds.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This Blog Outline Generator",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the topic of your article.</li>
          <li>Add the focus keyword.</li>
          <li>Set the target word count (900–2500 words).</li>
          <li>Pick the article type: how-to, listicle, review, or pillar post.</li>
          <li>Generate. Edit the headings until the order matches what your reader needs.</li>
        </ol>
      </>
    ),
  },
  {
    title: "Why Blog Outlines Matter Before Writing",
    content: (
      <>
        <p>
          From my experience, writing without an outline usually creates two problems: the article
          repeats the same idea again and again, or it misses important questions the reader
          actually has. A good outline saves time before writing and improves the final article.
        </p>
        <p>
          The blog outline generator skips the &quot;blank page&quot; phase. Within seconds you
          have a structure, and the writing becomes a matter of filling in sections rather than
          inventing them.
        </p>
      </>
    ),
  },
  {
    title: "What Should a Good Blog Outline Include?",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li>A &quot;What is X&quot; definition section as the first H2.</li>
          <li>A &quot;Why it matters&quot; or &quot;Benefits&quot; section.</li>
          <li>A &quot;How to&quot; step-by-step section.</li>
          <li>Examples.</li>
          <li>Common mistakes.</li>
          <li>Related tools or resources.</li>
          <li>FAQ.</li>
          <li>A clear closing CTA.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Blog Outline Examples by Article Type",
    content: (
      <>
        <p><strong>Listicle:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>H1: 10 Best AI Tools for Students in 2026</li>
          <li>H2: What Are AI Tools for Students?</li>
          <li>H2: Best AI Writing Tools</li>
          <li>H2: Free vs Paid Tools</li>
          <li>H2: Common Student Mistakes With AI</li>
          <li>H2: FAQ</li>
        </ul>
        <p><strong>How-To:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>H1: How to Write SEO-Friendly Blog Posts</li>
          <li>H2: What Are SEO-Friendly Blog Posts?</li>
          <li>H2: Step 1, Step 2, Step 3…</li>
          <li>H2: Common Mistakes to Avoid</li>
          <li>H2: FAQ</li>
        </ul>
      </>
    ),
  },
  {
    title: "SEO Blog Outline Formula",
    content: (
      <>
        <pre className="bg-white border border-[#D9D1C7] rounded-2xl p-4 text-sm overflow-x-auto">
{`Intro: Problem + promise
H2: Basic definition
H2: Why it matters
H2: Step-by-step process
H2: Examples
H2: Common mistakes
H2: Tools/resources
H2: FAQs
Conclusion: Clear next step`}
        </pre>
      </>
    ),
  },
  {
    title: "Common Blog Planning Mistakes",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Skipping the outline and writing whatever comes to mind.</li>
          <li>Using H2s for tiny sub-points instead of major sections.</li>
          <li>Not mapping the focus keyword to at least one H2.</li>
          <li>Forgetting an FAQ block (which often picks up People-Also-Ask traffic).</li>
          <li>Including more H2s than the word count can support — leaving every section thin.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Related Writing Tools",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a></li>
          <li><a className="underline" href="/meta-description-generator">Meta Description Generator</a></li>
          <li><a className="underline" href="/ai-prompt-generator">AI Prompt Generator</a></li>
          <li><a className="underline" href="/keyword-density-checker">Keyword Density Checker</a></li>
        </ul>
        <p>
          Read more:{" "}
          <a className="underline" href="/blog/how-to-write-seo-friendly-blog-posts">
            How to Write SEO-Friendly Blog Posts
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Meta Description Generator", slug: "meta-description-generator" },
  { name: "AI Prompt Generator", slug: "ai-prompt-generator" },
  { name: "Keyword Density Checker", slug: "keyword-density-checker" },
];

const externalRefs = [
  {
    label: "Google SEO Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
  {
    label: "Rank Math: Score 100 in On-Page Tests",
    href: "https://rankmath.com/kb/score-100-in-tests/",
  },
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
        intro={`The free ${FOCUS_KEYWORD} by Realaiva builds SEO-ready ${OUTPUT_TYPE} for how-to guides, listicles, reviews, and pillar posts — before you write a single paragraph.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <BlogOutlineClient />
      </ToolLayout>
    </>
  );
}
