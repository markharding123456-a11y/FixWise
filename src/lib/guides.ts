import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const guidesDir = path.join(process.cwd(), "content", "guides");

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Moderate" | "Call a Pro";
  timeEstimate: string;
  costEstimate: string;
  tools: string[];
  materials: string[];
  date: string;
  featured?: boolean;
  readingTime: string;
  content: string;
}

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

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllGuides(): GuideMeta[] {
  const slugs = getAllGuideSlugs();
  return slugs
    .map((slug) => getGuideMeta(slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGuidesByCategory(category: string): GuideMeta[] {
  return getAllGuides().filter(
    (g) => g.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedGuides(): GuideMeta[] {
  return getAllGuides().filter((g) => g.featured);
}

export function getCategories(): string[] {
  const guides = getAllGuides();
  return [...new Set(guides.map((g) => g.category))];
}

function getGuideMeta(slug: string): GuideMeta {
  const filePath = path.join(guidesDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    difficulty: data.difficulty,
    timeEstimate: data.timeEstimate,
    costEstimate: data.costEstimate,
    date: data.date,
    featured: data.featured || false,
    readingTime: stats.text,
  };
}

export async function getGuide(slug: string): Promise<Guide> {
  const filePath = path.join(guidesDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    difficulty: data.difficulty,
    timeEstimate: data.timeEstimate,
    costEstimate: data.costEstimate,
    tools: data.tools || [],
    materials: data.materials || [],
    date: data.date,
    featured: data.featured || false,
    readingTime: stats.text,
    content: contentHtml,
  };
}
