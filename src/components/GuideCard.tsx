import Link from "next/link";
import type { GuideMeta } from "@/lib/guides-data";

const difficultyColors = {
  Easy: "bg-fw-green-pale text-fw-green",
  Moderate: "bg-fw-orange-pale text-fw-orange",
  "Call a Pro": "bg-red-50 text-red-700",
};

const categoryIcons: Record<string, string> = {
  "General Repair": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  "Water & Mold": "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
  Maintenance: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  Remodeling: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
};

export default function GuideCard({ guide }: { guide: GuideMeta }) {
  const iconPath = categoryIcons[guide.category] || categoryIcons["General Repair"];

  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-fw-gray-200 p-6 hover:shadow-lg hover:border-fw-blue-light transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-fw-blue-pale flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-fw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[guide.difficulty]}`}>
            {guide.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-fw-gray-900 group-hover:text-fw-blue transition-colors mb-2">
          {guide.title}
        </h3>

        <p className="text-fw-gray-500 text-sm leading-relaxed mb-4 flex-grow">
          {guide.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-fw-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.timeEstimate}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.costEstimate}
          </span>
          <span>{guide.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
