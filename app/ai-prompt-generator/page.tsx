import ToolLayout from "@/components/ToolLayout";
import PromptGeneratorClient from "./client";
import { getToolSEO, generateToolSchema } from "@/lib/seo";

const TOOL_NAME = "AI Prompt Generator";
const OUTPUT_TYPE = "expert AI prompts";
const AUDIENCE = "ChatGPT, Claude, and Gemini users";
const SLUG = "ai-prompt-generator";
const FOCUS_KEYWORD = "AI prompt generator";

const HERO = {
  src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80&auto=format&fit=crop",
  alt: "AI prompt generator for creating better prompts for ChatGPT, Claude, and Gemini",
};

export const metadata = getToolSEO(TOOL_NAME, OUTPUT_TYPE, AUDIENCE, SLUG, {
  focusKeyword: FOCUS_KEYWORD,
  seoTitle: "Free AI Prompt Generator for ChatGPT, Gemini and Claude in 2026",
  metaDescription:
    "Generate better AI prompts for writing, SEO, marketing, business, students, coding, and productivity with our free AI prompt generator. Better prompts, better answers.",
});

const faqs = [
  {
    question: "What is an AI prompt generator?",
    answer:
      'An AI prompt generator turns a basic idea (like "write a blog post") into a detailed, structured prompt that forces large language models to deliver expert-level results on the first try.',
  },
  {
    question: "Is this AI prompt generator free?",
    answer: "Yes, the Realaiva AI prompt generator is completely free with no limits.",
  },
  {
    question: "How does the AI prompt generator work?",
    answer:
      "Type your task, pick the target model (ChatGPT, Claude, Gemini, Midjourney), choose a role and an output format. The AI prompt generator builds a multi-paragraph prompt using proven prompt-engineering patterns.",
  },
  {
    question: "Can the AI prompt generator help with SEO writing?",
    answer:
      "Yes. Selecting the SEO task type produces prompts that command the model to include keywords naturally, use correct heading structures, and follow Google's helpful content guidance.",
  },
  {
    question: "Does this tool store my prompts?",
    answer: "No. The AI prompt generator does not save your inputs.",
  },
  {
    question: "Why use an AI prompt generator instead of typing a prompt directly?",
    answer:
      "LLMs often produce generic answers to vague prompts. A structured prompt with role, task, context, format, and constraints almost always returns sharper, more usable output the first time.",
  },
  {
    question: "Does the AI prompt generator work for image models?",
    answer:
      "Yes. Choose Midjourney or DALL-E as the target and the prompt generator produces prompts with style, camera, lighting, and aspect-ratio parameters.",
  },
];

