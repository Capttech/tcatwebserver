import { ReactNode } from "react";

type Props = {
    title?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
};

export default function WebCard({ title, icon, children, className = "" }: Props) {
    return (
        <section
            className={`p-6 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/60 shadow-lg border border-zinc-200/40 dark:border-zinc-800/40 ${className}`}
        >
            <div className="flex items-start gap-4">
                {icon ? <div className="text-2xl leading-none">{icon}</div> : null}
                <div>
                    {title ? <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{title}</h3> : null}
                    <div className={`mt-3 ${title ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}`}>{children}</div>
                </div>
            </div>
        </section>
    );
}
