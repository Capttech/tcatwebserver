"use client";

import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SiteHeader from "../../components/SiteHeader";
import WebCard from "../../components/WebCard";

type PortQuestion = {
    port: number;
    service: string;
    aliases: string[];
    protocol: "TCP" | "UDP" | "TCP/UDP";
};

const COMMON_PORTS: PortQuestion[] = [
    { port: 20, service: "FTP Data", aliases: ["ftp-data", "ftp data"], protocol: "TCP" },
    { port: 21, service: "FTP", aliases: ["ftp", "file transfer protocol"], protocol: "TCP" },
    { port: 22, service: "SSH", aliases: ["ssh", "secure shell"], protocol: "TCP" },
    { port: 23, service: "Telnet", aliases: ["telnet"], protocol: "TCP" },
    { port: 25, service: "SMTP", aliases: ["smtp", "simple mail transfer protocol"], protocol: "TCP" },
    { port: 53, service: "DNS", aliases: ["dns", "domain name system"], protocol: "TCP/UDP" },
    { port: 67, service: "DHCP Server", aliases: ["dhcp server", "dhcp", "bootps"], protocol: "UDP" },
    { port: 68, service: "DHCP Client", aliases: ["dhcp client", "bootpc"], protocol: "UDP" },
    // { port: 69, service: "TFTP", aliases: ["tftp", "trivial file transfer protocol"], protocol: "UDP" },
    { port: 80, service: "HTTP", aliases: ["http", "hypertext transfer protocol"], protocol: "TCP" },
    // { port: 88, service: "Kerberos", aliases: ["kerberos"], protocol: "TCP/UDP" },
    { port: 110, service: "POP3", aliases: ["pop3", "post office protocol 3"], protocol: "TCP" },
    // { port: 119, service: "NNTP", aliases: ["nntp", "network news transfer protocol"], protocol: "TCP" },
    { port: 123, service: "NTP", aliases: ["ntp", "network time protocol"], protocol: "UDP" },
    // { port: 135, service: "RPC Endpoint Mapper", aliases: ["rpc endpoint mapper", "rpc"], protocol: "TCP/UDP" },
    { port: 137, service: "NetBIOS Name Service", aliases: ["netbios name service", "netbios"], protocol: "UDP" },
    // { port: 138, service: "NetBIOS Datagram Service", aliases: ["netbios datagram service"], protocol: "UDP" },
    { port: 139, service: "NetBIOS Session Service", aliases: ["netbios session service"], protocol: "TCP" },
    { port: 143, service: "IMAP", aliases: ["imap", "internet message access protocol"], protocol: "TCP" },
    // { port: 161, service: "SNMP", aliases: ["snmp", "simple network management protocol"], protocol: "UDP" },
    // { port: 162, service: "SNMP Trap", aliases: ["snmp trap", "trap"], protocol: "UDP" },
    // { port: 179, service: "BGP", aliases: ["bgp", "border gateway protocol"], protocol: "TCP" },
    { port: 389, service: "LDAP", aliases: ["ldap", "lightweight directory access protocol"], protocol: "TCP/UDP" },
    { port: 443, service: "HTTPS", aliases: ["https", "http secure", "ssl", "tls"], protocol: "TCP" },
    { port: 445, service: "SMB", aliases: ["smb", "cifs", "server message block"], protocol: "TCP" },
    // { port: 465, service: "SMTPS", aliases: ["smtps", "secure smtp"], protocol: "TCP" },
    // { port: 500, service: "IKE", aliases: ["ike", "internet key exchange", "isakmp"], protocol: "UDP" },
    // { port: 514, service: "Syslog", aliases: ["syslog"], protocol: "UDP" },
    // { port: 515, service: "LPD/LPR", aliases: ["lpd", "lpr", "line printer daemon"], protocol: "TCP" },
    // { port: 520, service: "RIP", aliases: ["rip", "routing information protocol"], protocol: "UDP" },
    // { port: 546, service: "DHCPv6 Client", aliases: ["dhcpv6 client"], protocol: "UDP" },
    // { port: 547, service: "DHCPv6 Server", aliases: ["dhcpv6 server"], protocol: "UDP" },
    // { port: 587, service: "SMTP Submission", aliases: ["smtp submission", "submission", "smtp"], protocol: "TCP" },
    // { port: 636, service: "LDAPS", aliases: ["ldaps", "secure ldap"], protocol: "TCP" },
    // { port: 989, service: "FTPS Data", aliases: ["ftps data"], protocol: "TCP" },
    // { port: 990, service: "FTPS", aliases: ["ftps"], protocol: "TCP" },
    // { port: 993, service: "IMAPS", aliases: ["imaps", "secure imap"], protocol: "TCP" },
    // { port: 995, service: "POP3S", aliases: ["pop3s", "secure pop3"], protocol: "TCP" },
    // { port: 1023, service: "NFS Lockd", aliases: ["nfs lockd", "lockd"], protocol: "TCP/UDP" },
    { port: 3389, service: "RDP", aliases: ["rdp", "remote desktop protocol"], protocol: "TCP/UDP" },
];


