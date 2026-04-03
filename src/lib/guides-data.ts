// Pre-built guide metadata for client-side use (no fs dependency)
// This file is imported by client components for listing/filtering

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Moderate" | "Call a Pro";
  timeEstimate: string;
  costEstimate: string;
  date: string;
  featured?: boolean;
  readingTime: string;
}

export const guides: GuideMeta[] = [
  {
    slug: "dealing-with-a-flooded-basement",
    title: "Dealing With a Flooded Basement",
    description: "What to do in the first 24 hours when your basement floods. Safety first, then damage control. A practical guide from restoration professionals.",
    category: "Water & Mold",
    difficulty: "Call a Pro",
    timeEstimate: "Ongoing (days to weeks)",
    costEstimate: "$500-5,000+",
    date: "2026-04-01",
    featured: true,
    readingTime: "7 min read",
  },
  {
    slug: "fix-a-leaky-faucet",
    title: "How to Fix a Leaky Faucet",
    description: "Stop that annoying drip and save money on your water bill. A step-by-step guide to fixing the most common types of leaky faucets.",
    category: "General Repair",
    difficulty: "Easy",
    timeEstimate: "30-60 minutes",
    costEstimate: "$5-20",
    date: "2026-04-01",
    featured: true,
    readingTime: "3 min read",
  },
  {
    slug: "patch-drywall-holes",
    title: "How to Patch Drywall Holes",
    description: "From nail holes to fist-sized dents, learn how to patch drywall so the repair is invisible. No special skills required.",
    category: "General Repair",
    difficulty: "Easy",
    timeEstimate: "1-2 hours (plus drying time)",
    costEstimate: "$10-25",
    date: "2026-04-01",
    featured: true,
    readingTime: "5 min read",
  },
  {
    slug: "seasonal-home-maintenance-checklist",
    title: "Seasonal Home Maintenance Checklist",
    description: "A practical season-by-season checklist to keep your home in good shape and catch small problems before they become expensive ones.",
    category: "Maintenance",
    difficulty: "Easy",
    timeEstimate: "2-4 hours per season",
    costEstimate: "$0-100",
    date: "2026-03-30",
    featured: false,
    readingTime: "6 min read",
  },
  {
    slug: "planning-a-bathroom-renovation",
    title: "Planning a Bathroom Renovation",
    description: "How to plan a bathroom reno that stays on budget and actually gets finished. What to DIY, what to hire out, and how to avoid the most common mistakes.",
    category: "Remodeling",
    difficulty: "Moderate",
    timeEstimate: "Planning: 2-4 weeks",
    costEstimate: "$3,000-15,000+",
    date: "2026-03-28",
    featured: false,
    readingTime: "6 min read",
  },
];

export function getAllGuides(): GuideMeta[] {
  return [...guides].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedGuides(): GuideMeta[] {
  return guides.filter((g) => g.featured);
}

export function getCategories(): string[] {
  return [...new Set(guides.map((g) => g.category))];
}
