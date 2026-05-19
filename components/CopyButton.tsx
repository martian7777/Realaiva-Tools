"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5A5A40]/20 border border-[#D9D1C7] disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-[#2C2C24] hover:bg-[#E2DCD3] ${className}`}
      type="button"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
