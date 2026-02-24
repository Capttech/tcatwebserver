import { ReactNode } from "react";

type Props = {
    id?: string;
    title?: string;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
};

export default function WebCard({ title, icon, children, className = "" }: Props) {
    return (
        <section
            id={typeof (arguments[0] as any).id === 'string' ? (arguments[0] as any).id : undefined}
            className={`p-6 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/60 shadow-lg border border-zinc-200/40 dark:border-zinc-800/40 ${className}`}
        >
            <div className="flex items-start gap-4 w-full">
                {icon ? <div className="text-2xl leading-none">{icon}</div> : null}
                <div className="flex-1 min-w-0">
                    {title ? <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{title}</h3> : null}
                    <div className={`mt-3 ${title ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}`}>{children}</div>
                </div>
            </div>
        </section>
    );
}