function normalize(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function shuffle<T>(items: T[]) {
    const clone = [...items];
    for (let index = clone.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
    }
    return clone;
}

type Result = {
    port: number;
    service: string;
    userAnswer: string;
    correct: boolean;
};

export default function PortsTestPage() {
    const [questions, setQuestions] = useState<PortQuestion[]>(COMMON_PORTS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [results, setResults] = useState<Result[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const isFinished = currentIndex >= totalQuestions;

    const score = useMemo(() => results.filter((result) => result.correct).length, [results]);
    const incorrectResults = useMemo(() => results.filter((result) => !result.correct), [results]);

    useEffect(() => {
        setQuestions(shuffle(COMMON_PORTS));
    }, []);

    function handleSubmit() {
        if (!currentQuestion || submitted) {
            return;
        }

        const normalizedAnswer = normalize(answer);
        const acceptedAnswers = [currentQuestion.service, ...currentQuestion.aliases].map((value) => normalize(value));
        const correct = acceptedAnswers.includes(normalizedAnswer);

        setResults((previous) => [
            ...previous,
            {
                port: currentQuestion.port,
                service: currentQuestion.service,
                userAnswer: answer,
                correct,
            },
        ]);
        setSubmitted(true);
    }

    function handleNext() {
        setAnswer("");
        setSubmitted(false);
        setCurrentIndex((previous) => previous + 1);
    }

    function restartQuiz() {
        setQuestions(shuffle(COMMON_PORTS));
        setCurrentIndex(0);
        setAnswer("");
        setResults([]);
        setSubmitted(false);
    }

    return (
        <PageWrapper>
            <SiteHeader title="Port Testing" subtitle="Well-known ports (0-1023)" />

            <div className="mx-auto mt-8 w-full max-w-3xl">
                <WebCard title="Common Ports Assessment" className="w-full">
                    {!isFinished ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border border-zinc-200/80 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                                <span>
                                    Question {currentIndex + 1} of {totalQuestions}
                                </span>
                                <span>
                                    Score: {score} / {results.length}
                                </span>
                            </div>

                            <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/40">
                                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Port Number</p>
                                <p className="mt-2 text-5xl font-bold leading-none text-indigo-600">{currentQuestion?.port}</p>
                                <p className="mt-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">Protocol: {currentQuestion?.protocol}</p>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Service / Protocol Name</span>
                                <input
                                    value={answer}
                                    onChange={(event) => setAnswer(event.target.value)}
                                    placeholder="Example: HTTPS"
                                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                    disabled={submitted}
                                />
                            </label>

                            {submitted ? (
                                <div
                                    className={`rounded-lg border p-3.5 text-sm dark:bg-zinc-900/50 ${results[results.length - 1]?.correct
                                        ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60"
                                        : "border-rose-200 bg-rose-50/70 dark:border-rose-900/60"
                                        }`}
                                >
                                    {results[results.length - 1]?.correct ? (
                                        <p className="font-medium text-emerald-600">Correct.</p>
                                    ) : (
                                        <p className="font-medium text-rose-600">
                                            Incorrect. Correct answer: <span className="text-zinc-900 dark:text-zinc-100">{currentQuestion?.service}</span>
                                        </p>
                                    )}
                                </div>
                            ) : null}

                            <div className="flex flex-wrap gap-3">
                                {!submitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={answer.trim().length === 0}
                                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                                    >
                                        {currentIndex + 1 === totalQuestions ? "Finish" : "Next"}
                                    </button>
                                )}

                                <button
                                    onClick={restartQuiz}
                                    className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                                >
                                    Restart
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Final Score</p>
                                <p className="mt-2 text-4xl font-bold text-indigo-600">
                                    {score} / {totalQuestions}
                                </p>
                            </div>

                            {incorrectResults.length > 0 ? (
                                <div>
                                    <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Review Missed Ports</h4>
                                    <ul className="mt-3 space-y-2 text-sm">
                                        {incorrectResults.map((result) => (
                                            <li key={result.port} className="rounded-lg border border-zinc-200/80 bg-white px-3.5 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
                                                Port {result.port}: correct answer is {result.service}
                                                {result.userAnswer.trim().length > 0 ? ` (you entered: ${result.userAnswer})` : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-sm font-medium text-emerald-600">Perfect score. Great work.</p>
                            )}

                            <button
                                onClick={restartQuiz}
                                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                            >
                                Take Test Again
                            </button>
                        </div>
                    )}
                </WebCard>
            </div>
        </PageWrapper>
    );
}
