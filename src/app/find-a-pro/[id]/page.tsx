import type { Metadata } from "next";
import Link from "next/link";
import { getContractorById, getAllContractors, seedDemoContractors } from "@/lib/db";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  seedDemoContractors();
  const contractors = getAllContractors();
  return contractors.map((c) => ({ id: String(c.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const contractor = getContractorById(Number(id));
  if (!contractor) return { title: "Contractor Not Found" };
  return {
    title: `${contractor.name} — ${contractor.trades}`,
    description: contractor.bio || `${contractor.name} - ${contractor.trades} in ${contractor.city}, ${contractor.province_state}`,
  };
}

export default async function ContractorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contractor = getContractorById(Number(id));
  if (!contractor) notFound();

  const trades = contractor.trades.split(",").map((t) => t.trim());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contractor.name,
    description: contractor.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: contractor.city,
      addressRegion: contractor.province_state,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-fw-gray-400 mb-6">
          <Link href="/" className="hover:text-fw-blue">Home</Link>
          <span>/</span>
          <Link href="/find-a-pro" className="hover:text-fw-blue">Find a Pro</Link>
          <span>/</span>
          <span className="text-fw-gray-600">{contractor.name}</span>
        </nav>

        {/* Profile header */}
        <div className="flex items-start gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-fw-blue-pale flex items-center justify-center shrink-0">
            <span className="text-fw-blue font-bold text-2xl">
              {contractor.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-fw-gray-900 mb-1">
              {contractor.name}
            </h1>
            <p className="text-fw-gray-500 text-lg">
              {contractor.city}, {contractor.province_state}
            </p>
            {contractor.years_experience && (
              <p className="text-fw-gray-500 text-sm mt-1">
                {contractor.years_experience}+ years experience
              </p>
            )}
          </div>
        </div>

        {/* Trades */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-fw-gray-500 uppercase tracking-wider mb-3">
            Trades &amp; Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {trades.map((trade) => (
              <span
                key={trade}
                className="px-4 py-2 rounded-full bg-fw-green-pale text-fw-green font-medium text-sm"
              >
                {trade}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        {contractor.bio && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-fw-gray-500 uppercase tracking-wider mb-3">
              About
            </h2>
            <p className="text-fw-gray-700 leading-relaxed text-lg">
              {contractor.bio}
            </p>
          </div>
        )}

        {/* Contact */}
        <div className="bg-fw-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-sm font-semibold text-fw-gray-500 uppercase tracking-wider mb-4">
            Contact
          </h2>
          <div className="space-y-3">
            {contractor.email && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-fw-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contractor.email}`} className="text-fw-blue hover:underline">
                  {contractor.email}
                </a>
              </div>
            )}
            {contractor.phone && (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-fw-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contractor.phone}`} className="text-fw-blue hover:underline">
                  {contractor.phone}
                </a>
              </div>
            )}
            <p className="text-sm text-fw-gray-500">
              Preferred contact: {contractor.contact_preference === "phone" ? "Phone" : "Email"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/get-help"
            className="inline-flex items-center justify-center bg-fw-orange hover:bg-fw-orange-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
