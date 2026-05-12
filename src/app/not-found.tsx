import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-6">404</p>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        Page not found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The post you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to all posts
      </Link>
    </main>
  );
}
