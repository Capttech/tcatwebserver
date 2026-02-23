import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import PageWrapper from "./components/PageWrapper";
import { JSX } from "react";
import RotatingQuickLink from "./components/RotatingQuickLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faBook,
  faGamepad,
  faBookOpen,
  faUsers,
  faQuestion,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";

type Option = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export default function Home() {
  const options: Option[] = [
    {
      id: "onboarding",
      icon: <FontAwesomeIcon icon={faClipboardList} size="lg" className="text-indigo-600" />,
      title: "Onboarding",
      description: "Complete account setup, verify access to required tools, and follow the initial checklist to prepare for course activities.",
      href: "/onboarding",
      buttonLabel: "Begin Onboarding",
    },
    {
      id: "instructors",
      icon: <FontAwesomeIcon icon={faUsers} size="lg" className="text-indigo-600" />,
      title: "Instructors",
      description: "Find instructor and TA contact details, office hours, and short biographies to help you connect with course staff.",
      href: "/instructors",
      buttonLabel: "View Profiles",
    },
    {
      id: "syllabus",
      icon: <FontAwesomeIcon icon={faBook} size="lg" className="text-indigo-600" />,
      title: "Class Syllabus",
      description: "Official course syllabus with objectives, weekly schedule, grading policy, required materials, and key dates. Review the syllabus online.",
      href: "/syllabus",
      buttonLabel: "Review Syllabus",
    },
    {
      id: "required-materials",
      icon: <FontAwesomeIcon icon={faBook} size="lg" className="text-indigo-600" />,
      title: "Required materials",
      description:
        "List of required textbooks, tools, and consumables needed for class activities. Ensure you have these items before attending hands-on sessions.",
      href: "/required-materials",
      buttonLabel: "View Materials",
    },
    {
      id: "safety",
      icon: <FontAwesomeIcon icon={faClipboardList} size="lg" className="text-indigo-600" />,
      title: "Classroom Safety",
      description:
        "Review lab rules, required personal protective equipment (PPE), emergency procedures, and incident reporting protocols before participating in hands-on activities. Follow instructor guidance and posted safety procedures to maintain a safe learning environment.",
      href: "/safety",
      buttonLabel: "Review Safety",
    },
    {
      id: "study-guide",
      icon: <FontAwesomeIcon icon={faBookOpen} size="lg" className="text-indigo-600" />,
      title: "Study Guide (Core 1 & 2)",
      description: "Organized summaries, worked examples, and practice problems for Core 1 & 2, with downloadable materials and self-check exercises.",
      href: "/coming-soon",
      buttonLabel: "Coming Soon",
    },
    {
      id: "kahoot",
      icon: <FontAwesomeIcon icon={faGamepad} size="lg" className="text-indigo-600" />,
      title: "Kahoot Review Game",
      description: "Join an interactive review session to reinforce key concepts. Supports live play and practice modes for individual or group study.",
      href: "/coming-soon",
      buttonLabel: "Launch Review",
    },
    {
      id: "quizzes",
      icon: <FontAwesomeIcon icon={faQuestion} size="lg" className="text-indigo-600" />,
      title: "Quizzes",
      description: "Auto-graded practice quizzes to assess your understanding. Track progress and revisit topics where you need improvement.",
      href: "/coming-soon",
      buttonLabel: "Start Quiz",
    },
    {
      id: "tickets",
      icon: <FontAwesomeIcon icon={faTicket} size="lg" className="text-indigo-600" />,
      title: "Ticket Edicate",
      description: "Request equipment support or sign out for off-site tasks. Staff can log departures and confirm returns for accountability.",
      href: "/tickets",
      buttonLabel: "Manage Tickets",
    },
    {
      id: "ticket-submission",
      icon: <FontAwesomeIcon icon={faClipboardList} size="lg" className="text-indigo-600" />,
      title: "Ticket Submission",
      description: "Students: log what you did while working on a ticket and summarize how you resolved it. Include steps taken, troubleshooting details, and final outcome to help staff review and learn.",
      href: "/coming-soon",
      buttonLabel: "Coming Soon",
    },

  ];

  const getButtonClass = (id: string) => {
    return "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors font-medium w-full justify-center md:w-auto";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#021028] dark:via-[#02122b] dark:to-black text-black dark:text-zinc-50">
      <PageWrapper>
        <SiteHeader />

        {/* Mobile-only layout */}
        <div className="block lg:hidden">
          <section className="mt-8 px-4">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">CIT Course Portal</h1>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">Central portal for the CIT class: onboarding, syllabus, trials, lab ticketing, and instructor resources.</p>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/onboarding" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white text-center">
                  Get Started
                </Link>
                <Link href="/quizzes" className="inline-flex items-center rounded-md border border-zinc-200 bg-white/60 px-4 py-2 text-zinc-800 text-center dark:bg-zinc-900/60">
                  Explore Quizzes
                </Link>
              </div>

              <div className="mt-4 flex justify-between text-center text-sm text-zinc-700 dark:text-zinc-300">
                <div>
                  <div className="text-lg font-bold text-indigo-600">90m</div>
                  <div>Core Trial Tests</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-600">100+</div>
                  <div>Modules</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-600">Lab</div>
                  <div>Support</div>
                </div>
              </div>

              <div className="mt-4">
                <RotatingQuickLink options={options} inline />
              </div>

              <div className="mt-4 space-y-3">
                {options.slice(0, 10).map((opt) => (
                  <Link
                    key={opt.id}
                    href={opt.href}
                    className="block p-4 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-lg"
                  >
                    <div className="font-medium">{opt.title}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{opt.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Desktop-only layout (existing) */}
        <div className="hidden lg:block">
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">
                CIT Course Portal
              </h1>
              <p className="text-zinc-700 dark:text-zinc-300 text-lg">
                Central portal for the CIT class: access onboarding, syllabus, timed trials, lab ticketing, and instructor resources. Use this as your daily hub for class activities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/onboarding" className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 transition">
                  Get Started
                </Link>
                <Link href="/quizzes" className="inline-flex items-center rounded-md border border-zinc-200 bg-white/60 px-5 py-3 text-zinc-800 hover:bg-white transition dark:bg-zinc-900/60">
                  Explore Quizzes
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">90m</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Core Trial Tests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">100+</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">Lab</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-xl min-h-[160px] overflow-hidden">
                <RotatingQuickLink options={options} full />
              </div>
            </div>
          </section>
        </div>

        <div className="hidden lg:block">
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Quick Links</h2>

            <div className="mt-6 space-y-4">
              {(() => {
                const items = options.slice(0, 10);
                const rows: typeof items[] = [];
                let i = 0;
                while (i + 4 <= items.length) {
                  rows.push(items.slice(i, i + 4));
                  i += 4;
                }
                if (i < items.length) rows.push(items.slice(i));

                return rows.map((row, ridx) => {
                  const rowLen = row.length;
                  // determine responsive width classes based on number of items in row
                  const baseClass = (len: number) => {
                    switch (len) {
                      case 4:
                        return "w-full sm:w-1/2 lg:w-1/4";
                      case 3:
                        return "w-full sm:w-1/2 lg:w-1/3";
                      case 2:
                        return "w-full sm:w-1/2 lg:w-1/2";
                      case 1:
                      default:
                        return "w-full";
                    }
                  };

                  return (
                    <div
                      key={ridx}
                      className="w-full"
                      style={{ display: "grid", gridTemplateColumns: `repeat(${rowLen}, minmax(220px, 360px))`, gap: "1rem", justifyContent: "center" }}
                    >
                      {row.map((opt) => (
                        <Link
                          key={opt.id}
                          href={opt.href}
                          className={`w-full max-w-[360px] flex items-start gap-3 p-4 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition`}
                        >
                          <div className="w-10 h-10 flex items-center justify-center text-indigo-600">{opt.icon}</div>
                          <div>
                            <div className="font-medium">{opt.title}</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">{opt.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                });
              })()}
            </div>
          </section>
        </div>

        <footer className="mt-12 mb-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          CIT Course Portal • Contact instructors for assistance.
        </footer>
      </PageWrapper>
    </div>
  );
}
