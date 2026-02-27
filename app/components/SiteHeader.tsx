import Image from "next/image";
import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function SiteHeader({
  title = "TCAT — Computer Information Technology",
  subtitle = "Tennessee College of Applied Technology",
  className = "",
}: Props) {
  return (
    <div className={"flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4" + className}>
      <div className="flex items-center gap-4">
        <Link href="/" aria-label="Go to homepage" className="rounded overflow-hidden">
          <Image src="/logo.svg" alt="TCAT logo" width={70} height={70} className="rounded" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
