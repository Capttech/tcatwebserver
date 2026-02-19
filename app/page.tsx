import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
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
      description: "Step-by-step setup for the course: account and platform access, required software and tools, an initial checklist, how to join live sessions, and where to find key resources.",
      href: "/onboarding",
      buttonLabel: "Start",
    },
    {
      id: "syllabus",
      icon: <FontAwesomeIcon icon={faBook} size="lg" className="text-indigo-600" />,
      title: "Class Syllabus",
      description: "Detailed syllabus including learning objectives, weekly topics, grading breakdown, required textbooks and resources, important dates, and assessment methods.",
      href: "#/syllabus",
      buttonLabel: "View",
    },
    {
      id: "kahoot",
      icon: <FontAwesomeIcon icon={faGamepad} size="lg" className="text-indigo-600" />,
      title: "Kahoot Review Game",
      description: "Interactive, timed quiz sessions to reinforce classroom topics — supports live play and practice modes, joining instructions, and optional leaderboards for friendly competition.",
      href: "#/kahoot",
      buttonLabel: "Play",
    },
    {
      id: "study-guide",
      icon: <FontAwesomeIcon icon={faBookOpen} size="lg" className="text-indigo-600" />,
      title: "Study Guide (Core 1 & 2)",
      description: "Comprehensive review notes, key concept summaries, practice problems and exam tips for Core 1 and Core 2 — includes downloadable PDFs and self-check quizzes to track progress.",
      href: "#/study-guide",
      buttonLabel: "Open",
    },
    {
      id: "instructors",
      icon: <FontAwesomeIcon icon={faUsers} size="lg" className="text-indigo-600" />,
      title: "Instructors",
      description: "Contact information, office hours, and short bios for course instructors and TAs.",
      href: "/instructors",
      buttonLabel: "View",
    },
    {
      id: "quizzes",
      icon: <FontAwesomeIcon icon={faQuestion} size="lg" className="text-indigo-600" />,
      title: "Quizzes",
      description: "Practice and auto-graded quizzes to reinforce topics — progress stored locally with optional export.",
      href: "/quizzes",
      buttonLabel: "Take",
    },
    {
      id: "tickets",
      icon: <FontAwesomeIcon icon={faTicket} size="lg" className="text-indigo-600" />,
      title: "Tickets",
      description: "Students sign out to fix equipment around campus — staff can record departures and mark returns.",
      href: "/tickets",
      buttonLabel: "Open",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#021028] dark:via-[#02122b] dark:to-black text-black dark:text-zinc-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-4">
            <Image src="/logo.svg" alt="TCAT logo" width={48} height={48} className="rounded" />
            <div>
              <h1 className="text-3xl font-semibold">TCAT — Computer Information Technology</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Tennessee College of Applied Technology</p>
            </div>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {options.map((opt, idx) => (
            <article
              key={opt.id}
              className="option-card flex flex-col p-6 rounded-lg h-full"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 text-indigo-600 flex-shrink-0">{opt.icon}</div>
                <h2 className="text-xl font-medium mt-0">{opt.title}</h2>
              </div>

              <p className="mt-4 text-zinc-700 dark:text-zinc-300 flex-1">{opt.description}</p>

              <div className="mt-6">
                {opt.href && opt.href.startsWith("/") ? (
                  <Link
                    href={opt.href}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
                  >
                    {opt.buttonLabel}
                  </Link>
                ) : (
                  <a
                    href={opt.href}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
                  >
                    {opt.buttonLabel}
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <div className="p-6 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Classroom Safety</h2>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                  Your safety is our top priority. Please review lab rules, required personal protective equipment (PPE), emergency
                  procedures, and reporting protocols before participating in hands-on activities. Familiarize yourself with instructor
                  expectations and follow posted guidelines to help keep everyone safe.
                </p>
              </div>

              <div className="ml-6 flex-shrink-0">
                <Link href="/safety" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors">
                  Read Safety Info
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
