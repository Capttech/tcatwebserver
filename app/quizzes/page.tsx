import dynamic from "next/dynamic";

const QuizClient = dynamic(() => import("../components/QuizClient"), { ssr: false });

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-zinc-50">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold">Quizzes</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Practice quizzes to reinforce key topics. Progress is saved locally.</p>

        <div className="mt-6">
          <QuizClient />
        </div>
      </div>
    </div>
  );
}
