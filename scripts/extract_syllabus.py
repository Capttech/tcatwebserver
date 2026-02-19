#!/usr/bin/env python3
import os
from pypdf import PdfReader

pdf_path = "CIT_Syllabus_sfs.pdf"
out_ts = "app/syllabusData.ts"

if not os.path.exists(pdf_path):
    raise SystemExit(f"PDF not found: {pdf_path}")

reader = PdfReader(pdf_path)
text_parts = []
for page in reader.pages:
    text_parts.append(page.extract_text() or "")
text = "\n\n".join(text_parts)

# Escape backticks and ${ to safely place inside a template literal
text_escaped = text.replace('`', '\\`').replace('${', '\\${')

ts_content = f"export const syllabusText = `\n{text_escaped}\n`;\n\nexport default syllabusText;\n"

os.makedirs(os.path.dirname(out_ts), exist_ok=True)
with open(out_ts, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Wrote {out_ts}")
