"use client";

import { useState } from "react";
import GuideCard from "@/components/GuideCard";
import { getAllGuides, getCategories } from "@/lib/guides-data";

const allGuides = getAllGuides();
const categories = getCategories();

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredGuides = selectedCategory
    ? allGuides.filter(
        (g) => g.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : allGuides;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-fw-gray-900 mb-3">DIY Guides</h1>
        <p className="text-fw-gray-600 text-lg">
          Practical, step-by-step walkthroughs for common home repairs and maintenance.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-fw-blue text-white"
              : "bg-fw-gray-100 text-fw-gray-600 hover:bg-fw-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-fw-blue text-white"
                : "bg-fw-gray-100 text-fw-gray-600 hover:bg-fw-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredGuides.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-fw-gray-500 text-lg">
            No guides found. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
