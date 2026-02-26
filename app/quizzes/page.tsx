import QuizClient from "../components/QuizClient";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import WebCard from "../components/WebCard";

export default function QuizzesPage() {
  return (
    <PageWrapper>
      <SiteHeader />

      <div className="mx-auto mt-6 w-full max-w-4xl">
        <WebCard title="Quizzes" className="w-full">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your quiz code and name to begin. Your quiz session and timer resume if you refresh.</p>

          <div className="mt-6">
            <QuizClient />
          </div>
        </WebCard>
      </div>
    </PageWrapper>
  );
}
