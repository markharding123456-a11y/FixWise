import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "FixWise connects homeowners with practical DIY guides and experienced, semi-retired contractors who take pride in quality work.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-fw-gray-900 mb-6">About FixWise</h1>

      <div className="space-y-6 text-fw-gray-700 leading-relaxed text-lg">
        <p>
          FixWise was built on a simple idea: most home repairs aren&apos;t as
          complicated as people think, and the best contractors aren&apos;t always
          the ones with the biggest ads.
        </p>

        <p>
          We publish practical, step-by-step DIY guides that help homeowners tackle
          common household problems with confidence. Leaky faucet? Drywall crack?
          Moldy basement? We walk you through it — no jargon, no fluff, just what
          you need to know to fix it right.
        </p>

        <h2 className="text-2xl font-bold text-fw-gray-900 pt-4">
          When DIY Isn&apos;t Enough
        </h2>
        <p>
          Some jobs need a pro. And when they do, we connect you with experienced,
          semi-retired tradespeople — plumbers, electricians, carpenters, and
          general handymen with decades of skill and a work ethic you can trust.
        </p>
        <p>
          These aren&apos;t salespeople. They&apos;re craftsmen who&apos;ve been doing this
          work for 20, 30, 40 years. They&apos;re not trying to upsell you on a
          kitchen renovation when all you need is a new faucet. They show up, do
          quality work, charge a fair price, and move on.
        </p>

        <h2 className="text-2xl font-bold text-fw-gray-900 pt-4">
          Why Semi-Retired?
        </h2>
        <p>
          Because the best tradespeople don&apos;t stop being good at what they do
          just because they turned 60. Many of them want to stay active, pick up
          interesting work, and help people — just not 60 hours a week anymore.
        </p>
        <p>
          For homeowners, this means access to top-tier expertise at fair prices,
          from people who take genuine pride in doing things right.
        </p>

        <h2 className="text-2xl font-bold text-fw-gray-900 pt-4">
          Our Promise
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Honest, practical advice — we tell you when it&apos;s a DIY job and when it&apos;s not</li>
          <li>Quality contractors — every pro on FixWise is experienced and vetted</li>
          <li>No pressure — browse guides, get quotes, or just learn something new</li>
          <li>Free for homeowners — always</li>
        </ul>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link
          href="/guides"
          className="inline-flex items-center justify-center bg-fw-blue hover:bg-fw-blue-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse DIY Guides
        </Link>
        <Link
          href="/find-a-pro"
          className="inline-flex items-center justify-center bg-fw-green hover:bg-fw-green-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Find a Contractor
        </Link>
      </div>
    </div>
  );
}
