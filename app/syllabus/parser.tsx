import React, { useMemo } from "react";
import syllabusText from "./syllabusData";

function extractMetadata(text: string) {
  const meta: Record<string, string | string[]> = {};
  const instr = text.match(/Instructor:\s*(.*)/i);
  if (instr) meta.instructor = instr[1].trim();

  const emails = Array.from(text.matchAll(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)).map(m => m[1]);
  if (emails.length) meta.emails = Array.from(new Set(emails));

  const classHoursMatch = text.match(/Class Hours\s*\n([\s\S]{0,200})/i);
  if (classHoursMatch) meta.classHours = classHoursMatch[1].trim();

  return meta;
}

function parseSections(text: string) {
  const lines = text.split(/\r?\n/);
  const headings: { index: number; title: string }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.endsWith(":") && line.length < 80) {
      headings.push({ index: i, title: line.replace(/:$/, "") });
    }
  }

  const sections: { title: string; content: string }[] = [];
  if (headings.length === 0) {
    sections.push({ title: "Syllabus", content: text.trim() });
    return sections;
  }

  // initial intro (before first heading)
  const first = headings[0];
  const intro = lines.slice(0, first.index).join("\n").trim();
  if (intro) sections.push({ title: "Overview", content: intro });

  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index;
    const end = i + 1 < headings.length ? headings[i + 1].index : lines.length;
    const content = lines.slice(start + 1, end).join("\n").trim();
    sections.push({ title: headings[i].title, content });
  }

  return sections;
}

export default function Syllabus() {
  const meta = useMemo(() => extractMetadata(syllabusText), []);
  const sections = useMemo(() => parseSections(syllabusText), []);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Class Syllabus</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Official course syllabus, objectives, schedule, and policies.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          {sections.map((s) => (
            <section key={s.title} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">{s.content}</div>
            </section>
          ))}
        </div>

        <aside className="p-4 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <h4 className="text-lg font-semibold mb-2">Course Info</h4>
          <dl className="text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
            {meta.instructor && (
              <div>
                <dt className="font-medium">Instructor</dt>
                <dd>{meta.instructor}</dd>
              </div>
            )}
            {meta.emails && (
              <div>
                <dt className="font-medium">Email</dt>
                <dd>{(meta.emails as string[]).join(", ")}</dd>
              </div>
            )}
            {meta.classHours && (
              <div>
                <dt className="font-medium">Class Hours</dt>
                <dd className="whitespace-pre-wrap">{meta.classHours}</dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </div>
  );
}
