import { getSundayResetBySlug, getAllSundayResetSlugs } from "@/lib/sunday-reset";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSundayResetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = await getSundayResetBySlug(slug);
    return { title: `${post.title} — JeanWatch`, description: post.excerpt };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function SundayResetPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getSundayResetBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-2">
        <Link
          href="/sunday-reset"
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
          Sunday Reset
        </Link>
      </div>

      <header className="mb-10 pt-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      <article
        className="prose dark:prose-invert prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
