"use client";

import { useEffect, useRef, useState } from "react";

export default function ClientLoader() {
  const [visible, setVisible] = useState(false);
  const counter = useRef(0);
  const origFetch = useRef<typeof fetch | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("fetch" in window)) return;

    origFetch.current = window.fetch;

    const increment = () => {
      counter.current += 1;
      if (counter.current > 0) setVisible(true);
    };

    const decrement = () => {
      counter.current = Math.max(0, counter.current - 1);
      if (counter.current === 0) {
        // small delay so very short requests don't flicker
        setTimeout(() => {
          if (counter.current === 0) setVisible(false);
        }, 220);
      }
    };

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      increment();
      try {
        const res = await (origFetch.current as typeof fetch).apply(window, args);
        return res;
      } catch (err) {
        throw err;
      } finally {
        decrement();
      }
    };

    return () => {
      if (origFetch.current) window.fetch = origFetch.current;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="page-loader show" role="status" aria-live="polite">
      <div className="loader-panel">
        <img src="/logo.svg" alt="TCAT logo" className="loader-logo" />
        <div className="text-lg font-medium">Loading</div>
        <div className="loader-dots" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
