"use client";
import { ReactNode, useEffect, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    onClose: () => void;
    children: ReactNode;
    actions?: ReactNode;
    closeOnBackdrop?: boolean;
};

const EXIT_MS = 220;

export default function Modal({
    isOpen,
    title,
    subtitle,
    onClose,
    children,
    actions,
    closeOnBackdrop = true,
}: ModalProps) {
    const [isMounted, setIsMounted] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            const frame = requestAnimationFrame(() => setIsVisible(true));
            return () => cancelAnimationFrame(frame);
        }

        setIsVisible(false);
        const timer = window.setTimeout(() => setIsMounted(false), EXIT_MS);
        return () => window.clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (!isMounted) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isMounted, onClose]);

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${isVisible ? "bg-zinc-950/45 opacity-100" : "bg-zinc-950/0 opacity-0"
                }`}
            onClick={() => {
                if (closeOnBackdrop) onClose();
            }}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                className={`w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900 ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.985] opacity-0"
                    }`}
            >
                <div className="flex items-start justify-between gap-3 border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800">
                    <div>
                        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                        {subtitle && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>}
                    </div>

                    <button
                        onClick={onClose}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        aria-label="Close modal"
                    >
                        <span>Esc</span>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <div className="px-5 py-4">{children}</div>

                <div className="flex items-center justify-end gap-2 border-t border-zinc-200/80 bg-zinc-50/70 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-950/40">
                    {actions}
                </div>
            </div>
        </div>
    );
}
