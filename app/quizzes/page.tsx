import dynamic from "next/dynamic";

const QuizClient = dynamic(() => import("../components/QuizClient"), { ssr: false });
import PageWrapper from "../components/PageWrapper";

export default function QuizzesPage() {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-semibold">Quizzes</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Practice quizzes to reinforce key topics. Progress is saved locally.</p>

      <div className="mt-6">
        <QuizClient />
      </div>
    </PageWrapper>
  );
}
