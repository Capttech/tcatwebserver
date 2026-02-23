import Image from "next/image";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";

export default function InstructorsPage() {
  const instructors = [
    {
      name: "Sean Blackwell",
      title: "Instructor",
      email: "sean.blackwell@tcatmemphis.edu",
      bio: "Sean Blackwell has over a decade of experience teaching hands-on technical courses. He focuses on practical skills and real-world scenarios.",
      img: "/images/instructors/sean.svg",
    },
    {
      name: "Kameron Lovell",
      title: "Instructor",
      email: "kameron.lovell@tcatmemphis.edu",
      bio: "Kameron Lovell specializes in safety and applied techniques, bringing field experience into classroom training and demos.",
      img: "/images/instructors/kameron.svg",
    },
  ];

  return (
    <PageWrapper>
      <SiteHeader
        title='Instructors — TCAT Computer Information Technology'
        subtitle='Meet Sean Blackwell and Kameron Lovell — bios, roles, and contact details for course instructors.'
      />

      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        {instructors.map((ins) => (
          <div key={ins.email} className="p-4 rounded-md border bg-gradient-to-r from-white to-sky-50 dark:from-zinc-900 dark:to-zinc-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-32 h-32 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image src={ins.img} alt={ins.name} width={128} height={128} className="object-cover w-full h-full" />
              </div>

              <div>
                <h2 className="text-lg font-medium">{ins.name}</h2>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{ins.title}</div>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300 text-sm max-w-prose">{ins.bio}</p>

                <div className="mt-3 text-sm">
                  <a href={`mailto:${ins.email}`} className="text-indigo-600 hover:underline">{ins.email}</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
