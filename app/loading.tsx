import Link from "next/link";

export default function Loading() {
  return (
    <div className="page-loader">
      <div className="loader-panel">
        <img src="/logo.svg" alt="TCAT logo" className="loader-logo" />
        <div className="text-lg font-medium">Loading</div>
        <div className="loader-dots" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="sr-only">Page is loading</div>
      </div>
    </div>
  );
}
