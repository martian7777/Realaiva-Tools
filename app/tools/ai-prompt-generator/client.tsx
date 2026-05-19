"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function PromptGeneratorClient() {
  const [task, setTask] = useState("");
  const [model, setModel] = useState("chatgpt");
  const [promptType, setPromptType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("article");
  const [role, setRole] = useState("expert writer");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!task) {
      setError("Please briefly describe the task you want the AI to perform");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert Prompt Engineer.
Task: Improve the user's basic task description into an incredibly detailed, high-quality prompt optimized for the specified AI model.

Initial Task Idea: ${task}
Target AI Model: ${model} (adapt syntax/style if it's an image model vs text model)
Prompt Type: ${promptType}
Desired Tone: ${tone}
Requested Output Format: ${outputFormat}
Assigned Persona/Role: ${role}

Requirements:
1. Provide a "Before & After" comparison showing the basic prompt versus your engineered prompt.
2. The "Improved Prompt" should use best practices: assigning a persona, giving clear context, specifying step-by-step instructions, defining boundaries (what NOT to do), and mandating the output format.
3. Add a "Why this works better" section explaining the improvement.
4. If it's an image model (like Midjourney), adapt the parameters accordingly (aspect ratio, lighting, camera etc).
5. Output using Markdown format.`;

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
          <label htmlFor="task" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">What do you want the AI to do? (Basic Idea) *</label>
          <textarea
            id="task"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Write an article about the benefits of green tea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="model" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Target AI Model</label>
            <select
              id="model"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="chatgpt">ChatGPT</option>
              <option value="claude">Claude</option>
              <option value="gemini">Google Gemini</option>
              <option value="midjourney">Midjourney (Image)</option>
            </select>
          </div>
          <div>
            <label htmlFor="promptType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Task Type</label>
            <select
              id="promptType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={promptType}
              onChange={(e) => setPromptType(e.target.value)}
            >
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
            <select
              id="tone"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="professional">Professional</option>
              <option value="persuasive">Persuasive</option>
              <option value="simple">Simple/ELI5</option>
              <option value="academic">Academic</option>
            </select>
          </div>
          <div>
            <label htmlFor="outputFormat" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Output Format</label>
            <select
              id="outputFormat"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
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
          <input
            id="role"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Expert SEO Strategist, Senior Python Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-[#5A5A40] flex justify-center items-center text-white py-4 rounded-xl font-bold hover:bg-[#4A4A34] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-50"
        >
          {loading ? (
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Engineering Prompt...</>
          ) : (
             "Generate Advanced Prompt"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Your Master Prompt</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !task}
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
               <span className="mb-2 text-4xl">📝</span>
               <p className="text-center">Your highly optimized 'master prompt'<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
