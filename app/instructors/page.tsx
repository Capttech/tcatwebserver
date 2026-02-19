import Image from "next/image";

export default function InstructorsPage() {
  const instructors = [
    {
      name: "Dr. Alex Carter",
      title: "Lead Instructor",
      email: "acarter@example.edu",
      hours: "Mon 2:00–4:00pm",
      bio: "Expert in networking and system administration. Loves hands-on labs and troubleshooting.",
    },
    {
      name: "Jamie Lee",
      title: "Teaching Assistant",
      email: "jlee@example.edu",
      hours: "Wed 10:00–12:00pm",
      bio: "Supports lab sessions and grading. Enjoys scripting and automation.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-zinc-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold">Instructors & TAs</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Contact details and office hours for course staff.</p>

        <div className="mt-6 grid gap-4">
          {instructors.map((ins) => (
            <div key={ins.email} className="p-4 rounded-md border bg-gradient-to-r from-white to-sky-50 dark:from-zinc-900 dark:to-zinc-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">{ins.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                <div>
                  <h2 className="text-lg font-medium">{ins.name}</h2>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{ins.title} • <span className="italic">{ins.hours}</span></div>
                </div>
              </div>

              <p className="mt-3 text-zinc-700 dark:text-zinc-300">{ins.bio}</p>

              <div className="mt-3 text-sm">
                <a href={`mailto:${ins.email}`} className="text-indigo-600 hover:underline">{ins.email}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
