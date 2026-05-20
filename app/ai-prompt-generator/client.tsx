"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw, Wand2, Star } from "lucide-react";
import { tryParseJSON } from "@/lib/download";

interface PromptResult {
  basicPrompt: string;
  improvedPrompt: string;
  whyBetter: string;
  rating: number;
}

export default function PromptGeneratorClient() {
  const [task, setTask] = useState("");
  const [model, setModel] = useState("chatgpt");
  const [promptType, setPromptType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("article");
  const [role, setRole] = useState("expert writer");

  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callForResult = async (overridePrompt?: string) => {
    if (!task) {
      setError("Please briefly describe the task you want the AI to perform");
      return;
    }
    setError(null);

    const sourcePrompt = overridePrompt ?? task;

    const prompt = `Act as an expert Prompt Engineer.

User's initial prompt: ${sourcePrompt}
Target AI Model: ${model}
Prompt Type: ${promptType}
Desired Tone: ${tone}
Requested Output Format: ${outputFormat}
Persona / Role to assign: ${role}

Produce an "improved prompt" using best practices: persona, context, step-by-step instructions, what NOT to do, output format constraints. Adapt for image models (Midjourney) where relevant (aspect ratio, lighting, camera).

Rate the improved prompt on a 1-10 scale based on clarity, specificity and instruction quality.

Respond with valid JSON only:
{
  "basicPrompt": "string",
  "improvedPrompt": "string",
  "whyBetter": "string",
  "rating": 9
}`;

    const res = await generateContent(prompt);
    if (res.error) {
      setError(res.error);
      return null;
    }
    const parsed = tryParseJSON<PromptResult>(res.text);
    if (!parsed || !parsed.improvedPrompt) {
      setError("The AI response could not be parsed. Please try again.");
      return null;
    }
    return parsed;
  };

  const handleGenerate = async () => {
    setLoading(true);
    const parsed = await callForResult();
    if (parsed) setResult(parsed);
    setLoading(false);
  };

  const handleImprove = async () => {
    if (!result) return;
    setImproving(true);
    const parsed = await callForResult(result.improvedPrompt);
    if (parsed) setResult(parsed);
    setImproving(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="task" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">What do you want the AI to do? (Basic Idea) *</label>
          <textarea id="task" rows={3} className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. Write an article about the benefits of green tea" value={task} onChange={(e) => setTask(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="model" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target AI Model</label>
            <select id="model" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="chatgpt">ChatGPT</option>
              <option value="claude">Claude</option>
              <option value="gemini">Google Gemini</option>
              <option value="midjourney">Midjourney (Image)</option>
            </select>
          </div>
          <div>
            <label htmlFor="promptType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Task Type</label>
            <select id="promptType" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={promptType} onChange={(e) => setPromptType(e.target.value)}>
              <option value="blog">Blog/Article</option>
              <option value="seo">SEO</option>
              <option value="code">Coding</option>
              <option value="email">Email</option>
              <option value="business">Business Strategy</option>
              <option value="image">Image Generation</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tone" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Tone</label>
            <select id="tone" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={tone} onChange={(e) => setTone(e.target.value)}>
              <option value="professional">Professional</option>
              <option value="persuasive">Persuasive</option>
              <option value="simple">Simple/ELI5</option>
              <option value="academic">Academic</option>
            </select>
          </div>
          <div>
            <label htmlFor="outputFormat" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Output Format</label>
            <select id="outputFormat" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
              <option value="article">Article/Essay</option>
              <option value="bullet points">Bullet Points</option>
              <option value="checklist">Checklist</option>
              <option value="table">Data Table</option>
              <option value="json">JSON code</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="role" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Persona / Role to assign</label>
          <input id="role" type="text" className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]" placeholder="e.g. Expert SEO Strategist" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading || improving}
            className="flex-1 bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
          >
            {loading ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Engineering...</>) : "Generate Advanced Prompt"}
          </button>
          <button
            onClick={handleImprove}
            disabled={!result || improving || loading}
            className="px-4 py-4 rounded-xl border border-[#5A5A40] text-[#5A5A40] font-medium hover:bg-[#F1F0EA] disabled:opacity-40 inline-flex items-center"
            title="Run another improvement pass on the current improved prompt"
          >
            {improving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            Improve
          </button>
        </div>
      </div>

      <div className="bg-[#F1F0EA] rounded-3xl max-h-[700px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
          <h3 className="font-bold text-[#2C2C24]">Your Master Prompt</h3>
          <div className="flex gap-2">
            <CopyButton text={result?.improvedPrompt || ""} />
            <button
              onClick={handleGenerate}
              disabled={loading || !task}
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
              <span className="mb-2 text-4xl">📝</span>
              <p className="text-center">Your highly optimized &quot;master prompt&quot;<br />will appear here</p>
            </div>
          )}
          {result && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">Quality rating</span>
                <span className="inline-flex items-center bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" /> {result.rating}/10
                </span>
              </div>
              <div className="bg-white border border-[#D9D1C7] rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-1">Before (basic prompt)</h4>
                <pre className="text-xs whitespace-pre-wrap text-[#3A3A32]">{result.basicPrompt}</pre>
              </div>
              <div className="bg-white border border-[#5A5A40] rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-1">After (improved prompt)</h4>
                <pre className="text-xs whitespace-pre-wrap text-[#2C2C24]">{result.improvedPrompt}</pre>
              </div>
              <div className="bg-[#F8F5F2] border border-[#D9D1C7] rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-1">Why this works better</h4>
                <p className="text-sm text-[#3A3A32]">{result.whyBetter}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
