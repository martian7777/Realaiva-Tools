import { slugifyHeading } from "@/lib/seo";

interface Section {
  title: string;
}

export default function TableOfContents({
  sections,
  includeFaq = true,
}: {
  sections: Section[];
  includeFaq?: boolean;
}) {
  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="bg-white rounded-3xl border border-[#D9D1C7] shadow-sm p-6 sm:p-8 mb-12"
    >
      <h2 className="text-lg font-bold text-[#2C2C24] mb-4">Table of Contents</h2>
      <ol className="space-y-2 list-decimal list-inside text-[#5A5A40]">
        {sections.map((s, i) => (
          <li key={i}>
            <a
              href={`#${slugifyHeading(s.title)}`}
              className="hover:underline hover:text-[#2C2C24]"
            >
              {s.title}
            </a>
          </li>
        ))}
        {includeFaq && (
          <li>
            <a href="#faqs" className="hover:underline hover:text-[#2C2C24]">
              Frequently Asked Questions
            </a>
          </li>
        )}
      </ol>
    </nav>
  );
}
