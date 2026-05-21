import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "sunday-reset-posts");

export interface SundayResetMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

export interface SundayResetPost extends SundayResetMeta {
  contentHtml: string;
}

export function getAllSundayResets(): SundayResetMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"));

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
      );
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        author: data.author as string,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getSundayResetBySlug(slug: string): Promise<SundayResetPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    author: data.author as string,
    contentHtml: processed.toString(),
  };
}

export function getAllSundayResetSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
