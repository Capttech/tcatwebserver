import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
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
      description: "Complete account setup, verify access to required tools, and follow the initial checklist to prepare for course activities.",
      href: "/onboarding",
      buttonLabel: "Begin Onboarding",
    },
    {
      id: "syllabus",
      icon: <FontAwesomeIcon icon={faBook} size="lg" className="text-indigo-600" />,
      title: "Class Syllabus",
      description: "Official course syllabus with objectives, weekly schedule, grading policy, required materials, and key dates. Review the syllabus online.",
      href: "#/syllabus",
      buttonLabel: "Review Syllabus",
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
      id: "study-guide",
      icon: <FontAwesomeIcon icon={faBookOpen} size="lg" className="text-indigo-600" />,
      title: "Study Guide (Core 1 & 2)",
      description: "Organized summaries, worked examples, and practice problems for Core 1 & 2, with downloadable materials and self-check exercises.",
      href: "#/study-guide",
      buttonLabel: "Open Study Guide",
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
      id: "quizzes",
      icon: <FontAwesomeIcon icon={faQuestion} size="lg" className="text-indigo-600" />,
      title: "Quizzes",
      description: "Auto-graded practice quizzes to assess your understanding. Track progress and revisit topics where you need improvement.",
      href: "/coming-soon",
      buttonLabel: "Start Quiz",
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
      href: "/tickets",
      buttonLabel: "Submit Ticket",
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
  ];

  const getButtonClass = (id: string) => {
    return "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors font-medium";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#021028] dark:via-[#02122b] dark:to-black text-black dark:text-zinc-50">
      <div className="max-w-6xl mx-auto p-8">
        <SiteHeader />

        <section className="mt-6 flex flex-col gap-6">
          {options.map((opt, idx) => (
            <article
              key={opt.id}
              className="p-6 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 text-indigo-600 flex-shrink-0">{opt.icon}</div>
                  <div>
                    <h2 className="text-2xl font-semibold">{opt.title}</h2>
                    <p className="mt-2 text-zinc-700 dark:text-zinc-300 max-w-[60ch]">{opt.description}</p>
                  </div>
                </div>

                <div className="ml-6 flex-shrink-0">
                  {opt.href && opt.href.startsWith("/") ? (
                    <Link href={opt.href} className={getButtonClass(opt.id)} aria-label={`Open ${opt.title}`}>
                      {opt.buttonLabel}
                    </Link>
                  ) : (
                    <a href={opt.href} className={getButtonClass(opt.id)} aria-label={`Open ${opt.title}`}>
                      {opt.buttonLabel}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
