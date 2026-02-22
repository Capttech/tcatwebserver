import Link from "next/link";
import PageWrapper from "../components/PageWrapper";

export default function ComingSoon() {
  return (
    <PageWrapper>
      <div className="p-8 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-semibold">Coming Soon</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          This feature is not yet available. We're working to bring interactive reviews and quizzes to the platform. Check back
          soon or contact course staff for alternatives and study resources.
        </p>

        <div className="mt-6">
          <Link href="/" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
