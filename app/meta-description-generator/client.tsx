"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, AlertTriangle, Check } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface MetaResult {
  suggestedTitle?: string;
  variations: { description: string; keywordPlacement?: string }[];
}

export default function MetaDescriptionGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [pageType, setPageType] = useState("blog");
  const [tone, setTone] = useState("persuasive");
  const [charLimit, setCharLimit] = useState("155");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a page topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Technical SEO Specialist.
Generate exactly 3 distinct meta description variations.

Topic: ${topic}
Focus Keyword: ${keyword || "(none provided)"}
Page Type: ${pageType}
Tone: ${tone}
Target Character Limit: approximately ${charLimit} chars, must stay between 150 and 160.

Requirements:
- Include the focus keyword naturally near the beginning when one is provided.
- Each variation must have a clear call-to-action.
- For each variation report whether the focus keyword appears at the "start", "middle", "end", or is "missing".
- Also propose a Suggested SEO Title to pair with the descriptions.

Respond with valid JSON only, no markdown, no commentary, matching:
{
  "suggestedTitle": "string",
  "variations": [
    { "description": "string", "keywordPlacement": "start|middle|end|missing" }
  ]
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const parsed = tryParseJSON<MetaResult>(res.text);
    if (!parsed || !Array.isArray(parsed.variations)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setLoading(false);
  };

  const firstSnippet = result?.variations[0]?.description || "Your generated meta description will appear in the SERP preview.";
  const previewTitle = result?.suggestedTitle || "Your SEO Title Goes Here - Realaiva";

  const allText = result
    ? [
        result.suggestedTitle ? `Suggested Title: ${result.suggestedTitle}` : "",
        ...result.variations.map((v, i) => `${i + 1}. ${v.description} (${v.description.length} chars)`),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Page/Article Topic *</label>
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="pageType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Page Type</label>
            <select id="pageType" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={pageType} onChange={(e) => setPageType(e.target.value)}>
              <option value="blog">Blog</option>
              <option value="product">Product</option>
              <option value="tool">Tool</option>
              <option value="service">Service</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select id="tone" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="persuasive">Persuasive</option>
              <option value="professional">Professional</option>
              <option value="informational">Informational</option>
            </select>
          </div>
          <div>
            <label htmlFor="charLimit" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Char Limit</label>
            <select id="charLimit" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={charLimit} onChange={(e) => setCharLimit(e.target.value)}>
              <option value="150">150</option>
              <option value="155">155</option>
              <option value="160">160</option>
            </select>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md text-sm">
          <strong>Note:</strong> Google may rewrite meta descriptions depending on the user&apos;s search query. A good meta description improves clarity and CTR but is not guaranteed to be displayed.
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
          ) : (
            "Generate Descriptions"
          )}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border border-[#D9D1C7] rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#2C2C24] mb-4 tracking-wide uppercase">Live SERP Preview</h3>
          <div className="font-sans max-w-[600px]">
            <div className="flex space-x-2 items-center mb-1 text-sm text-[#4d5156]">
              <span className="bg-gray-200 w-6 h-6 rounded-full inline-block"></span>
              <span>tools.realaiva.com › {topic.toLowerCase().replace(/\s+/g, '-') || 'your-page'}</span>
            </div>
            <div className="text-[20px] text-[#1a0dab] mb-1 leading-tight hover:underline cursor-pointer">
              {previewTitle}
            </div>
            <div className="text-[14px] text-[#4d5156] leading-snug">
              {firstSnippet}
            </div>
          </div>
        </div>

        <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7] flex-grow">
          <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
            <h3 className="font-bold text-[#2C2C24]">Generated Variations</h3>
            <div className="flex gap-2">
              <CopyButton text={allText} />
              <button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {!result && (
              <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-10">
                <span className="mb-2 text-3xl">🗂️</span>
                <p className="text-center">Descriptions will appear here</p>
              </div>
            )}
            {result?.suggestedTitle && (
              <div className="text-xs text-[#7A756C]">
                <strong>Suggested Title:</strong> {result.suggestedTitle}
              </div>
            )}
            {result?.variations.map((v, idx) => {
              const len = v.description.length;
              const inRange = len >= 150 && len <= 160;
              return (
                <div key={idx} className="bg-white border border-[#D9D1C7] rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8A857C]">Variation {idx + 1}</span>
                    <CopyButton text={v.description} />
                  </div>
                  <p className="text-[#2C2C24] text-sm">{v.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full border inline-flex items-center ${
                        inRange
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {inRange ? <Check className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                      {len} chars {inRange ? "(ideal)" : len < 150 ? "(too short)" : "(too long — risk of truncation)"}
                    </span>
                    {v.keywordPlacement && (
                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${
                          v.keywordPlacement === "missing"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-[#F8F5F2] text-[#5A5A40] border-[#D9D1C7]"
                        }`}
                      >
                        Keyword: {v.keywordPlacement}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
