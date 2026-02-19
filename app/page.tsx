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
      id: "syllabus",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
          <path d="M7 7h10M7 11h10M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Syllabus",
      description: "Course syllabus, grading policy, and weekly schedule.",
      href: "#/syllabus",
      buttonLabel: "View",
    },
    {
      id: "assignments",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Assignments",
      description: "All current and past assignments with submission instructions.",
      href: "#/assignments",
      buttonLabel: "Open",
    },
    {
      id: "resources",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Resources",
      description: "Links to tools, references, and recommended readings.",
      href: "#/resources",
      buttonLabel: "Browse",
    },
    {
      id: "contact",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10a8 8 0 11-6.3-6.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 22l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Contact",
      description: "Instructor contact info, office hours, and help sessions.",
      href: "#/contact",
      buttonLabel: "Email",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-zinc-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-semibold">TCat — Computer Information Technology</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Tennessee College of Applied Technology</p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {options.map((opt) => (
            <article key={opt.id} className="flex flex-col p-6 bg-white dark:bg-[#0b0b0b] rounded-lg shadow h-full">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 text-indigo-600 flex-shrink-0">{opt.icon}</div>
                <h2 className="text-xl font-medium mt-0">{opt.title}</h2>
              </div>

              <p className="mt-4 text-zinc-700 dark:text-zinc-300 flex-1">{opt.description}</p>

              <div className="mt-6">
                <a
                  href={opt.href}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  {opt.buttonLabel}
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
