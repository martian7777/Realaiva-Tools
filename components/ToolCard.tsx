import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface ToolCardProps {
  name: string;
  description: string;
  slug: string;
  icon: LucideIcon;
}

export default function ToolCard({ name, description, slug, icon: Icon }: ToolCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 border border-[#D9D1C7] flex flex-col h-full"
    >
      <div className="w-12 h-12 bg-[#F1F0EA] text-[#5A5A40] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-[#2C2C24] mb-2 group-hover:text-[#5A5A40] transition-colors">
        {name}
      </h2>
      <p className="text-[#7A756C] mb-6 flex-grow">{description}</p>
      <div className="flex items-center text-[#5A5A40] font-medium tracking-wide uppercase text-sm">
        Try Tool <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
