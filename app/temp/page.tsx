"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import Modal from "../components/Modal";

type GridBlockData = {
    vlan: string;
    switchName: string;
    portNumber: string;
};

const GRID_ROWS = 5;
const GRID_COLS = 8;
const GRID_TOTAL = GRID_ROWS * GRID_COLS + 1;

const emptyBlock = (): GridBlockData => ({
    vlan: "",
    switchName: "",
    portNumber: "",
});

const normalizeBlocks = (input: unknown): GridBlockData[] => {
    if (!Array.isArray(input)) {
        return Array.from({ length: GRID_TOTAL }, emptyBlock);
    }

    return Array.from({ length: GRID_TOTAL }, (_, idx) => {
        const item = input[idx];
        if (!item || typeof item !== "object") return emptyBlock();

        const block = item as Partial<GridBlockData>;
        return {
            vlan: typeof block.vlan === "string" ? block.vlan : "",
            switchName: typeof block.switchName === "string" ? block.switchName : "",
            portNumber: typeof block.portNumber === "string" ? block.portNumber : "",
        };
    });
};

export default function TempPage() {
    const [blocks, setBlocks] = useState<GridBlockData[]>(() => Array.from({ length: GRID_TOTAL }, emptyBlock));
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [draft, setDraft] = useState<GridBlockData>(emptyBlock());
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let isCancelled = false;

        const loadBlocks = async () => {
            setIsLoading(true);
            setLoadError("");

            try {
                const res = await fetch("/api/temp-grid", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed request");

                const data = await res.json();
                if (!data?.ok || !Array.isArray(data.blocks)) throw new Error("Invalid response");

                if (!isCancelled) {
                    setBlocks(normalizeBlocks(data.blocks));
                }
            } catch {
                if (!isCancelled) {
                    setLoadError("Unable to load saved grid data.");
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        void loadBlocks();

        return () => {
            isCancelled = true;
        };
    }, []);

    const filledCount = useMemo(() => blocks.filter((block) => block.vlan.trim().length > 0).length, [blocks]);
    const studentBlocks = useMemo(() => blocks.filter((block) => block.vlan.trim() === "20").length, [blocks]);
    const errorBlocks = useMemo(
        () =>
            blocks.filter((block) => {
                const vlanValue = block.vlan.trim();
                const switchValue = block.switchName.trim();
                const portValue = block.portNumber.trim();
                return vlanValue === "0" && switchValue === "0" && portValue === "0";
            }).length,
        [blocks],
    );
    const incorrectVlanBlocks = useMemo(
        () =>
            blocks.filter((block) => {
                const vlanValue = block.vlan.trim();
                const switchValue = block.switchName.trim();
                const portValue = block.portNumber.trim();

                if (!vlanValue || vlanValue === "20") return false;
                if (vlanValue === "0" && switchValue === "0" && portValue === "0") return false;

                return true;
            }).length,
        [blocks],
    );
    const duplicateIndexSet = useMemo(() => {
        const keyToIndices = new Map<string, number[]>();

        blocks.forEach((block, index) => {
            const vlanValue = block.vlan.trim();
            const switchValue = block.switchName.trim();
            const portValue = block.portNumber.trim();
            if (!switchValue || !portValue) return;
            if (vlanValue === "0" && switchValue === "0" && portValue === "0") return;

            const key = `${switchValue}__${portValue}`;
            const current = keyToIndices.get(key) || [];
            current.push(index);
            keyToIndices.set(key, current);
        });

        const duplicates = new Set<number>();
        keyToIndices.forEach((indices) => {
            if (indices.length > 1) {
                indices.forEach((index) => duplicates.add(index));
            }
        });

        return duplicates;
    }, [blocks]);
    const duplicateBlocks = duplicateIndexSet.size;

    const openEditor = (index: number) => {
        setActiveIndex(index);
        setDraft({ ...blocks[index] });
        setError("");
    };

    const closeEditor = () => {
        setActiveIndex(null);
        setDraft(emptyBlock());
        setError("");
    };

    const saveBlock = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activeIndex === null) return;

        if (!draft.vlan.trim()) {
            setError("VLAN is required.");
            return;
        }

        const nextBlocks = blocks.map((item, idx) =>
            idx === activeIndex
                ? {
                    vlan: draft.vlan.trim(),
                    switchName: draft.switchName.trim(),
                    portNumber: draft.portNumber.trim(),
                }
                : item,
        );

        setError("");
        setIsSaving(true);

        try {
            const res = await fetch("/api/temp-grid", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blocks: nextBlocks }),
            });

            if (!res.ok) throw new Error("Failed request");

            const data = await res.json();
            if (!data?.ok || !Array.isArray(data.blocks)) throw new Error("Invalid response");

            setBlocks(normalizeBlocks(data.blocks));
            closeEditor();
        } catch {
            setError("Unable to save block to server file.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#021028] dark:via-[#02122b] dark:to-black text-black dark:text-zinc-50">
            <PageWrapper>
                <SiteHeader />

                <section className="mt-8 space-y-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">Temp Network Grid</h1>
                        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Click any block to add VLAN, switch, and port number. VLAN is required.</p>
                    </div>

                    <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                            <div>
                                Saved Blocks: <span className="font-semibold text-indigo-600">{filledCount}</span> / {GRID_TOTAL}
                            </div>
                            <div>
                                Student Blocks: <span className="font-semibold text-indigo-600">{studentBlocks}</span>
                            </div>
                            <div>
                                Error: <span className="font-semibold text-red-600 dark:text-red-400">{errorBlocks}</span>
                            </div>
                            <div>
                                Incorrect VLAN: <span className="font-semibold text-yellow-700 dark:text-yellow-400">{incorrectVlanBlocks}</span>
                            </div>
                            <div>
                                Duplicate Blocks: <span className="font-semibold text-yellow-700 dark:text-yellow-400">{duplicateBlocks}</span>
                            </div>
                        </div>
                    </div>

                    {loadError ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                            {loadError}
                        </div>
                    ) : null}

                    <div className="overflow-x-auto pb-2">
                        <div className="grid min-w-[860px] grid-cols-8 gap-3">
                            {isLoading ? (
                                <div className="col-span-8 rounded-xl border border-zinc-200 bg-white/80 p-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                                    Loading saved grid data...
                                </div>
                            ) : blocks.map((block, index) => {
                                const vlanValue = block.vlan.trim();
                                const switchValue = block.switchName.trim();
                                const portValue = block.portNumber.trim();
                                const hasVlan = vlanValue.length > 0;
                                const isAllZero = vlanValue === "0" && switchValue === "0" && portValue === "0";
                                const isVlanNot20 = hasVlan && vlanValue !== "20";
                                const isDuplicate = duplicateIndexSet.has(index);

                                const blockClass = isDuplicate
                                    ? "animate-pulse border-yellow-300 bg-yellow-100 hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-900/50 dark:hover:bg-yellow-900/50"
                                    : isAllZero
                                        ? "border-red-300 bg-red-50 hover:bg-red-100 dark:border-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/40"
                                        : isVlanNot20
                                            ? "border-yellow-300 bg-yellow-50 hover:bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-950/40 dark:hover:bg-yellow-900/40"
                                            : hasVlan
                                                ? "border-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/40"
                                                : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800";

                                return (
                                    <button
                                        key={index}
                                        onClick={() => openEditor(index)}
                                        disabled={isSaving}
                                        className={`rounded-lg border px-3 py-4 text-left transition ${blockClass}`}
                                    >
                                        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{index === GRID_TOTAL - 1 ? "Server Block (41)" : `Block ${index + 1}`}</div>
                                        <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{hasVlan ? `VLAN ${block.vlan}` : "No VLAN"}</div>
                                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Switch: {block.switchName || "No Switch"}</div>
                                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Port: {block.portNumber || "No Port"}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <Modal
                    isOpen={activeIndex !== null}
                    onClose={closeEditor}
                    title={
                        activeIndex === null
                            ? "Edit Block"
                            : activeIndex === GRID_TOTAL - 1
                                ? "Edit Server Block (41)"
                                : `Edit Block ${activeIndex + 1}`
                    }
                    subtitle="VLAN is required"
                    actions={
                        <>
                            <button
                                type="button"
                                onClick={closeEditor}
                                disabled={isSaving}
                                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="temp-grid-form"
                                disabled={isSaving}
                                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </>
                    }
                >
                    <form id="temp-grid-form" onSubmit={saveBlock} className="space-y-4">
                        <div>
                            <label htmlFor="vlan" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                VLAN <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="vlan"
                                type="text"
                                value={draft.vlan}
                                onChange={(event) => setDraft((prev) => ({ ...prev, vlan: event.target.value }))}
                                placeholder="e.g. 20"
                                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="switchName" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Switch
                            </label>
                            <input
                                id="switchName"
                                type="text"
                                value={draft.switchName}
                                onChange={(event) => setDraft((prev) => ({ ...prev, switchName: event.target.value }))}
                                placeholder="e.g. SW-1"
                                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="portNumber" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Port Number
                            </label>
                            <input
                                id="portNumber"
                                type="text"
                                value={draft.portNumber}
                                onChange={(event) => setDraft((prev) => ({ ...prev, portNumber: event.target.value }))}
                                placeholder="e.g. 1"
                                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
                            />
                        </div>

                        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
                    </form>
                </Modal>
            </PageWrapper>
        </div>
    );
}
