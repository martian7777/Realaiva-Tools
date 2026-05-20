"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, Check, AlertTriangle, Package } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface PinPackage {
  pinTitle: string;
  pinDescription: string;
  canvaOverlay: string;
  hashtags: string[];
}

interface PinResult {
  packages: PinPackage[];
}

export default function PinterestGeneratorClient() {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [niche, setNiche] = useState("blogging");
  const [tone, setTone] = useState("catchy");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please input a topic for your Pin");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Pinterest Marketing Strategist.
Generate 5 complete Pinterest Pin packages.

Topic: ${topic}
Main Keyword: ${keyword || "(none provided)"}
Niche: ${niche}
Tone: ${tone}

Per package include:
- pinTitle (under 100 chars, first 40 chars must hook the reader)
- pinDescription (2-3 sentences, keywords woven naturally, ends with a CTA)
- canvaOverlay (2-5 words to place on the image)
- hashtags (array of 3-5 hyper-relevant tags including the # prefix)

Respond with valid JSON only:
{
  "packages": [
    {
      "pinTitle": "string",
      "pinDescription": "string",
      "canvaOverlay": "string",
      "hashtags": ["#tag1", "#tag2"]
    }
  ]
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const parsed = tryParseJSON<PinResult>(res.text);
    if (!parsed || !Array.isArray(parsed.packages)) {
      setError("The AI response could not be parsed. Please try Regenerate.");
      setLoading(false);
      return;
    }
    setResult(parsed);
    setLoading(false);
  };

  const allText = result
    ? result.packages
        .map(
          (p, i) =>
            `Pin ${i + 1}\nTitle: ${p.pinTitle}\nDescription: ${p.pinDescription}\nOverlay: ${p.canvaOverlay}\nHashtags: ${p.hashtags.join(" ")}\n`
        )
        .join("\n")
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Blog/Product Topic *</label>
          <input id="topic" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. 10 Ways to save money in college" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div>
          <label htmlFor="keyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Main Keyword</label>
          <input id="keyword" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. college money saving tips" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="niche" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Niche/Category</label>
            <select id="niche" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={niche} onChange={(e) => setNiche(e.target.value)}>
              <option value="blogging">Blogging / Online Biz</option>
              <option value="finance">Finance / Money</option>
              <option value="education">Education / AI</option>
              <option value="etsy">Etsy / Printables</option>
              <option value="lifestyle">Lifestyle / Home</option>
            </select>
          </div>
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select id="tone" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="catchy">Catchy / Viral</option>
              <option value="elegant">Elegant / Aesthetic</option>
              <option value="professional">Professional</option>
              <option value="informative">Informative</option>
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
        >
          {loading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Pins...</>) : "Generate Pinterest Packages"}
        </button>
      </div>

      <div className="bg-[#F1F0EA] rounded-3xl max-h-[700px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
          <h3 className="font-bold text-[#2C2C24] inline-flex items-center">
            <Package className="w-4 h-4 mr-1" /> Complete Pinterest Packages
          </h3>
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
            <div className="h-full flex flex-col items-center justify-center text-[#8A857C] py-20">
              <span className="mb-2 text-4xl">📌</span>
              <p className="text-center">Your complete Pinterest packages<br />(title + description + overlay + hashtags)<br />will appear here</p>
            </div>
          )}
          {result?.packages.map((p, idx) => {
            const titleLen = p.pinTitle.length;
            const ok = titleLen <= 100;
            return (
              <div key={idx} className="bg-white border border-[#D9D1C7] rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A857C]">Pin {idx + 1}</span>
                  <CopyButton text={`${p.pinTitle}\n${p.pinDescription}\n${p.hashtags.join(" ")}`} />
                </div>
                <div>
                  <p className="font-semibold text-[#2C2C24]">{p.pinTitle}</p>
                  <span
                    className={`mt-1 inline-flex items-center text-xs px-2 py-1 rounded-full border ${
                      ok
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {ok ? <Check className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                    {titleLen} / 100 chars
                  </span>
                </div>
                <p className="text-sm text-[#3A3A32]">{p.pinDescription}</p>
                <p className="text-xs text-[#5A5A40]">
                  <strong>Canva Overlay:</strong> {p.canvaOverlay}
                </p>
                {p.hashtags?.length > 0 && (
                  <p className="text-xs text-[#1a0dab]">{p.hashtags.join(" ")}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
