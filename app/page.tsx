export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            TCat — Computer Information Technology
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Welcome to the CIT course site for Tennessee College of Applied Technology.
          </p>
        </header>

        <section className="mt-8 bg-white dark:bg-[#0b0b0b] rounded-lg p-6 shadow">
          <p className="text-base text-zinc-700 dark:text-zinc-300">
            This server hosts course materials, examples, and demonstrations for the
            Computer Information Technology program. Instructor will add resources
            and links here soon.
          </p>
        </section>

        <footer className="mt-8 text-sm text-center text-zinc-500 dark:text-zinc-400">
          Favicon and official logo will be added when available.
        </footer>
      </main>
    </div>
  );
}
