"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function BlogOutlineClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [articleType, setArticleType] = useState("guide");
  const [audience, setAudience] = useState("beginner");
  const [wordCount, setWordCount] = useState("1500");
  const [intent, setIntent] = useState("informational");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter an article topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Content Strategist & Technical SEO.
Task: Generate a comprehensive, Rank Math-friendly blog outline.
Topic: ${topic}
Focus Keyword: ${keyword || "N/A"}
Article Type: ${articleType}
Target Audience: ${audience}
Target Word Count: ${wordCount} words
Search Intent: ${intent}

Requirements:
1. Provide a suggested "Intro Angle" to hook the reader based on the search intent.
2. Generate a hierarchical outline using H1, H2, and H3 tags. Structure it logically to reach the word count target.
3. Suggest a 5-question FAQ section at the end (with answers).
4. Suggest internal linking opportunities naturally within the outline (mention where they should link to).
5. Suggest "Image Prompt Suggestions" in [brackets] where visuals, graphs, or infographics would help the article.
6. Output using clean Markdown format. For example:
   ### H2: [Heading]
   * [Talking point]
   * [Image Suggestion: ...]
`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.text || null);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Article Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Best AI tools for students"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Focus Keyword</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. ai tools for students"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="articleType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Article Type</label>
            <select
              id="articleType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
            >
              <option value="guide">Ultimate Guide</option>
              <option value="listicle">Listicle</option>
              <option value="comparison">Comparison (+ vs +)</option>
              <option value="review">Product Review</option>
            </select>
          </div>
          <div>
            <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Audience</label>
            <select
              id="audience"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="advanced">Advanced</option>
              <option value="business">Business / B2B</option>
              <option value="students">Students</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="wordCount" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Word Count</label>
            <select
              id="wordCount"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
            >
              <option value="800">800 words (Short)</option>
              <option value="1500">1,500 words (Standard SEO)</option>
              <option value="2500">2,500+ words (Pillar Guide)</option>
            </select>
          </div>
          <div>
            <label htmlFor="intent" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Search Intent</label>
            <select
              id="intent"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
            >
              <option value="informational">Informational (Learn)</option>
              <option value="commercial">Commercial (Compare/Research)</option>
              <option value="transactional">Transactional (Buy)</option>
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
        >
          {loading ? (
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Structuring Outline...</>
          ) : (
             "Generate Blog Outline"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Your Article Outline</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !topic}
               className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
             >
               <RefreshCw className="w-4 h-4 mr-2" />
             </button>
           </div>
        </div>
        <div className="p-6">
          {result ? (
             <div className="prose prose-sm prose-blue max-w-none">
               <Markdown>{result}</Markdown>
             </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
               <span className="mb-2 text-4xl">📋</span>
               <p className="text-center">Your comprehensive SEO outline<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
