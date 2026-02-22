import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const glows = [
    { size: 320, left: "6%", top: "8%", opacity: 0.12, anim: "driftA", delay: "0s", dur: "140s" },
    { size: 220, left: "75%", top: "10%", opacity: 0.08, anim: "driftB", delay: "8s", dur: "160s" },
    { size: 280, left: "40%", top: "60%", opacity: 0.06, anim: "driftC", delay: "4s", dur: "180s" },
    { size: 160, left: "85%", top: "70%", opacity: 0.09, anim: "driftD", delay: "2s", dur: "120s" },
    { size: 200, left: "12%", top: "72%", opacity: 0.07, anim: "driftE", delay: "6s", dur: "150s" },
];

export default function PageWrapper({ children, className = "" }: Props) {
    return (
        <div
            className={`relative w-full min-h-screen overflow-hidden ${className}`}
            style={{
                backgroundImage:
                    "radial-gradient(circle at 10% 10%, rgba(8,0,84,0.45) 0%, transparent 30%), linear-gradient(135deg, #080054 0%, #000000 100%)",
            }}
        >
            {/* animated glow circles (background) - full-bleed */}
            {glows.map((g, i) => (
                <span
                    key={i}
                    className={`page-glow-span`}
                    style={{
                        width: `${g.size}px`,
                        height: `${g.size}px`,
                        left: g.left,
                        top: g.top,
                        opacity: g.opacity,
                        filter: "blur(40px)",
                        background: "radial-gradient(circle, rgba(88,116,255,0.9) 0%, rgba(88,116,255,0.25) 40%, transparent 100%)",
                        transform: "translate3d(0,0,0)",
                        animation: `${g.anim} ${g.dur} linear ${g.delay} infinite`,
                    }}
                />
            ))}

            {/* inner centered content */}
            <div className={`relative z-10 max-w-6xl mx-auto p-4 sm:p-8`}>
                {children}
            </div>
        </div>
    );
}