const contentSections = [
  {
    title: "What Is an AI Prompt Generator?",
    content: (
      <>
        <p>
          An AI prompt generator is a free tool that turns a basic idea into a fully structured
          prompt — with a clear role, task, context, output format, and constraints — so language
          models like ChatGPT, Claude, and Gemini return expert-level answers on the first try.
        </p>
        <p>
          Think of prompt engineering like communicating with a very smart intern. Vague
          instructions get vague results. A structured prompt removes the guesswork.
        </p>
      </>
    ),
  },
  {
    title: "How to Use This AI Prompt Generator",
    content: (
      <>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Type your task in plain English.</li>
          <li>Pick the target model (ChatGPT, Claude, Gemini, Midjourney, etc.).</li>
          <li>Choose a role (writer, engineer, marketer, tutor).</li>
          <li>Pick output format (article, bullets, JSON, table).</li>
          <li>Copy the generated prompt and paste it into your LLM.</li>
        </ol>
      </>
    ),
  },
  {
    title: "What Makes a Good AI Prompt?",
    content: (
      <>
        <p>
          My favorite prompt style is not complicated. I like prompts that clearly tell the AI what
          role to take, what task to complete, what context to use, and what format to return. Most
          bad AI answers come from vague prompts, not from the AI tool itself.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Role:</strong> &quot;Act as a senior SEO writer&quot;</li>
          <li><strong>Task:</strong> &quot;Write a 1,200-word article on X&quot;</li>
          <li><strong>Context:</strong> &quot;The reader is a beginner blogger&quot;</li>
          <li><strong>Format:</strong> &quot;Use H2s and bullet points&quot;</li>
          <li><strong>Constraints:</strong> &quot;Avoid the words &lsquo;delve&rsquo; and &lsquo;testament&rsquo;&quot;</li>
        </ul>
      </>
    ),
  },
  {
    title: "Prompt Examples for Different Use Cases",
    content: (
      <>
        <p><strong>Content writing:</strong> &quot;Act as an expert SEO writer. Write a 1,500-word article on [topic]. Use a conversational tone. Avoid robotic words. Format with H2s and bullet points.&quot;</p>
        <p><strong>Coding:</strong> &quot;Act as a senior React engineer. Refactor this component to use modern hooks and Tailwind. Explain performance improvements briefly.&quot;</p>
        <p><strong>Image generation:</strong> &quot;A photorealistic portrait of a cyberpunk hacker in neon lighting, 85mm lens, f/1.8, cinematic --ar 16:9&quot;</p>
        <p><strong>Study:</strong> &quot;Act as a tutor. Explain photosynthesis to a 12-year-old in 200 words, then quiz me with three questions.&quot;</p>
      </>
    ),
  },
  {
    title: "Prompt Formula: Role, Task, Context, Format and Constraints",
    content: (
      <>
        <pre className="bg-white border border-[#D9D1C7] rounded-2xl p-4 text-sm overflow-x-auto">
{`Act as a [role].
Your task is to [task].
Use this context: [context].
Return the answer in this format: [format].
Follow these constraints: [constraints].`}
        </pre>
        <p>
          The AI prompt generator fills every slot for you, but knowing the formula helps you tweak
          prompts manually when needed.
        </p>
      </>
    ),
  },
  {
    title: "Common Prompt Writing Mistakes",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Asking &quot;write me an article&quot; with no context or format.</li>
          <li>Stacking five tasks into one prompt and getting a shallow result on each.</li>
          <li>Forgetting to specify length and tone.</li>
          <li>Letting the model assume the audience instead of stating it explicitly.</li>
          <li>Ignoring the system message (in ChatGPT) where role usually lives best.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How to Improve AI Responses",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2">
          <li>Add 1–2 examples of a good output (few-shot prompting).</li>
          <li>Iterate: ask the model what was missing, then refine.</li>
          <li>Constrain length to force focused answers.</li>
          <li>Specify what NOT to include — banned phrases, banned topics.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Related Free AI Tools",
    content: (
      <>
        <p>Combine the AI prompt generator with these other Realaiva tools:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><a className="underline" href="/ai-blog-title-generator">AI Blog Title Generator</a></li>
          <li><a className="underline" href="/blog-outline-generator">Blog Outline Generator</a></li>
          <li><a className="underline" href="/ai-product-description-generator">AI Product Description Generator</a></li>
          <li><a className="underline" href="/ai-email-subject-line-generator">AI Email Subject Line Generator</a></li>
        </ul>
        <p>
          Read more:{" "}
          <a className="underline" href="/blog/best-ai-tools-for-writing-blog-posts">
            Best AI Tools for Writing Blog Posts
          </a>.
        </p>
      </>
    ),
  },
];

const relatedTools = [
  { name: "AI Blog Title Generator", slug: "ai-blog-title-generator" },
  { name: "Blog Outline Generator", slug: "blog-outline-generator" },
  { name: "AI Product Description Generator", slug: "ai-product-description-generator" },
  { name: "AI Email Subject Line Generator", slug: "ai-email-subject-line-generator" },
];

const externalRefs = [
  {
    label: "Google Search Central: Helpful Content Guidance",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  },
  {
    label: "Rank Math: Score 100 in On-Page Tests",
    href: "https://rankmath.com/kb/score-100-in-tests/",
  },
];

export default function PromptGeneratorPage() {
  const schema = generateToolSchema(TOOL_NAME, SLUG, faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title={`Free ${TOOL_NAME}`}
        intro={`The free ${FOCUS_KEYWORD} by Realaiva turns simple ideas into structured ${OUTPUT_TYPE} for ChatGPT, Claude, Gemini, Midjourney, and any modern LLM.`}
        contentSections={contentSections}
        faqs={faqs}
        relatedTools={relatedTools}
        hero={HERO}
        externalRefs={externalRefs}
      >
        <PromptGeneratorClient />
      </ToolLayout>
    </>
  );
}
