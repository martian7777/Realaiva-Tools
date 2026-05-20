"use client";

import { useState } from "react";
import { generateContent } from "@/app/actions";
import { CopyButton } from "@/components/CopyButton";
import { Loader2, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

export default function ProductDescriptionClient() {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("digital");
  const [platform, setPlatform] = useState("gumroad");
  const [audience, setAudience] = useState("");
  const [benefits, setBenefits] = useState("");
  const [tone, setTone] = useState("persuasive");
  const [length, setLength] = useState("medium");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!productName || !benefits) {
      setError("Please provide a product name and its main benefits");
      return;
    }
    setError(null);
    setLoading(true);

    const prompt = `Act as an expert E-commerce Copywriter.
Task: Write a highly persuasive, conversion-optimized Full Product Listing.
Product Name: ${productName}
Product Type: ${productType}
Target Platform: ${platform}
Target Audience: ${audience}
Key Benefits/Features: ${benefits}
Tone of Voice: ${tone}
Description Length: ${length} (short = ~80 words, medium = ~200 words, long = ~400 words)

Requirements:
Because you are writing for the ${platform} platform, structure the listing accordingly to maximize sales. Include:
1. **SEO Optimized Title**
2. **Short Catchy Headline / Subtitle**
3. **Long Description:** Match the requested length. Tell a story, describe the pain point, and explain how this product solves it.
4. **Key Features & Benefits (Bullet Points):** Focus on the transformation the product provides.
5. **Who is this for?**
6. **3 FAQs**
7. **Search Tags / SEO Keywords**
Format beautifully using Markdown.`;

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
          <label htmlFor="productName" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Product Name *</label>
          <input
            id="productName"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. The Ultimate Notion SEO Planner"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="benefits" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Key Features & Benefits *</label>
          <textarea
            id="benefits"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Includes 50+ templates, automatically tracks SEO progress, saves hours of manual work."
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="audience" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Who is it for?</label>
          <input
            id="audience"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
            placeholder="e.g. Freelance writers, SEO agencies, bloggers"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="productType" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Product Type</label>
            <select
              id="productType"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="digital">Digital Product</option>
              <option value="template">Template</option>
              <option value="ebook">E-book</option>
              <option value="physical">Physical Product</option>
              <option value="software">Software/SaaS</option>
            </select>
          </div>
          <div>
            <label htmlFor="platform" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Selling Platform</label>
            <select
              id="platform"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="gumroad">Gumroad</option>
              <option value="etsy">Etsy</option>
              <option value="shopify">Shopify</option>
              <option value="amazon">Amazon</option>
              <option value="custom">My own website</option>
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
              <option value="persuasive">Persuasive / Sales</option>
              <option value="premium">Premium / Luxury</option>
              <option value="simple">Simple &amp; Direct</option>
              <option value="exciting">Exciting / Energetic</option>
            </select>
          </div>
          <div>
            <label htmlFor="length" className="block text-xs font-bold uppercase tracking-wider text-[#8A857C] mb-2">Description Length</label>
            <select
              id="length"
              className="w-full px-4 py-3 rounded-xl border border-[#D9D1C7] bg-[#FBFBFA] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 text-[#2C2C24]"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <option value="short">Short (~80 words)</option>
              <option value="medium">Medium (~200 words)</option>
              <option value="long">Long (~400 words)</option>
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
             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Writing Listing...</>
          ) : (
             "Generate Product Description"
          )}
        </button>
      </div>

      {/* Results Area */}
      <div className="bg-[#F1F0EA] rounded-3xl max-h-[600px] overflow-y-auto border border-dashed border-[#D9D1C7]">
        <div className="p-6 border-b border-[#D9D1C7] flex justify-between items-center sticky top-0 bg-[#F1F0EA]/90 backdrop-blur">
           <h3 className="font-bold text-[#2C2C24]">Full Product Listing</h3>
           <div className="flex gap-2">
             <CopyButton text={result || ""} />
             <button
               onClick={handleGenerate}
               disabled={loading || !productName}
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
               <span className="mb-2 text-4xl">🛍️</span>
               <p className="text-center">Your high-converting product description<br/>will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
