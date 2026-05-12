import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          JeanWatch
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Writing about trying things.
        </p>
      </div>

      <div className="space-y-px">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-6 border-b border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-sm text-gray-400 dark:text-gray-500 pt-0.5"
                >
                  {formatDate(post.date)}
                </time>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
