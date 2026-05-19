"use client";

import { useState, useMemo } from "react";

function getWords(text: string) {
  return text.toLowerCase().match(/\b\w+\b/g) || [];
}

function getNGrams(words: string[], n: number) {
  const ngrams = [];
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
    .filter(([word]) => word.length > 2) // Ignore very short words like "a", "is"
    .slice(0, 10); // Top 10
}

export default function KeywordDensityClient() {
  const [text, setText] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");

  const stats = useMemo(() => {
    const charCount = text.length;
    const wordsList = getWords(text);
    const wordCount = wordsList.length;

    let focusDensity = 0;
    let focusCount = 0;
    let focusWarning = "";

    const focusLower = focusKeyword.trim().toLowerCase();
    
    if (focusLower && wordCount > 0) {
      if (text.toLowerCase().includes(focusLower)) {
        // Simple regex to count occurrences of the phrase
        const regex = new RegExp(`\\b${focusLower}\\b`, "gi");
        const matches = text.match(regex);
        focusCount = matches ? matches.length : 0;
        
        // Words in the focus keyword
        const focusWordLength = focusLower.split(" ").length;
        // Total words in the text that belong to the focus keyword instances
        // Density is often calculated as (focusCount * focusWordLength) / wordCount * 100
        // Or simply (focusCount / total words) * 100 depending on exactly how Rank Math does it, let's stick to standard count / total words
        focusDensity = (focusCount / wordCount) * 100;

        if (focusDensity === 0) {
          focusWarning = "Keyword missing in text.";
        } else if (focusDensity < 0.5) {
          focusWarning = "Low density. Try adding the keyword a few more times.";
        } else if (focusDensity > 2.5) {
          focusWarning = "High density! Risk of keyword stuffing.";
        } else {
          focusWarning = "Good keyword density.";
        }
      } else {
        focusWarning = "Keyword missing in text.";
      }
    }

    const oneWords = countFrequencies(wordsList);
    const twoWords = countFrequencies(getNGrams(wordsList, 2));
    const threeWords = countFrequencies(getNGrams(wordsList, 3));

    return {
      charCount,
      wordCount,
      focusCount,
      focusDensity: focusDensity.toFixed(2),
      focusWarning,
      focusStatus: focusDensity === 0 ? 'red' : (focusDensity > 2.5 || focusDensity < 0.5) ? 'yellow' : 'green',
      oneWords,
      twoWords,
      threeWords
    };
  }, [text, focusKeyword]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Area */}
      <div className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Paste your text content here *</label>
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
      </div>

      {/* Analysis Output */}
      <div className="bg-[#F1F0EA] border border-dashed border-[#D9D1C7] rounded-3xl p-6 shadow-sm flex flex-col space-y-6 max-h-[600px] overflow-y-auto">
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

        {focusKeyword && (
          <div className={`p-4 rounded-lg border ${stats.focusStatus === 'green' ? 'bg-green-50 border-green-200' : stats.focusStatus === 'red' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <h4 className="font-bold text-[#2C2C24] mb-2">Focus Keyword: "{focusKeyword}"</h4>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Density:</span>
                <span className="font-mono font-bold">{stats.focusDensity}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Occurrences:</span>
                <span className="font-mono">{stats.focusCount}</span>
              </div>
              <div className={`text-sm mt-2 font-medium ${stats.focusStatus === 'green' ? 'text-green-700' : stats.focusStatus === 'red' ? 'text-red-700' : 'text-yellow-700'}`}>
                {stats.focusWarning}
              </div>
            </div>
          </div>
        )}

        {/* Top Keywords tables */}
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
