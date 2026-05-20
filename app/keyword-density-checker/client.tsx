"use client";

import { useState, useMemo } from "react";
import { fetchUrlText } from "@/app/actions";
import { downloadTextFile } from "@/lib/download";
import { Download, Globe, Loader2 } from "lucide-react";

function getWords(text: string) {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function getNGrams(words: string[], n: number) {
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(" "));
  }
  return ngrams;
}

function countFrequencies(items: string[]) {
  const counts: Record<string, number> = {};
  for (const item of items) {
    counts[item] = (counts[item] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .filter(([word]) => word.length > 2)
    .slice(0, 10);
}

export default function KeywordDensityClient() {
  const [text, setText] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [urlMode, setUrlMode] = useState(false);
  const [url, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const stats = useMemo(() => {
    const charCount = text.length;
    const wordsList = getWords(text);
    const wordCount = wordsList.length;

    let focusDensity = 0;
    let focusCount = 0;
    let focusWarning = "";
    let rankMathLabel: "too-low" | "good" | "too-high" | "missing" | "idle" = "idle";

    const focusLower = focusKeyword.trim().toLowerCase();

    if (focusLower && wordCount > 0) {
      const regex = new RegExp(`\\b${focusLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      const matches = text.match(regex);
      focusCount = matches ? matches.length : 0;
      focusDensity = (focusCount / wordCount) * 100;

      if (focusDensity === 0) {
        focusWarning = "Keyword missing in text — Rank Math would flag this.";
        rankMathLabel = "missing";
      } else if (focusDensity < 0.5) {
        focusWarning = "Too low — add the keyword a few more times naturally.";
        rankMathLabel = "too-low";
      } else if (focusDensity > 2.5) {
        focusWarning = "Too high — risk of keyword stuffing.";
        rankMathLabel = "too-high";
      } else {
        focusWarning = "Good keyword density.";
        rankMathLabel = "good";
      }
    }

    return {
      charCount,
      wordCount,
      focusCount,
      focusDensity: focusDensity.toFixed(2),
      focusWarning,
      rankMathLabel,
      oneWords: countFrequencies(wordsList),
      twoWords: countFrequencies(getNGrams(wordsList, 2)),
      threeWords: countFrequencies(getNGrams(wordsList, 3)),
    };
  }, [text, focusKeyword]);

  const handleFetchUrl = async () => {
    setFetchError(null);
    if (!url) {
      setFetchError("Please enter a URL.");
      return;
    }
    setFetching(true);
    const res = await fetchUrlText(url);
    setFetching(false);
    if (res.error || !res.text) {
      setFetchError(res.error || "Failed to fetch URL.");
      return;
    }
    setText(res.text);
  };

  const handleExport = () => {
    const lines: string[] = [];
    lines.push("Keyword Density Report");
    lines.push(`Focus keyword: ${focusKeyword || "(none)"}`);
    lines.push(`Word count: ${stats.wordCount}`);
    lines.push(`Character count: ${stats.charCount}`);
    if (focusKeyword) {
      lines.push(`Focus density: ${stats.focusDensity}%`);
      lines.push(`Focus occurrences: ${stats.focusCount}`);
      lines.push(`Rank Math signal: ${stats.rankMathLabel}`);
      lines.push(`Note: ${stats.focusWarning}`);
    }
    lines.push("");
    lines.push("Top 1-word phrases:");
    stats.oneWords.forEach(([w, n]) => lines.push(`  ${w} — ${n}`));
    lines.push("");
    lines.push("Top 2-word phrases:");
    stats.twoWords.forEach(([w, n]) => lines.push(`  ${w} — ${n}`));
    lines.push("");
    lines.push("Top 3-word phrases:");
    stats.threeWords.forEach(([w, n]) => lines.push(`  ${w} — ${n}`));
    downloadTextFile(`keyword-density-${Date.now()}.txt`, lines.join("\n"));
  };

  const labelTone: Record<typeof stats.rankMathLabel, string> = {
    "too-low": "bg-yellow-50 border-yellow-200 text-yellow-700",
    "good": "bg-green-50 border-green-200 text-green-700",
    "too-high": "bg-red-50 border-red-200 text-red-700",
    "missing": "bg-red-50 border-red-200 text-red-700",
    "idle": "",
  };
  const labelText: Record<typeof stats.rankMathLabel, string> = {
    "too-low": "Too low",
    "good": "Good",
    "too-high": "Too high",
    "missing": "Missing",
    "idle": "",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center text-xs text-[#5A5A40] gap-1">
            <input type="checkbox" checked={urlMode} onChange={(e) => setUrlMode(e.target.checked)} />
            Analyze a URL instead of pasted text
          </label>
        </div>

        {urlMode && (
          <div className="flex gap-2">
            <input
              type="url"
              className="flex-1 px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleFetchUrl}
              disabled={fetching}
              className="px-4 py-3 rounded-xl bg-[#5A5A40] text-white font-medium hover:bg-[#4A4A34] disabled:opacity-50 inline-flex items-center"
            >
              {fetching ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
              Fetch
            </button>
          </div>
        )}
        {fetchError && <p className="text-sm text-red-600">{fetchError}</p>}

        <div>
          <label htmlFor="text" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Text content *</label>
          <textarea
            id="text"
            rows={12}
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="Paste your article or webpage text here to analyze keyword density..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="focusKeyword" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Focus Keyword</label>
          <input
            id="focusKeyword"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. best ai tools"
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
          />
        </div>

        <button
          onClick={handleExport}
          disabled={stats.wordCount === 0}
          className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors h-10 px-4 py-2 bg-white border border-[#D9D1C7] text-[#2C2C24] hover:bg-[#E2DCD3] disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      <div className="bg-[#F1F0EA] border border-dashed border-[#D9D1C7] rounded-3xl p-6 shadow-sm flex flex-col space-y-6 max-h-[700px] overflow-y-auto">
        <h3 className="font-bold text-gray-900 border-b pb-2">Analysis Report</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#D9D1C7] flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-blue-600">{stats.wordCount}</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Words</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#D9D1C7] flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{stats.charCount}</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Characters</span>
          </div>
        </div>

        {focusKeyword && stats.rankMathLabel !== "idle" && (
          <div className={`p-4 rounded-lg border ${labelTone[stats.rankMathLabel]}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-[#2C2C24]">Focus Keyword: &quot;{focusKeyword}&quot;</h4>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white border border-current">
                Rank Math: {labelText[stats.rankMathLabel]}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Density:</span>
                <span className="font-mono font-bold">{stats.focusDensity}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Occurrences:</span>
                <span className="font-mono">{stats.focusCount}</span>
              </div>
              <div className="text-sm mt-2 font-medium">
                {stats.focusWarning}
              </div>
            </div>
          </div>
        )}

        {stats.wordCount > 0 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Top 1-Word Phrases</h4>
              <div className="divide-y divide-gray-100 border border-[#D9D1C7] rounded-xl bg-white">
                {stats.oneWords.map(([word, freq]) => (
                  <div key={word} className="flex justify-between items-center p-2 text-sm">
                    <span className="text-gray-800">{word}</span>
                    <span className="text-gray-500">{((freq / stats.wordCount) * 100).toFixed(1)}% ({freq})</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Top 2-Word Phrases</h4>
              <div className="divide-y divide-gray-100 border border-[#D9D1C7] rounded-xl bg-white">
                {stats.twoWords.map(([word, freq]) => (
                  <div key={word} className="flex justify-between items-center p-2 text-sm">
                    <span className="text-gray-800">{word}</span>
                    <span className="text-gray-500">{freq}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Top 3-Word Phrases</h4>
              <div className="divide-y divide-gray-100 border border-[#D9D1C7] rounded-xl bg-white">
                {stats.threeWords.map(([word, freq]) => (
                  <div key={word} className="flex justify-between items-center p-2 text-sm">
                    <span className="text-gray-800">{word}</span>
                    <span className="text-gray-500">{freq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
