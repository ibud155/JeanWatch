import Link from "next/link";
import { getAllSundayResets } from "@/lib/sunday-reset";

export const metadata = {
  title: "Sunday Reset — JeanWatch",
};

export default function SundayResetPage() {
  const posts = getAllSundayResets();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </Link>
      </div>

      <div className="mb-12 mt-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Sunday Reset
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Weekly reflections and resets.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-px">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/sunday-reset/${post.slug}`}
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
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
