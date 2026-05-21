import { getAllGoals } from "@/lib/goals";
import Link from "next/link";

export const metadata = {
  title: "Goals — JeanWatch",
};

export default function GoalsPage() {
  const goals = getAllGoals();

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

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
        Goals
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
        Tracking what I&apos;m working towards.
      </p>

      {goals.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-600">No goals yet.</p>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const dual = goal.progress_f !== undefined;

            return (
              <div
                key={goal.slug}
                className="border border-gray-100 dark:border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {goal.title}
                  </h2>
                  {dual && (
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block w-4 h-2 rounded-sm bar-solid" />
                        I — {goal.progress_i}%
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block w-4 h-2 rounded-sm bar-striped" />
                        F — {goal.progress_f}%
                      </span>
                    </div>
                  )}
                  {!dual && (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {goal.progress_i}%
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
                  {/* I — solid, rendered first (underneath) */}
                  <div
                    className="absolute inset-y-0 left-0 h-full rounded-full bar-solid transition-all duration-500"
                    style={{ width: `${goal.progress_i}%` }}
                  />
                  {/* F — striped, rendered on top */}
                  {dual && (
                    <div
                      className="absolute inset-y-0 left-0 h-full rounded-full bar-striped transition-all duration-500"
                      style={{ width: `${goal.progress_f}%` }}
                    />
                  )}
                </div>

                {/* Start / Target */}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-400 dark:text-gray-600 text-xs mb-0.5">start</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">{goal.start}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 dark:text-gray-600 text-xs mb-0.5">target</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">{goal.target}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
