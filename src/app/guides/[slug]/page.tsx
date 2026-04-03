import type { Metadata } from "next";
import Link from "next/link";
import { getGuide, getAllGuideSlugs } from "@/lib/guides";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const guide = await getGuide(slug);
    return {
      title: guide.title,
      description: guide.description,
      openGraph: {
        title: `${guide.title} | FixWise`,
        description: guide.description,
        type: "article",
      },
    };
  } catch {
    return { title: "Guide Not Found" };
  }
}

const difficultyColors = {
  Easy: "bg-fw-green-pale text-fw-green border-fw-green",
  Moderate: "bg-fw-orange-pale text-fw-orange border-fw-orange",
  "Call a Pro": "bg-red-50 text-red-700 border-red-300",
};

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let guide;
  try {
    guide = await getGuide(slug);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    totalTime: guide.timeEstimate,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: guide.costEstimate,
    },
    tool: guide.tools.map((t) => ({ "@type": "HowToTool", name: t })),
    supply: guide.materials.map((m) => ({ "@type": "HowToSupply", name: m })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-fw-gray-400 mb-6">
          <Link href="/" className="hover:text-fw-blue">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-fw-blue">Guides</Link>
          <span>/</span>
          <Link
            href={`/guides?category=${encodeURIComponent(guide.category)}`}
            className="hover:text-fw-blue"
          >
            {guide.category}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColors[guide.difficulty]}`}>
              {guide.difficulty}
            </span>
            <span className="text-sm text-fw-gray-500">{guide.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-fw-gray-900 mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-fw-gray-600 leading-relaxed">
            {guide.description}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap gap-6 mt-6 py-4 border-y border-fw-gray-200 text-sm text-fw-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong className="text-fw-gray-700">Time:</strong> {guide.timeEstimate}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong className="text-fw-gray-700">Cost:</strong> {guide.costEstimate}</span>
            </div>
            <div>{guide.readingTime}</div>
          </div>
        </header>

        {/* Tools & Materials */}
        {(guide.tools.length > 0 || guide.materials.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {guide.tools.length > 0 && (
              <div className="bg-fw-blue-pale rounded-lg p-5">
                <h3 className="font-semibold text-fw-blue mb-2">Tools Needed</h3>
                <ul className="space-y-1.5 text-sm text-fw-gray-700">
                  {guide.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-fw-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {guide.materials.length > 0 && (
              <div className="bg-fw-green-pale rounded-lg p-5">
                <h3 className="font-semibold text-fw-green mb-2">Materials Needed</h3>
                <ul className="space-y-1.5 text-sm text-fw-gray-700">
                  {guide.materials.map((mat) => (
                    <li key={mat} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-fw-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Guide Content */}
        <div
          className="guide-content"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        {/* CTA */}
        <div className="mt-12 bg-fw-green-pale rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-fw-gray-900 mb-2">
            Need a hand with this one?
          </h3>
          <p className="text-fw-gray-600 mb-4">
            No shame in calling a pro. Our experienced contractors can handle this
            quickly and affordably.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-help"
              className="inline-flex items-center justify-center bg-fw-green hover:bg-fw-green-light text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Get Help
            </Link>
            <Link
              href="/find-a-pro"
              className="inline-flex items-center justify-center bg-white text-fw-green px-5 py-2.5 rounded-lg font-semibold transition-colors border border-fw-green"
            >
              Find a Pro
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
