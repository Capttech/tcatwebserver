import SiteHeader from "../components/SiteHeader";
import PageWrapper from "../components/PageWrapper";
import Syllabus from "./parser";

export const metadata = {
    title: "Syllabus",
};

export default function Page() {
    return (
        <PageWrapper>
            <SiteHeader />
            <main className="mt-6">
                <div className="p-6 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                    <Syllabus />
                </div>
            </main>
        </PageWrapper>
    );
}
