import React from 'react'
import Callout from './components/Callout'
import SiteHeader from '../components/SiteHeader'
import PageWrapper from '../components/PageWrapper'
import WebCard from '../components/WebCard'

export default function Page() {
  return (
    <PageWrapper>
      <SiteHeader title="Class Safety" subtitle="Guidelines and procedures to keep our classes safe and welcoming for everyone." className="mb-6" />

      <article className="space-y-6 mt-4">
        <WebCard id="lab-safety" title="Lab Safety">
          <ul className="list-disc pl-5">
            <li>
              <strong className="text-white">Wear proper clothing and PPE (Personal Protective Equipment)</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>Closed-toe shoes</li>
              </ul>
            </li>
            <li className="mt-2">
              <strong className="text-white">Be aware of first-aid and emergency equipment</strong>
              <ul className="list-disc pl-5 mt-2">
                <li>Fire extinguishers</li>
                <li>ISH board</li>
                <li>First-Aid kits</li>
              </ul>
            </li>
          </ul>
        </WebCard>

        <WebCard id="ish-board" title="ISH Board">
          <p className="font-semibold">ISH Boards (Information Security Health)</p>
          <p>Each program is equipped with an ISH Board. This is where you can find first-aid equipment, fire evacuation plans, emergency contact numbers, and other information that is useful during an emergency.</p>
          <p className="mt-3">You are encouraged to make yourself familiar with the ISH Board in your area.</p>
        </WebCard>

        <WebCard id="natural-disasters" title="Natural Disasters / Inclement Weather">
          <p>The Southeastern U.S. is subject to various natural hazards. <strong className="text-amber-200">Know the procedures for your building and participate in required safety drills.</strong></p>
          <h3 className="text-lg font-semibold mt-3 underline">Tornado — Prepare</h3>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Watch vs. Warning:</strong> A <strong className="text-cyan-200">Tornado Watch</strong> means conditions are favorable; a <strong className="text-rose-200">Tornado Warning</strong> means a tornado has been spotted or shown on radar.</li>
            <li className="mt-1"><strong>Know your risk:</strong> the Southeast has elevated tornado risk, including nighttime tornadoes.</li>
            <li className="mt-1"><strong>Recognize signs:</strong> rotating funnel cloud, debris cloud, or a loud roaring sound like a freight train.</li>
            <li className="mt-1"><strong>Identify shelter:</strong> small, interior, windowless room on the lowest level — practice going there now.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 underline">Tornado — During</h3>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Go immediately</strong> to your pre-identified safe location.</li>
            <li className="mt-1">If time allows, use additional shielding (pillows, heavy blankets, furniture).</li>
            <li className="mt-1"><strong>Protect your head and neck</strong> with your arms.</li>
            <li className="mt-1"><strong>Do not</strong> try to outrun a tornado in a vehicle.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 underline">Tornado — After</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Monitor local news and weather for updates.</li>
            <li className="mt-1">If trapped, <strong>cover your mouth</strong> with cloth or a mask to avoid dust and <strong>signal</strong> rescuers with texts, banging, or a whistle.</li>
            <li className="mt-1">Keep clear of downed power lines and broken utility poles.</li>
            <li className="mt-1"><strong>Do not</strong> enter damaged buildings until authorities declare them safe.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 underline">Earthquake — During</h3>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Drop, Cover, and Hold On:</strong> drop to hands and knees, cover head and neck, and hold onto sturdy furniture until shaking stops.</li>
            <li className="mt-1">If indoors, stay inside until shaking stops — <strong>do NOT</strong> run outside.</li>
            <li className="mt-1">If in a vehicle, stop in a clear area away from buildings, trees, overpasses, or utility lines.</li>
            <li className="mt-1">If in a building, expect alarms and sprinklers; <strong>do not</strong> use elevators.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 underline">Icy Conditions</h3>
          <p className="mt-2">TCAT Memphis Administration monitors winter weather closely. In the event of snow or ice accumulation, Administration may close the school until travel conditions improve. Closures are announced on local news and via Slate alerts.</p>
          <p className="mt-2 font-extrabold text-amber-200">REGARDLESS OF OPEN / CLOSED STATUS — <strong>DO NOT DRIVE IF IT IS NOT SAFE.</strong></p>
        </WebCard>

        <WebCard id="students-disabilities" title="Students with Disabilities">
          <p>If you have a disability that prevents you from safely evacuating any area without assistance, you should notify your instructor on the first day you attend classes, or sooner.</p>
          <p className="mt-2">If you will require assistance during an emergency, personnel will be designated to find you and help you evacuate.</p>
          <p className="mt-2 font-semibold">Note: The person with the disability is the best authority on how to be moved.</p>
          <p className="mt-2">Provide your instructor with detailed instructions on what type of assistance you might need. This will be helpful in selecting a designee.</p>
        </WebCard>

        <WebCard id="violence-on-campus" title="Violence on Campus">
          <h3 className="font-semibold underline">Be Prepared</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Understand the possibility of an act of violence on campus</li>
            <li className="mt-1">Equip yourself with the knowledge needed to make good decisions</li>
            <li className="mt-1">Be proactive with your own security and safety</li>
          </ul>

          <p className="mt-3">The next slide includes a video about the <strong className="text-rose-200">Run, Hide, Fight</strong> strategy.</p>

          <h3 className="font-semibold underline mt-3">RUN</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Leave your belongings</li>
            <li>Do NOT go to your vehicle</li>
            <li>Stay low and try to find cover</li>
            <li>Get away from campus</li>
            <li>Help injured persons escape…IF POSSIBLE</li>
            <li>Contact 911 ONCE YOU ARE SAFE</li>
          </ul>

          <h3 className="font-semibold underline mt-3">HIDE</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Lock doors if possible</li>
            <li>Move furniture to block doors that cannot be locked</li>
            <li>Remain silent</li>
            <li>Silence phones and devices</li>
          </ul>

          <h3 className="font-semibold underline mt-3">FIGHT</h3>
          <ul className="list-disc pl-5 mt-2">
            <li>Only as a last resort</li>
            <li>Improvise weapons</li>
            <li>Attack weaknesses</li>
            <li>Commit to your actions</li>
          </ul>

          <Callout>
            <p className="m-0">First Responders: Keep your hands visible and follow instructions. Obey all commands immediately.</p>
          </Callout>
        </WebCard>

        <WebCard id="incident-reporting" title="Incident / Hazardous Condition Reporting">
          <p>Any time you are involved in an incident on campus that results in an injury, you need to complete an online <a href="https://tcatmemphis.edu/about/incident-report" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Incident Report</a>.</p>
          <p className="mt-3">If the incident involves a criminal act, such as a vehicle break-in, a different incident report must be completed. Students who report criminal acts will be provided the proper form when their initial report is made.</p>
          <p className="mt-3">Hazardous conditions may include:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Ice on footpaths or stairs</li>
            <li>Slip hazards on floors from spills</li>
            <li>Trip hazards from cords or materials left out</li>
            <li>Blocked hallways or exits</li>
          </ul>
        </WebCard>

        <WebCard id="safety-drills" title="Safety Drills">
          <p>While attending classes, you will likely be required to participate in various safety drills such as fire, tornado, and earthquake preparedness drills.</p>
          <h3 className="font-semibold underline mt-3">Fire Drills</h3>
          <p className="mt-2">During a fire drill or alarm, exit the building calmly and meet at your program's designated outdoor meeting area. Instructors will lead students back after the all-clear is given.</p>
          <div className="mt-3">
            <img src="/images/fire-strobe.jpg" alt="Fire alarm strobe light" className="rounded-md max-w-full" />
          </div>
        </WebCard>

        <WebCard id="download-presentation" title="Download Safety Rules PDF">
          <p>You can download the full safety rules PDF for offline viewing or printing.</p>
          <p className="mt-3"><a href="/CIT General Safety Rules.pdf" download className="text-indigo-300 underline font-semibold">Download the safety rules (CIT General Safety Rules.pdf)</a></p>
        </WebCard>

      </article>
    </PageWrapper>
  )
}

