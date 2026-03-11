import SiteHeader from "../components/SiteHeader";
import PageWrapper from "../components/PageWrapper";
import WebCard from "../components/WebCard";

export const metadata = {
  title: "Required Materials",
};

export default function Page() {
  return (
    <PageWrapper>
      <SiteHeader
        title="Required Materials — Lab Kit & Essentials"
        subtitle="Bring these items to every lab session: USB storage (16–32GB), headphones, and a basic PC repair toolkit. See details below."
      />

      <main className="mt-6 space-y-6">
        <WebCard title="✅ USB Flash Drive (USB 2.1)">
          <ul className="mt-3 list-disc pl-5 space-y-1 text-zinc-300">
            <li><strong>Required:</strong> At least 16GB</li>
            <li><strong>Recommended:</strong> Go with 32GB if possible – you’ll thank yourself later.</li>
            <li><strong>Purpose:</strong> Storing bootable tools, backups, and recovery media for lab work.</li>
          </ul>
        </WebCard>

        <WebCard title="🎧 Headphones / Earbuds">
          <ul className="mt-3 list-disc pl-5 space-y-1 text-zinc-300">
            <li><strong>Required:</strong> One of the following: Bluetooth headphones/earbuds OR wired headphones/earbuds with a 3.5mm jack</li>
            <li><strong>Purpose:</strong> Listening to video modules, troubleshooting audio, and keeping class noise down.</li>
          </ul>
        </WebCard>

        <WebCard title="🧰 PC Repair Toolkit">
          <ul className="mt-3 list-disc pl-5 space-y-1 text-zinc-300">
            <li><strong>Required:</strong> A basic PC toolkit suitable for desktop/laptop repair, disassembly, and reassembly.</li>
            <li>
              <strong>Example kit on Amazon:</strong>{' '}
              <a
                href="https://www.amazon.com/Precision-Screwdriver-Magnetic-Professional-Electronics/dp/B074M8NBZQ/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.3gTlXdRMGvXIfaNfv4WbnGN2hBwA8cEwl42dOYbfFJZXIoiImpgPkkUoAKN-KsqfppKPJtCu60x12PaPputbWNxszrLI_C03urmcgYPJh1DKN0b3cXUaMWf-KxVr3h6ohi9gRnRl9RLf3uR2t3iDrR8a5KhPcjPvZP5WsYqUIxzLSDIOT2Dnbi1A-B5kravxfGkvY4D6KMsbVZq4XVJMVAaEji9PM_rJXaIArcM_EEA.IHXGuISagWD3a_J2t64D3vx1jTMaS5lddQNYMS9xgYM&dib_tag=se&keywords=pc%2Btool%2Bkit&qid=1756908577&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-300 hover:underline"
              >
                Precision Screwdriver &amp; Electronics Repair Toolkit (Example Link)
              </a>
            </li>
          </ul>
        </WebCard>
      </main>
    </PageWrapper>
  );
}
