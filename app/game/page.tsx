"use client";

import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import WebCard from "../components/WebCard";

const currentQuestion = {
    number: 3,
    total: 10,
    prompt: "Which protocol is used to securely browse websites?",
    answers: [
        { id: "a", label: "FTP", color: "bg-red-500" },
        { id: "b", label: "HTTPS", color: "bg-blue-500" },
        { id: "c", label: "Telnet", color: "bg-yellow-500" },
        { id: "d", label: "SMTP", color: "bg-green-500" },
    ],
};

const gameInfo = {
    name: "Network Fundamentals Review",
    joinCode: "482-991",
};

const players = [
    { id: 1, name: "Avery", answered: true, points: 980 },
    { id: 2, name: "Jordan", answered: false, points: 450 },
    { id: 3, name: "Chris", answered: true, points: 1220 },
    { id: 4, name: "Taylor", answered: true, points: 1110 },
    { id: 5, name: "Morgan", answered: false, points: 600 },
    { id: 6, name: "Riley", answered: true, points: 870 },
];

export default function GamePage() {
    const [viewState, setViewState] = useState<"lobby" | "waiting" | "live">("lobby");
    const answeredCount = players.filter((player) => player.answered).length;
    const leaderboard = [...players].sort((a, b) => b.points - a.points);

    return (
        <PageWrapper>
            <SiteHeader />

            <div className="mx-auto mt-6 w-full max-w-6xl space-y-6">
                {viewState === "lobby" ? (
                    <WebCard title="Game Lobby" className="w-full">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Game Name</p>
                                    <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">{gameInfo.name}</p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Join Code</p>
                                    <p className="mt-1 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{gameInfo.joinCode}</p>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Your Name</span>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setViewState("waiting")}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                                >
                                    Join
                                </button>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Connected Players ({players.length})</p>
                                <div className="mt-3 space-y-2">
                                    {players.map((player) => (
                                        <div
                                            key={player.id}
                                            className="rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100"
                                        >
                                            {player.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </WebCard>
                ) : viewState === "waiting" ? (
                    <WebCard title="Waiting Room" className="w-full">
                        <div className="space-y-5 text-center">
                            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                You joined {gameInfo.name}
                            </p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Waiting for the game to start...
                            </p>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                Join Code: <span className="font-bold text-indigo-600 dark:text-indigo-400">{gameInfo.joinCode}</span>
                            </p>

                            <div className="mx-auto max-w-lg space-y-2 text-left">
                                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Connected Players ({players.length})</p>
                                {players.map((player) => (
                                    <div
                                        key={player.id}
                                        className="rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100"
                                    >
                                        {player.name}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => setViewState("lobby")}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                            >
                                Leave Game
                            </button>
                        </div>
                    </WebCard>
                ) : (
                    <>
                        <WebCard title="Live Game" className="w-full">
                            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                                <span>
                                    Question {currentQuestion.number} of {currentQuestion.total}
                                </span>
                                <span>
                                    Answers submitted: {answeredCount}/{players.length}
                                </span>
                            </div>

                            <div className="mt-4 rounded-xl bg-zinc-900 px-4 py-10 text-center text-lg font-semibold text-white dark:bg-zinc-800 sm:px-8 sm:text-2xl">
                                {currentQuestion.prompt}
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {currentQuestion.answers.map((answer) => (
                                    <button
                                        key={answer.id}
                                        type="button"
                                        className={`${answer.color} rounded-xl px-4 py-6 text-left text-lg font-bold text-white transition-opacity hover:opacity-90`}
                                    >
                                        {answer.label}
                                    </button>
                                ))}
                            </div>
                        </WebCard>

                        <WebCard title="Players" className="w-full">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {leaderboard.map((player) => (
                                    <div
                                        key={player.id}
                                        className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900/60"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-900 dark:text-zinc-100">{player.name}</span>
                                            <span className="text-xs text-zinc-600 dark:text-zinc-400">{player.points} pts</span>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${player.answered
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                                }`}
                                        >
                                            {player.answered ? "Answered" : "Waiting"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </WebCard>
                    </>
                )}
            </div>
        </PageWrapper>
    );
}