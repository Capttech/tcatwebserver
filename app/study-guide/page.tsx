import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import WebCard from "../components/WebCard";

export const metadata = {
    title: "Study Guide",
};

const guides = [
    {
        id: "core1",
        title: "Core 1 Study Guide",
        file: "/core1_study.pdf",
    },
    {
        id: "core2",
        title: "Core 2 Study Guide",
        file: "/core2_study.pdf",
    },
];

export default function StudyGuidePage() {
    return (
        <PageWrapper>
            <SiteHeader
                title="Study Guide — Core 1 & Core 2"
                subtitle="View the official study guide PDFs directly in the page or open them in a new tab."
            />

            <main className="mt-6 space-y-6">
                {guides.map((guide) => (
                    <WebCard key={guide.id} title={guide.title}>
                        <div className="flex items-center gap-3 text-sm">
                            <Link
                                href={guide.file}
                                target="_blank"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 transition-colors"
                            >
                                Open in New Tab
                            </Link>
                            <a
                                href={guide.file}
                                download
                                className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 px-3 py-2 text-zinc-800 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                            >
                                Download PDF
                            </a>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/70">
                            <iframe
                                src={guide.file}
                                title={guide.title}
                                className="h-[78vh] w-full"
                            />
                        </div>
                    </WebCard>
                ))}
            </main>
        </PageWrapper>
    );
}
