import Link from "next/link";

interface RelatedTool {
  name: string;
  slug: string;
}

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="bg-[#E2DCD3] rounded-3xl p-8 border border-[#D9D1C7]">
      <h2 className="text-xl font-bold text-[#2C2C24] mb-4">Explore More Resources</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
              className="text-[#5A5A40] hover:underline font-medium"
            >
              {t.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="https://realaiva.com/best-ai-seo-tools"
            className="text-[#5A5A40] hover:underline font-medium"
          >
            Best AI SEO Tools
          </Link>
        </li>
        <li>
          <Link
            href="https://realaiva.com/best-ai-tools-for-writing-blog-posts"
            className="text-[#5A5A40] hover:underline font-medium"
          >
            Best AI Tools for Writing Blog Posts
          </Link>
        </li>
        <li>
          <Link href="/" className="text-[#5A5A40] hover:underline font-medium">
            Main Tools Hub
          </Link>
        </li>
        <li>
          <Link
            href="https://realaiva.com"
            className="text-[#5A5A40] hover:underline font-medium"
          >
            Realaiva Homepage
          </Link>
        </li>
      </ul>
    </div>
  );
}
