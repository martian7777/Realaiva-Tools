

<div align="center">
  <h1>✨ Realaiva AI Tools Suite ✨</h1>
  <p><strong>A premium, search-optimized collection of 10 free AI-powered tools built with Next.js 15, React 19, and Tailwind CSS v4.</strong></p>
  
  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.x-black?logo=next.js&style=flat-square" alt="Next.js"/></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.x-blue?logo=react&style=flat-square" alt="React"/></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.x-38bdf8?logo=tailwind-css&style=flat-square" alt="Tailwind CSS"/></a>
    <a href="https://ai.google.dev"><img src="https://img.shields.io/badge/Google_Gemini-Powered-8E43E7?logo=google-gemini&style=flat-square" alt="Google Gemini"/></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=flat-square" alt="TypeScript"/></a>
  </p>
</div>

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Key Architecture & Features](#-key-architecture--features)
3. [The 10 AI Tools Matrix](#-the-10-ai-tools-matrix)
4. [Project Structure](#-project-structure)
5. [Local Development Setup](#-local-development-setup)
6. [SEO & Schema System](#-seo--schema-system)
7. [Shared Design Components](#-shared-design-components)
8. [Configuration & Environment](#-configuration--environment)
9. [Deployment](#-deployment)
10. [License](#-license)

---

## 🔍 Overview
The **Realaiva AI Tools Suite** is a unified Next.js application designed to house all of Realaiva's custom AI tools under a single roof (`tools.realaiva.com`). By combining these utility generators into a single app, it ensures cohesive aesthetics, high-speed execution, shared component architectures, and a single Google Gemini API integration.

Each tool is strategically structured around search-intent keywords, equipped with schema markups, SEO sections (FAQs, guidelines, related tools), and premium interactivity to provide a delightful user experience.

---

## ⚡ Key Architecture & Features

- **🚀 Modern React 19 & Next.js 15 (App Router)**: Utilizing Server Actions (`app/actions.ts`) for secure, API-key-shielded communications.
- **✨ Official Google GenAI SDK**: Powered by `@google/genai` targeting the high-performance, cost-effective `gemini-2.5-flash` model.
- **🎨 Tailwind CSS v4 Aesthetic**: A gorgeous, warm-minimalist color theme (`#F8F5F2` beige background, high-end `#2C2C24` typography) featuring clean borders, responsive grids, and elegant cards.
- **⚙️ Integrated URL Scraping**: Built-in scraper tool that fetches webpage HTML, strips scripts, style, and comments, returning pure text for on-page SEO analyses.
- **🌐 Advanced SEO & Schema**:
  - Automatically generates **canonical URLs** and metadata.
  - Implements **JSON-LD Schema** (`WebApplication`, `SoftwareApplication`, `FAQPage`, `BreadcrumbList`) for every page to maximize Google search rich results.
  - Custom `sitemap.ts` and `robots.ts` configured for smooth indexing.

---

## 🛠️ The 10 AI Tools Matrix

| Tool Name | Sub-folder Path | Focus Keyword | Primary User Intent | Unique Feature |
| :--- | :--- | :--- | :--- | :--- |
| **AI Blog Title Generator** | `/ai-blog-title-generator` | `AI Blog Title Generator` | Article title ideas quickly | Best Pick highlights + SEO Score indicator |
| **Meta Description Generator** | `/meta-description-generator` | `Meta Description Generator` | High-quality SEO description | Real-time interactive SERP Preview |
| **AI Email Subject Line Generator** | `/ai-email-subject-line-generator` | `AI Email Subject Line Generator` | Email open rates optimization | Spam word flags (Free, Urgent, etc.) |
| **YouTube Title Generator** | `/youtube-title-generator` | `YouTube Title Generator` | Click-worthy video titles | Thumbnail text overlay suggestions |
| **AI Tool Finder** | `/ai-tool-finder` | `AI Tool Finder` | AI tool discovery | Custom AI Stack Recommendation Quiz |
| **AI Prompt Generator** | `/ai-prompt-generator` | `AI Prompt Generator` | Prompt engineering | Before/After interactive prompts diff |
| **Keyword Density Checker** | `/keyword-density-checker` | `Keyword Density Checker` | Keyword usage optimization | Scraping web pages directly + density tables |
| **Blog Outline Generator** | `/blog-outline-generator` | `Blog Outline Generator` | Article layout & structure | Rank Math-ready structure & FAQ generation |
| **Pinterest Pin Title Generator** | `/pinterest-pin-title-generator` | `Pinterest Pin Title Generator` | Pinterest traffic growth | Bundle: Title + Description + Overlay + Tags |
| **AI Product Description Generator**| `/ai-product-description-generator` | `AI Product Description Generator`| E-commerce copywriting | Full Gumroad/Etsy/Shopify listings |

---

### 🌟 Detailed Tool Breakdowns

#### 1. AI Blog Title Generator
Creates highly optimized, SEO-focused blog titles tailored by target audience (bloggers, marketers, businesses) and tone.
- **Features**: Live SERP character length tracking, SEO score metrics, and a "Best Pick" selection reasoning box.
- **SEO Elements**: Includes dedicated sections on "How to write SEO-friendly titles" and 5 FAQs.

#### 2. Meta Description Generator
Generates compelling search snippets designed to improve click-through rate (CTR) and keyword visibility.
- **Features**: Interactive Google search preview (SERP box showcasing Title, URL, and dynamic description) with character warnings at `150–160` characters.

#### 3. AI Email Subject Line Generator
Boosts open rates for promotional, cold email, or newsletter campaigns.
- **Features**: Built-in "Spam Risk Checker" alerting users if words like *guarantee*, *free*, or *urgent* are used, and A/B test variant generation.

#### 4. YouTube Title Generator
Optimizes titles for the YouTube search algorithm while boosting organic CTR.
- **Features**: Emotion angle adjuster (Curiosity, Urgency, Benefit), Clickbait safety index (Safe, Balanced, Aggressive), and accompanying thumbnail graphic overlay recommendations.

#### 5. AI Tool Finder
Matches users with the right AI productivity tools for their unique tasks and budget constraints.
- **Features**: "Find My AI Stack" quiz answering what platform categories, price ranges, and skill levels fit best.

#### 6. AI Prompt Generator
Helps users engineer expert-level prompts for Gemini, Claude, and ChatGPT.
- **Features**: Interactive comparison highlighting why the prompt was improved, role/persona injects, and output formats (Table, JSON, Bullet points).

#### 7. Keyword Density Checker
A technical text & URL parser to find top 1-word, 2-word, and 3-word keyword phrases.
- **Features**: Direct text paste or remote URL crawling. Highlights over-optimization warning metrics to prevent keyword stuffing penalties.

#### 8. Blog Outline Generator
Structures a complete article roadmap ready for content creation.
- **Features**: Outputs clear H2/H3 layouts, Rank Math outlines, image prompt suggestions, and context-aware FAQ questions.

#### 9. Pinterest Pin Title Generator
Drafts viral packages for pins to drive traffic to articles or product listings.
- **Features**: Generates title options, SEO description drafts, Canva text overlays, and suggested hashtags in a unified copyable bundle.

#### 10. AI Product Description Generator
Writes high-converting product descriptions for Shopify, Amazon, Etsy, and Gumroad.
- **Features**: Generates listings detailing short & long summaries, main features, benefits list, and tags based on premium tone adjustments.

---

## 📁 Project Structure

The project utilizes Next.js App Router for routes, alongside modular CSS and shared components:

```
Realaiva-Tools/
├── app/
│   ├── actions.ts                           # Server Actions (Gemini API & Web scrapers)
│   ├── globals.css                          # Tailwind CSS system tokens & resets
│   ├── layout.tsx                           # Main wrapper, fonts, and layout
│   ├── page.tsx                             # Home page hub showcasing all tools
│   ├── robots.ts                            # Search crawler directives
│   ├── sitemap.ts                           # Dynamic XML Sitemap generator
│   └── [tool-slug]/                         # Dedicated page routers for the 10 tools
├── components/
│   ├── CopyButton.tsx                       # Copy text click handler
│   ├── FAQSection.tsx                       # Beautiful accordion dropdowns for tool FAQs
│   ├── RelatedTools.tsx                     # Related tools navigation widget
│   ├── ToolCard.tsx                         # Category hub cards
│   └── ToolLayout.tsx                       # Master layout injecting breadcrumbs, FAQs & related links
├── hooks/
│   └── use-mobile.ts                        # Responsiveness hook
├── lib/
│   ├── download.ts                          # Exporting results helper
│   ├── seo.ts                               # Metadata and multi-schema JSON-LD generators
│   └── utils.ts                             # Styling helper classes wrapper
├── next.config.ts                           # Standard build configurations & redirects
├── tsconfig.json                            # TypeScript configuration compiler rules
└── package.json                             # Dependencies & Scripts
```

---

## 💻 Local Development Setup

Follow these steps to configure and run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org) (v18+ recommended)
- NPM or Yarn package manager

### 1. Clone & Install
```bash
# Clone the repository (or extract files)
cd Realaiva-Tools

# Install all package dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root folder of the project:
```bash
# Set your Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build & Run in Production
```bash
# Build the project
npm run build

# Start the built application
npm run start
```

---

## 📈 SEO & Schema System

We automatically inject schema tags to feed search engine crawlers structured metadata for high rankings. In `lib/seo.ts`, the functions parse:
- **`WebApplication`**: Explaining the tool name, url, category, and price ($0).
- **`SoftwareApplication`**: Allowing Google to show price and review badges.
- **`FAQPage`**: Injecting the 5-8 FAQs as rich questions and answers directly into search engine results pages (SERPs).
- **`BreadcrumbList`**: Establishing structured navigation linking the tool back to the Realaiva hub root.

```typescript
// Example JSON-LD injection in a tool page
import { generateToolSchema } from "@/lib/seo";

export default function ToolPage() {
  const schemas = generateToolSchema("AI Blog Title Generator", "ai-blog-title-generator", faqs);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ToolLayout {...props}>...</ToolLayout>
    </>
  );
}
```

---

## 🎨 Shared Design Components

A major strength of Realaiva Tools is visual consistency. Every page uses these core blocks:

1. **`ToolLayout.tsx`**: Standardizes spacing, typography (`Outfit` and `serif` headings), breadcrumbs navigation, body input cards, long informational guides, FAQ accordions, and related tools widgets.
2. **`CopyButton.tsx`**: Built-in stateful copy triggers offering visual feedback ("Copied!") on success.
3. **`RelatedTools.tsx`**: Dynamically renders links to adjacent tools, improving internal page juice (page rank distribution).
4. **`FAQSection.tsx`**: High-performance semantic toggle list for indexing.

---

## 📦 Deployment

### Standalone Output
The project is configured for standalone deployment using Next.js standalone features (activated in `next.config.ts` via `output: 'standalone'`). This builds a lightweight package including only the files necessary for production, ideal for Docker containers.

### Redirects
The project supports permanent redirects to preserve old SEO paths:
- `/tools` redirects permanently to `/`
- `/tools/:slug` redirects permanently to `/:slug`

---

## 📄 License
This project is proprietary and built exclusively for [Realaiva Tools](https://tools.realaiva.com). All rights reserved.
