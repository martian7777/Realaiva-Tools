"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, Download, Award } from "lucide-react";
import { downloadTextFile, tryParseJSON } from "@/lib/download";

interface TitleResult {
  bestPick?: { title: string; reason: string } | null;
  titles: string[];
}

function scoreTitle(title: string, keyword: string): { score: number; label: string; tone: string } {
  let score = 50;
  const len = title.length;
  if (len >= 50 && len <= 60) score += 25;
  else if (len >= 40 && len < 50) score += 15;
  else if (len > 60 && len <= 70) score += 10;
  else if (len < 40) score += 5;

  if (keyword) {
    const lower = title.toLowerCase();
    const k = keyword.toLowerCase();
    if (lower.startsWith(k)) score += 25;
    else if (lower.includes(k)) score += 15;
  } else {
    score += 10;
  }

  score = Math.min(100, score);
  let label = "Needs work";
  let tone = "bg-red-100 text-red-700 border-red-200";
  if (score >= 80) {
    label = "Great";
    tone = "bg-green-100 text-green-700 border-green-200";
  } else if (score >= 65) {
    label = "Good";
    tone = "bg-amber-100 text-amber-700 border-amber-200";
  }
  return { score, label, tone };
}

export default function BlogTitleGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("catchy");
  const [titleType, setTitleType] = useState("how-to");
  const [audience, setAudience] = useState("bloggers");
  const [count, setCount] = useState("10");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TitleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert SEO copywriter.
Generate ${count} blog post titles for the following inputs.

Topic: ${topic}
Target Keyword: ${keyword || "(none provided)"}
Tone: ${tone}
Title Type: ${titleType}
Target Audience: ${audience}

Requirements:
- Place the target keyword near the beginning when one is provided.
- Aim for 50-60 characters when possible.
- Titles must be clickable and match search intent.
- Identify a single "Best Pick" with a one-sentence reason.

Respond with valid JSON only (no markdown, no commentary), matching this exact shape:
{
  "bestPick": { "title": "string", "reason": "string" },
  "titles": ["string", "string", ...]
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    const parsed = tryParseJSON<TitleResult>(res.text);
    if (!parsed || !Array.isArray(parsed.titles)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setLoading(false);
  };

  const handleExport = () => {
    if (!result) return;
    const lines: string[] = [];
    if (result.bestPick) {
      lines.push(`Best Pick: ${result.bestPick.title}`);
      if (result.bestPick.reason) lines.push(`Why: ${result.bestPick.reason}`);
      lines.push("");
    }
    lines.push("All titles:");
    result.titles.forEach((t, i) => lines.push(`${i + 1}. ${t} (${t.length} chars)`));
    downloadTextFile(`blog-titles-${Date.now()}.txt`, lines.join("\n"));
  };

  const allTitlesText = result
    ? [
        ...(result.bestPick ? [`Best Pick: ${result.bestPick.title}`] : []),
        ...result.titles,
      ].join("\n")
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Topic *</label>
          <input
            id="topic"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. AI tools for students"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target Keyword (Optional)</label>
          <input
            id="keyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. best ai tools"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select id="tone" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="catchy">Catchy</option>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="listicle">Listicle</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div>
            <label htmlFor="titleType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Title Type</label>
            <select id="titleType" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={titleType} onChange={(e) => setTitleType(e.target.value)}>
              <option value="how-to">How-to</option>
              <option value="list post">List Post</option>
              <option value="comparison">Comparison</option>
              <option value="review">Review</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Audience</label>
            <select id="audience" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={audience} onChange={(e) => setAudience(e.target.value)}>
              <option value="bloggers">Bloggers</option>
              <option value="students">Students</option>
              <option value="marketers">Marketers</option>
              <option value="businesses">Businesses</option>
            </select>
          </div>
          <div>
            <label htmlFor="count" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Number of Titles</label>
            <select id="count" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={count} onChange={(e) => setCount(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
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
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
          ) : (
            "Generate Titles"
          )}
        </button>
      </div>

      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
          <h3 className="font-bold text-[#2C2C24]">Generated Results</h3>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={allTitlesText} />
            <button
              onClick={handleExport}
              disabled={!result}
              className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
              title="Download as .txt"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
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
            <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
              <span className="mb-2 text-4xl">✨</span>
              <p>Your AI-generated titles will appear here</p>
            </div>
          )}
          {result?.bestPick && (
            <div className="bg-white border border-[#D9D1C7] rounded-2xl p-4">
              <div className="flex items-center text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 mr-1" /> Best Pick
              </div>
              <p className="font-semibold text-[#2C2C24] mb-1">{result.bestPick.title}</p>
              <p className="text-xs text-[#7A756C] mb-2">{result.bestPick.reason}</p>
              <TitleMeta title={result.bestPick.title} keyword={keyword} />
            </div>
          )}
          {result?.titles?.map((title, idx) => (
            <div key={idx} className="bg-white border border-[#D9D1C7] rounded-2xl p-4">
              <p className="text-[#2C2C24] mb-2">{title}</p>
              <TitleMeta title={title} keyword={keyword} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TitleMeta({ title, keyword }: { title: string; keyword: string }) {
  const { score, label, tone } = scoreTitle(title, keyword);
  const charTone =
    title.length >= 50 && title.length <= 60
      ? "text-green-700"
      : title.length > 60
      ? "text-red-700"
      : "text-amber-700";
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className={`px-2 py-1 rounded-full border ${tone}`}>SEO {score} — {label}</span>
      <span className={`px-2 py-1 rounded-full border border-[#D9D1C7] bg-[#F8F5F2] ${charTone}`}>
        {title.length} chars
      </span>
    </div>
  );
}
