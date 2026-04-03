import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import { getAllGuides, getFeaturedGuides } from "@/lib/guides";

const categories = [
  {
    name: "General Repair",
    description: "Faucets, drywall, doors, windows",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    color: "bg-fw-blue-pale text-fw-blue",
  },
  {
    name: "Water & Mold",
    description: "Floods, leaks, mold, drying",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    color: "bg-blue-50 text-blue-700",
  },
  {
    name: "Maintenance",
    description: "Seasonal upkeep, filters, gutters",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    color: "bg-fw-green-pale text-fw-green",
  },
  {
    name: "Remodeling",
    description: "Bathrooms, kitchens, planning",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    color: "bg-fw-orange-pale text-fw-orange",
  },
];

export default function Home() {
  const featured = getFeaturedGuides();
  const allGuides = getAllGuides();
  const displayGuides = featured.length > 0 ? featured : allGuides.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-fw-blue to-fw-blue-light text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Fix it right.
              <br />
              <span className="text-fw-orange-light">Or find someone who can.</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Practical, step-by-step DIY guides for common home repairs. And when the
              job is bigger than you want to tackle, we connect you with experienced,
              trusted contractors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/guides"
                className="inline-flex items-center justify-center bg-fw-orange hover:bg-fw-orange-light text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Browse DIY Guides
              </Link>
              <Link
                href="/find-a-pro"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors border border-white/20"
              >
                Find a Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-fw-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-fw-gray-900 mb-8 text-center">
            What do you need help with?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/guides?category=${encodeURIComponent(cat.name)}`}
                className="bg-white rounded-xl p-5 text-center hover:shadow-md transition-shadow border border-fw-gray-200"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} mx-auto mb-3 flex items-center justify-center`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-fw-gray-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-fw-gray-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      {displayGuides.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-fw-gray-900">Latest Guides</h2>
              <Link
                href="/guides"
                className="text-fw-blue font-medium hover:text-fw-blue-light transition-colors text-sm"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA - Find a Pro */}
      <section className="py-16 bg-fw-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Too big for DIY?</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Our network of experienced, semi-retired tradespeople have decades of
            skill and fair prices. No upselling, no runaround — just quality work
            from people who take pride in their craft.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-help"
              className="inline-flex items-center justify-center bg-white text-fw-green px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              Describe Your Problem
            </Link>
            <Link
              href="/find-a-pro"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors border border-white/20"
            >
              Browse Contractors
            </Link>
          </div>
        </div>
      </section>

      {/* For Contractors CTA */}
      <section className="py-16 bg-fw-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-fw-gray-900 mb-3">
            Experienced Pro? Join FixWise.
          </h2>
          <p className="text-fw-gray-600 mb-6 max-w-xl mx-auto">
            Semi-retired or winding down but still want to pick up jobs? List your
            skills and get connected with homeowners who need exactly what you do best.
          </p>
          <Link
            href="/for-contractors"
            className="inline-flex items-center justify-center bg-fw-blue hover:bg-fw-blue-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
