import Image from "next/image";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import WebCard from "../components/WebCard";

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
          <WebCard
            key={ins.email}
            title={ins.name}
            icon={
              <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 sm:h-20 sm:w-20">
                <Image src={ins.img} alt={ins.name} width={80} height={80} className="object-cover w-full h-full" />
              </div>
            }
          >
            <div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{ins.title}</div>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300 text-sm max-w-prose">{ins.bio}</p>

              <div className="mt-3 text-sm">
                <a
                  href={`mailto:${ins.email}`}
                  className="inline-block max-w-full break-all text-indigo-600 hover:underline"
                >
                  {ins.email}
                </a>
              </div>
            </div>
          </WebCard>
        ))}
      </div>
    </PageWrapper>
  );
}
