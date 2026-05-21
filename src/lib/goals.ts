import fs from "fs";
import path from "path";
import matter from "gray-matter";

const goalsDirectory = path.join(process.cwd(), "goals");

export interface Goal {
  slug: string;
  title: string;
  start: string;
  target: string;
  current_i: string;
  current_f?: string;
  unit: string;
  direction: "lower" | "higher";
  progress_i: number;
  progress_f?: number;
  order: number;
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

  const pct =
    direction === "lower" ? (s - c) / (s - t) : (c - s) / (t - s);

  return Math.min(100, Math.max(0, Math.round(pct * 100)));
}

function completionGroup(goal: Goal): number {
  const i_done = goal.progress_i >= 100;
  const f_done = goal.progress_f !== undefined ? goal.progress_f >= 100 : false;
  const has_f = goal.progress_f !== undefined;

  if (has_f) {
    if (i_done && f_done) return 2;   // both done → bottom
    if (i_done || f_done) return 0;   // one done → top
    return 1;                          // neither done → middle
  } else {
    if (i_done) return 2;             // single-person done → bottom
    return 1;                          // active → middle
  }
}

export function getAllGoals(): Goal[] {
  if (!fs.existsSync(goalsDirectory)) return [];

  const goals = fs
    .readdirSync(goalsDirectory)
    .filter((f) => f.endsWith(".md") && f !== ".gitkeep")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(goalsDirectory, fileName), "utf8")
      );

      const direction: "lower" | "higher" = data.direction ?? "higher";
      const start = String(data.start);
      const target = String(data.target);
      const unit = data.unit as string;

      return {
        slug,
        title: data.title as string,
        start,
        target,
        current_i: String(data.current_i),
        current_f: data.current_f ? String(data.current_f) : undefined,
        unit,
        direction,
        order: typeof data.order === "number" ? data.order : 999,
        progress_i: calcProgress(start, target, String(data.current_i), direction, unit),
        progress_f: data.current_f
          ? calcProgress(start, target, String(data.current_f), direction, unit)
          : undefined,
      };
    });

  return goals.sort((a, b) => {
    const groupDiff = completionGroup(a) - completionGroup(b);
    if (groupDiff !== 0) return groupDiff;
    return a.order - b.order;
  });
}
