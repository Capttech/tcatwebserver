"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Option = {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
};

export default function RotatingQuickLink({ options, inline, full }: { options: Option[]; inline?: boolean; full?: boolean }) {
    const safeOptions = options || [];
    // Use a deterministic initial index for SSR to avoid hydration mismatch.
    // Randomization happens on the client after mount.
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!safeOptions.length) return;
        // randomize once on the client after hydration
        setIdx(Math.floor(Math.random() * safeOptions.length));
        const timer = setInterval(() => {
            setIdx((i) => (i + 1) % safeOptions.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [safeOptions.length]);

    const opt = safeOptions[idx] || null;

    if (!opt) return null;

    let rootClass = "rotating-animate";
    if (full) {
        rootClass = "rotating-animate p-6 w-full h-full flex items-center shadow-lg";
    } else if (inline) {
        // mobile inline variant: visible colored card with padding and shadow
        rootClass = "rotating-animate p-4 rounded-xl bg-gradient-to-br from-indigo-700 to-sky-500 text-white shadow-lg";
    } else {
        rootClass = "rotating-animate p-5 rounded-2xl bg-white/95 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-md transition-all";
    }

    const iconClass = inline || full
        ? `w-12 h-12 flex items-center justify-center text-white rounded-full bg-white/10 dark:bg-white/10`
        : `w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600`;

    const titleClass = inline || full ? `text-lg font-semibold text-white` : `text-lg font-semibold`;
    const descClass = inline || full ? `mt-1 text-sm text-indigo-100` : `mt-1 text-sm text-zinc-700 dark:text-zinc-300`;

    const buttonClass = inline || full ? "inline-flex items-center rounded-md bg-white/90 text-indigo-700 px-4 py-2" : "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white";

    const button = opt.href && opt.href.startsWith("/") ? (
        <Link href={opt.href} className={buttonClass}>
            {opt.buttonLabel}
        </Link>
    ) : (
        <a href={opt.href} className={buttonClass}>
            {opt.buttonLabel}
        </a>
    );

    return (
        <div key={opt.id} className={rootClass}>
            <div className="flex items-start gap-4 w-full">
                <div className={iconClass}>
                    {React.isValidElement(opt.icon)
                        ? React.cloneElement(opt.icon as React.ReactElement, { className: `h-6 w-6 ${inline || full ? 'text-white' : 'text-indigo-600'}` })
                        : opt.icon}
                </div>
                <div className="flex-1">
                    <div className={titleClass}>{opt.title}</div>
                    <div className={descClass}>{opt.description}</div>
                    <div className="mt-3">{button}</div>
                </div>
            </div>
        </div>
    );
}
