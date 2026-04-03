import Link from "next/link";
import type { Contractor } from "@/lib/db";

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
  const trades = contractor.trades.split(",").map((t) => t.trim());

  return (
    <Link href={`/find-a-pro/${contractor.id}`} className="group block">
      <div className="bg-white rounded-xl border border-fw-gray-200 p-6 hover:shadow-lg hover:border-fw-green-light transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-fw-blue-pale flex items-center justify-center shrink-0">
            <span className="text-fw-blue font-bold text-xl">
              {contractor.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-fw-gray-900 group-hover:text-fw-green transition-colors">
              {contractor.name}
            </h3>
            <p className="text-sm text-fw-gray-500">
              {contractor.city}, {contractor.province_state}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {trades.map((trade) => (
            <span
              key={trade}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-fw-green-pale text-fw-green"
            >
              {trade}
            </span>
          ))}
        </div>

        {contractor.years_experience && (
          <p className="text-sm text-fw-gray-500 mb-2">
            {contractor.years_experience}+ years experience
          </p>
        )}

        {contractor.bio && (
          <p className="text-sm text-fw-gray-600 leading-relaxed line-clamp-2 flex-grow">
            {contractor.bio}
          </p>
        )}
      </div>
    </Link>
  );
}
