import React from 'react'

const sectionStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
  padding: '1.5rem',
  borderRadius: 10,
  boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
  color: 'rgba(255,255,255,0.95)',
  marginBottom: '1rem',
  textAlign: 'left'
}

export default function Page() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #071019 0%, #0b1220 35%, #071633 100%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4rem',
      }}
    >
      <div style={{ maxWidth: 980, width: '100%' }}>
        <header style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h1 style={{ fontSize: '3rem', margin: 0, marginBottom: '0.25rem' }}>Class Safety</h1>
          <p style={{ fontSize: '1.15rem', marginTop: 0, marginBottom: '0.75rem', opacity: 0.95 }}>
            Guidelines and procedures to keep our classes safe and welcoming for everyone.
          </p>
        </header>

        <article>
          <section id="lab-safety" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Lab Safety</h2>
            <ul style={{ marginTop: 8, marginBottom: 12 }}>
              <li><strong>Wear proper clothing and PPE (Personal Protective Equipment)</strong>
                <ul style={{ marginTop: 6, marginBottom: 6 }}>
                  <li>Closed-toe shoes</li>
                </ul>
              </li>
              <li><strong>Be aware of first-aid and emergency equipment</strong>
                <ul style={{ marginTop: 6, marginBottom: 6 }}>
                  <li>Fire extinguishers</li>
                  <li>ISH board</li>
                  <li>First-Aid kits</li>
                </ul>
              </li>
            </ul>
          </section>

          <section id="ish-board" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>ISH Board</h2>
            <p style={{ marginTop: 8, marginBottom: 6, fontWeight: 600 }}>ISH Boards (Information Security Health)</p>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              Each program is equipped with an ISH Board. This is where you can find first-aid
              equipment, fire evacuation plans, emergency contact numbers, and other information
              that is useful during an emergency.
            </p>
            <p style={{ marginTop: 8, marginBottom: 0 }}>
              You are encouraged to make yourself familiar with the ISH Board in your area.
            </p>
          </section>

          <section id="natural-disasters" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Natural Disasters / Inclement Weather</h2>
            <p style={{ marginTop: 8, marginBottom: 8, opacity: 0.95 }}>
              The Southeastern U.S. is subject to various natural hazards (earthquakes, tornadoes,
              winter storms). <strong>Know the procedures for your building and participate in
              required safety drills.</strong>
            </p>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Tornado — Prepare</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li><strong>Watch vs. Warning:</strong> A <strong>Tornado Watch</strong> means conditions
                are favorable; a <strong>Tornado Warning</strong> means a tornado has been spotted or
                shown on radar.</li>
              <li><strong>Know your risk:</strong> the Southeast has elevated tornado risk,
                including nighttime tornadoes.</li>
              <li><strong>Recognize signs:</strong> rotating funnel cloud, debris cloud, or a loud
                roaring sound like a freight train.</li>
              <li><strong>Identify shelter:</strong> small, interior, windowless room on the lowest
                level — practice going there now.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Tornado — During</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li><strong>Go immediately</strong> to your pre-identified safe location (e.g., 1st
                floor hallways).</li>
              <li>If time allows, use additional shielding (pillows, heavy blankets, furniture).
              </li>
              <li><strong>Protect your head and neck</strong> with your arms.</li>
              <li><strong>Do not</strong> try to outrun a tornado in a vehicle.</li>
              <li>If trapped outdoors or in a car and you cannot reach a building, cover your head
                and neck and shield your body with a coat or blanket if available.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Tornado — After</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Monitor local news and weather for updates.</li>
              <li>If trapped, <strong>cover your mouth</strong> with cloth or a mask to avoid dust and
                <strong>signal</strong> rescuers with texts, banging, or a whistle (avoid shouting).</li>
              <li>Keep clear of downed power lines and broken utility poles.</li>
              <li><strong>Do not</strong> enter damaged buildings until authorities declare them safe.</li>
              <li>Use text or social media to communicate; save phone calls for emergencies.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Earthquake — During</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li><strong>Drop, Cover, and Hold On:</strong> drop to hands and knees, cover head and
                neck, and hold onto sturdy furniture until shaking stops.</li>
              <li>If indoors, stay inside until shaking stops — <strong>do NOT</strong> run outside.</li>
              <li>If in a vehicle, stop in a clear area away from buildings, trees, overpasses, or
                utility lines.</li>
              <li>If in a building, expect alarms and sprinklers; <strong>do not</strong> use elevators.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Earthquake — After</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Expect aftershocks; these can be strong.</li>
              <li>Check for injuries and assist others if trained.</li>
              <li>If in a damaged building, move outside and quickly away from the structure; do not
                re-enter damaged buildings.</li>
              <li>If trapped, cover your mouth, send a text, or signal rescuers with banging or a
                whistle. Save phone calls for emergencies.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Icy Conditions</h3>
            <p style={{ marginTop: 0, marginBottom: 8 }}>
              TCAT Memphis Administration monitors winter weather closely. In the event of snow or
              ice accumulation, Administration may close the school until travel conditions
              improve. Closures are announced on local news and via Slate alerts.
            </p>
            <p style={{ marginTop: 0, marginBottom: 0, fontWeight: 800 }}>
              REGARDLESS OF OPEN / CLOSED STATUS — <strong>DO NOT DRIVE IF IT IS NOT SAFE.</strong>
            </p>
          </section>

          <section id="students-disabilities" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Students with Disabilities</h2>
            <p style={{ marginTop: 8, marginBottom: 8, opacity: 0.95 }}>
              If you have a disability that prevents you from safely evacuating any area without
              assistance, you should notify your instructor on the first day you attend classes,
              or sooner.
            </p>

            <p style={{ marginTop: 0, marginBottom: 8 }}>
              If you will require assistance during an emergency, personnel will be designated to
              find you and help you evacuate.
            </p>

            <p style={{ marginTop: 0, marginBottom: 8, fontWeight: 700 }}>
              Note: The person with the disability is the best authority on how to be moved.
            </p>

            <p style={{ marginTop: 0, marginBottom: 0 }}>
              Provide your instructor with detailed instructions on what type of assistance you
              might need. This will be helpful in selecting a designee.
            </p>
          </section>

          <section id="violence-on-campus" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Violence on Campus</h2>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Be Prepared</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Understand the possibility of an act of violence on campus</li>
              <li>Equip yourself with the knowledge needed to make good decisions</li>
              <li>Be proactive with your own security and safety</li>
            </ul>

            <p style={{ marginTop: 0, marginBottom: 8 }}>
              The next slide includes a video about the <strong>Run, Hide, Fight</strong> strategy.
            </p>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>RUN</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Leave your belongings</li>
              <li>Do NOT go to your vehicle</li>
              <li>Stay low and try to find cover</li>
              <li>Get away from campus</li>
              <li>Help injured persons escape…IF POSSIBLE</li>
              <li>Contact 911 ONCE YOU ARE SAFE</li>
              <li>Post on a TCAT Memphis social media page that you are safe. Include the names of those who are with you.</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>HIDE</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Lock doors if possible</li>
              <li>Move furniture to block doors that cannot be locked</li>
              <li>Remain silent</li>
              <li>Silence phones and devices</li>
              <li>Make sure you are out of the shooter’s view, especially if there are windows</li>
              <li>If you are unsure if Law Enforcement officers are present, call 911 to confirm</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>FIGHT</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Only as a last resort</li>
              <li>Do not try to reason with an active shooter</li>
              <li>Improvise weapons</li>
              <li>Attack weaknesses</li>
              <li>Commit to your actions</li>
              <li>Act first and act fast</li>
              <li>Stop the shooter at all costs</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>First Responders</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>First objective is to stop the shooter, then evacuate and tend to the wounded</li>
              <li>Keep your hands up with fingers spread. Drop anything you are carrying. Do not attempt to point</li>
              <li>OBEY ALL COMMANDS IMMEDIATELY, WITHOUT QUESTION. Any delay could result in you being mistaken as a suspect</li>
              <li>If you are unsure if Law Enforcement officers are present, call 911 to confirm</li>
            </ul>

            <h3 style={{ fontSize: '1.05rem', marginTop: 6, marginBottom: 6, textDecoration: 'underline' }}>Being Proactive</h3>
            <ul style={{ marginTop: 0, marginBottom: 12 }}>
              <li>Make yourself familiar with all possible escape routes. Consider multiple scenarios. Familiarize yourself with items that could be used as weapons if you become locked down in your classroom</li>
              <li>Take it upon yourself to review this training periodically. Keep it fresh in your mind</li>
              <li>Participate in all active shooter drills and take them seriously</li>
              <li>Report strange behavior to Security or Law Enforcement immediately</li>
            </ul>

            <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>
              Placeholder: reporting active threats, lockdown procedures, and resources for
              victims.
            </p>
          </section>

          <section id="incident-reporting" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Incident / Hazardous Condition Reporting</h2>
            <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>
              Any time you are involved in an incident on campus that results in an injury, you need to
              complete an online <a href="https://tcatmemphis.edu/about/incident-report" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Incident Report</a>.
            </p>

            <p style={{ marginTop: 6, marginBottom: 0, opacity: 0.95 }}>
              If the incident involves a criminal act, such as a vehicle break-in, a different
              incident report must be completed. This criminal-incident form is not available online.
              Students who report criminal acts will be provided the proper form when their initial
              report is made.
            </p>

            <p style={{ marginTop: 6, marginBottom: 0, opacity: 0.95 }}>
              TCAT Memphis must follow strict rules from the Tennessee Bureau of Investigation as well
              as federal statutes provided in the Clery Act when a criminal act is committed on
              campus, so it is very important that reports are complete and accurate.
            </p>

            <p style={{ marginTop: 6, marginBottom: 0, opacity: 0.95 }}>
              To report a hazardous condition, whether in your training area or in common areas,
              simply notify your instructor. Your instructor knows how to make the condition known
              to the Physical Plant Department, who will address it promptly.
            </p>

            <p style={{ marginTop: 6, marginBottom: 0, opacity: 0.95 }}>
              Hazardous conditions may include:
            </p>

            <ul style={{ marginTop: 2, marginBottom: 12 }}>
              <li>Ice on footpaths or stairs</li>
              <li>Slip hazards on floors from spills</li>
              <li>Trip hazards from cords or materials left out</li>
              <li>Blocked hallways or exits</li>
            </ul>
          </section>

          <section id="safety-drills" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Safety Drills</h2>
            <p style={{ marginTop: 8, marginBottom: 6, opacity: 0.95 }}>
              As mentioned earlier, while attending classes at any TCAT Memphis campus, you will
              likely be required to participate in various safety drills. These may include:
            </p>

            <ul style={{ marginTop: 2, marginBottom: 12 }}>
              <li>Fire Drills</li>
              <li>Tornado Drills</li>
              <li>Earthquake Preparedness Drills</li>
            </ul>

            <p style={{ marginTop: 0, marginBottom: 0, opacity: 0.95 }}>
              Your instructor will be able to provide guidance when these drills occur. In the
              event of an actual emergency, you would be expected to react the same way we
              practice in our drills.
            </p>
            <h3 style={{ fontSize: '1.05rem', marginTop: 10, marginBottom: 6, textDecoration: 'underline' }}>Fire Drills</h3>
            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              Our most common safety drill is the fire drill. During a fire drill, or if the fire
              alarm is sounding, you will exit the building in a calm and orderly fashion, while
              trying to stay with your class. Each program has a designated meeting area outdoors.
              Once the all-clear signal has been issued, your instructor will lead you back to
              class. Each class is graded on how well they perform the drill.
            </p>

            <p style={{ marginTop: 0, marginBottom: 12, opacity: 0.95 }}>
              Instructors are given advance notice when a fire drill is to be performed. The
              instructor is NOT encouraged to lock classroom or shop doors behind them. If you
              have personal items in class with you at the time of the drill or alarm, and your
              designated meeting area is far from your classroom, you should take them with you.
              For this reason, you should keep personal belongings in the classroom to a minimum.
            </p>

            <h3 style={{ fontSize: '1.05rem', marginTop: 10, marginBottom: 6, textDecoration: 'underline' }}>Fire Drills (cont.)</h3>
            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              Anytime you hear the fire alarm buzzers or see the strobe lights flashing, you should
              evacuate the building immediately, then find your class at the designated meeting
              place.
            </p>

            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              A fire alarm strobe light looks like this:
            </p>

            <div style={{ marginTop: 4, marginBottom: 12 }}>
              <img src="/images/fire-strobe.jpg" alt="Fire alarm strobe light" style={{ maxWidth: '100%', borderRadius: 6 }} />
            </div>
            <h3 style={{ fontSize: '1.05rem', marginTop: 10, marginBottom: 6, textDecoration: 'underline' }}>Tornado Drills</h3>
            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              Faculty, staff, and students are alerted of a tornado or drill by all available means
              of communication. This may include telephone, Schoolcast messages, two-way radio,
              or email.
            </p>

            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              Tornado drills are handled on a program-by-program basis. Because each training area
              is unique, some programs may be required to respond differently than others. Your
              instructor can provide guidance for your program area.
            </p>

            <p style={{ marginTop: 0, marginBottom: 12, opacity: 0.95 }}>
              The goal is to find an empty, low level area, with no windows to take shelter. This may
              be a ground level hallway, or an area in your classroom. Once you are in the proper
              area, you should get on your knees with your hands and arms covering your head. Wait
              in this position until instructed that it is safe to leave.
            </p>
            <h3 style={{ fontSize: '1.05rem', marginTop: 10, marginBottom: 6, textDecoration: 'underline' }}>Earthquake Preparedness Drills</h3>
            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              Earthquake Preparedness Drills are conducted annually, in conjunction with
              International ShakeOut Day, on the third Thursday of October.
            </p>

            <p style={{ marginTop: 0, marginBottom: 6, opacity: 0.95 }}>
              During an earthquake drill, you are expected to:
            </p>

            <ul style={{ marginTop: 2, marginBottom: 12 }}>
              <li>Drop where you are onto your hands and knees.</li>
              <li>Cover your head and neck with one arm and hand. Then crawl underneath a table or desk for additional shelter. Stay on your knees and bend forward to protect vital organs.</li>
              <li>Hold On to your shelter with one hand. Keep covering your head and neck with your other hand.</li>
            </ul>
          </section>

                    <section id="download-presentation" style={sectionStyle}>
            <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Download Full Presentation</h2>
            <p style={{ marginTop: 8, marginBottom: 8, opacity: 0.95 }}>
              You can download the full PowerPoint that covers all safety topics on this page for
              offline viewing or instructor-led presentation.
            </p>

            <p style={{ marginTop: 0, marginBottom: 0 }}>
              <a href="/safety_powerpoint.pptx" download className="text-indigo-600 underline">Download the safety presentation (safety_powerpoint.pptx)</a>
            </p>
          </section>

        </article>
      </div>
    </main>
  )
}

