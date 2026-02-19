import SiteHeader from "../components/SiteHeader";
import Syllabus from "./parser";

export const metadata = {
    title: "Syllabus",
};

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#021028] dark:via-[#02122b] dark:to-black text-black dark:text-zinc-50">
            <div className="max-w-6xl mx-auto p-8">
                <SiteHeader />
                <main className="mt-6">
                    <div className="p-6 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                        <Syllabus />
                    </div>
                </main>
            </div>
        </div>
    );
}
