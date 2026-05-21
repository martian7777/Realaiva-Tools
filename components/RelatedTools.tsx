import Link from "next/link";

interface RelatedTool {
  name: string;
  slug: string;
}

interface RelatedArticle {
  title: string;
  slug: string;
}

export default function RelatedTools({
  tools,
  articles,
}: {
  tools: RelatedTool[];
  articles?: RelatedArticle[];
}) {
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
        {articles?.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/blog/${a.slug}`}
              className="text-[#5A5A40] hover:underline font-medium"
            >
              📖 {a.title}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/blog" className="text-[#5A5A40] hover:underline font-medium">
            Realaiva Blog
          </Link>
        </li>
        <li>
          <Link href="/" className="text-[#5A5A40] hover:underline font-medium">
            All Free AI Tools
          </Link>
        </li>
        <li>
          <a
            href="https://realaiva.com"
            target="_blank"
            rel="noopener"
            className="text-[#5A5A40] hover:underline font-medium"
          >
            Realaiva Homepage ↗
          </a>
        </li>
      </ul>
    </div>
  );
}
