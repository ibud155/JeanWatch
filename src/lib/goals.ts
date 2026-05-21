import fs from "fs";
import path from "path";
import matter from "gray-matter";

const goalsDirectory = path.join(process.cwd(), "goals");

export interface Goal {
  slug: string;
  title: string;
  start: string;
  target: string;
  current: string;
  unit: string;
  direction: "lower" | "higher";
  progress: number;
}

function timeToSeconds(t: string): number {
  const [min, sec] = t.split(":").map(Number);
  return min * 60 + (sec ?? 0);
}

function calcProgress(
  start: string,
  target: string,
  current: string,
  direction: "lower" | "higher",
  unit: string
): number {
  let s: number, t: number, c: number;

  if (unit === "time") {
    s = timeToSeconds(start);
    t = timeToSeconds(target);
    c = timeToSeconds(current);
  } else {
    s = parseFloat(start);
    t = parseFloat(target);
    c = parseFloat(current);
  }

  if (direction === "lower") {
    // lower current = more progress
    const pct = (s - c) / (s - t);
    return Math.min(100, Math.max(0, Math.round(pct * 100)));
  } else {
    const pct = (c - s) / (t - s);
    return Math.min(100, Math.max(0, Math.round(pct * 100)));
  }
}

export function getAllGoals(): Goal[] {
  if (!fs.existsSync(goalsDirectory)) return [];

  return fs
    .readdirSync(goalsDirectory)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(goalsDirectory, fileName), "utf8")
      );

      const direction: "lower" | "higher" = data.direction ?? "higher";

      return {
        slug,
        title: data.title as string,
        start: data.start as string,
        target: data.target as string,
        current: data.current as string,
        unit: data.unit as string,
        direction,
        progress: calcProgress(
          String(data.start),
          String(data.target),
          String(data.current),
          direction,
          data.unit as string
        ),
      };
    });
}
