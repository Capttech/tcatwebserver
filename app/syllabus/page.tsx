import SiteHeader from "../components/SiteHeader";
import PageWrapper from "../components/PageWrapper";
import WebCard from "../components/WebCard";

export const metadata = {
    title: "Syllabus",
};

export default function Page() {
    return (
        <PageWrapper>
            <SiteHeader
                title="Class Syllabus"
                subtitle="Program overview, policies, and expectations for Computer Information Technology."
            />

            <main className="mt-6 space-y-6">
                <WebCard id="course-description" title="Course Description">
                    <p>
                        The mission of the Computer Information Technology program is to prepare students for in-demand careers in IT support, networking, cybersecurity, cloud infrastructure, and systems administration. Using industry-recognized platforms such as TestOut and CompTIA CertMaster Learn, students will build real-world skills through interactive labs, simulations, and guided certification prep.
                    </p>

                    <p className="mt-3">
                        The curriculum includes hands-on experience in troubleshooting, configuring, and securing IT systems, as well as implementing best practices for hardware, operating systems, networking, cloud technologies, and cybersecurity. Students will gain proficiency in tools and knowledge aligned with certifications including A+, Network+, Security+, Linux Pro, and Server Pro.
                    </p>

                    <p className="mt-3">
                        Throughout the program, emphasis is placed on safe, efficient work practices, critical thinking, and professional development. Graduates will be equipped with the technical and soft skills necessary to succeed in today&apos;s IT workforce and will have the opportunity to earn industry credentials to enhance their career readiness.
                    </p>
                </WebCard>

                <WebCard id="course-objectives" title="Course Objectives / Competencies">
                    <ul className="mt-3 list-disc pl-5 space-y-2 text-zinc-300">
                        <li>Understand how IT systems are structured and how their components interact.</li>
                        <li>Explain the role of lifelong learning and continuous skill development in IT careers.</li>
                        <li>Demonstrate professionalism, adaptability, and effective communication in a technical environment.</li>
                        <li>Distinguish between data, information, and the technologies that process them.</li>
                        <li>Use digital tools and communication platforms to solve business and technical problems.</li>
                        <li>Describe the historical evolution of computing, the Internet, and global IT trends.</li>
                        <li>Analyze the societal impact of information technology across industries and cultures.</li>
                        <li>Identify emerging technologies in computing, including IoT, mobile, and wearable devices.</li>
                        <li>Compare and recommend data encoding formats such as ASCII and Unicode.</li>
                        <li>Understand web technologies, standards (e.g., W3C), and genres of websites (e.g., ecommerce, government, education).</li>
                        <li>Use basic multimedia tools to capture, digitize, and edit content.</li>
                        <li>Identify key cybersecurity principles and best practices.</li>
                        <li>Demonstrate foundational skills in operating systems, hardware, networking, and cloud services.</li>
                        <li>Prepare for certification objectives aligned with TestOut PC Pro, Security Pro, Linux Pro, and related CompTIA certifications.</li>
                    </ul>
                </WebCard>

                <WebCard id="course-expectations" title="Course Expectations">
                    <ul className="mt-3 list-disc pl-5 space-y-2 text-zinc-300">
                        <li>Students must have a professional/workplace attitude at all times.</li>
                        <li>Students must communicate in an appropriate and professional manner at all times; the use of profanity is strictly prohibited.</li>
                        <li>Students will be required to work well with both the instructor and classmates.</li>
                        <li>Students must be self-motivated and able to work in various conditions and capacities.</li>
                        <li>Students must follow the syllabus and complete each section in order.</li>
                        <li>Students must arrive to class on time and meet all assignment deadlines.</li>
                        <li>Students must wear the designated class uniform every day unless otherwise approved.</li>
                        <li>Punctuality and professionalism are expected in both attendance and work submission.</li>
                    </ul>
                </WebCard>

                <WebCard id="grading-scale" title="Grading Scale / Method for Computing Grades">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <thead className="bg-white/5 text-zinc-100">
                                <tr>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Letter Grade</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Percentage Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <td className="px-4 py-2 font-semibold text-zinc-100">A</td>
                                    <td className="px-4 py-2">90–100</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="px-4 py-2 font-semibold text-zinc-100">B</td>
                                    <td className="px-4 py-2">80–89</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="px-4 py-2 font-semibold text-zinc-100">C</td>
                                    <td className="px-4 py-2">70–79</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="px-4 py-2 font-semibold text-zinc-100">D</td>
                                    <td className="px-4 py-2">60–69</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-zinc-100">F</td>
                                    <td className="px-4 py-2">0–59</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-4 text-zinc-200">
                        <strong className="text-zinc-100">Final Grade Formula:</strong> Theory (33%) + Skill (33%) + Worker Characteristics (34%) = 100%
                    </p>
                </WebCard>

                <WebCard id="cit-0001" title="CIT 0001">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Worker Characteristics</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">6 hours / 1 day</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        Throughout the trimester, students will be taught and graded on work ethic topics. The topics to be covered are attendance, appearance, character, teamwork, attitude, productivity/safety, organizational skills, communication, cooperation, and respect.
                    </p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Assignments &amp; Tests</h3>
                    <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <thead className="bg-white/5 text-zinc-100">
                                <tr>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Date / Timeline</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Chapter / Project</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Assignment(s)</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Date Completed</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 align-top">Day 1</td>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top">This is a foundational course and has no corresponding industry certification.</td>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </WebCard>

                <WebCard id="cit-1010" title="CIT 1010">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Shop Orientation &amp; Safety</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">6 hours / 1 day</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        Orientation and Practical Safety provides basic instruction in the normal class routine and basic safety practices through reading assignments, testing, practical application, demonstration, and lectures.
                    </p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Assignments &amp; Tests</h3>
                    <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <thead className="bg-white/5 text-zinc-100">
                                <tr>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Date / Timeline</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Chapter / Project</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Assignment(s)</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Date Completed</th>
                                    <th className="px-4 py-2 font-semibold border-b border-white/10">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top">Handout</td>
                                    <td className="px-4 py-2 align-top">Read the safety handout</td>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top"></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top">Complete Questions For Study and Discussion</td>
                                    <td className="px-4 py-2 align-top"></td>
                                    <td className="px-4 py-2 align-top"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </WebCard>

                <WebCard id="cit-1011" title="CIT - 1011">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Technology Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">30 Hours / 5 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        The purpose of the Technology Foundations program is to provide a comprehensive set of activities that enable students to develop and/or enhance their foundational skills. Students complete an assessment test to determine their present skill level in math, reading, locating information, and writing. Individuals with identified deficiencies in these areas are scheduled to attend Technology Foundations to correct these deficiencies. When students achieve the designated skill level, they will exit from Technology Foundations.
                    </p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Entry Level Skill-Sets / Standards</h3>
                    <p className="mt-2 text-zinc-300">
                        Students should have proficiency with basic personal computer skills, including: using a mouse/keyboard; using a web browser to open and navigate web pages; and basic operating system functions to support saving and printing files.
                    </p>
                    <ul className="mt-3 list-disc pl-5 space-y-2 text-zinc-300">
                        <li>Math</li>
                        <li>Locating Information</li>
                        <li>Reading for information</li>
                        <li>Writing</li>
                    </ul>
                </WebCard>

                <WebCard id="cit-1022" title="CIT - 1022">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">IT Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">120 Hours / 24 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        In this class, the student will be taught the knowledge and skills required to identify and explain the basics of computing, IT infrastructure, software development, and database use. In addition, students will demonstrate their knowledge of installing software, establishing basic network connectivity, and identifying and preventing basic security risks. Further, this course will assess the student&apos;s knowledge in the areas of troubleshooting theory and preventative maintenance of devices. This course is designed for students who are advanced end-users, considering a career in IT, and interested in pursuing professional-level certifications.
                    </p>
                </WebCard>

                <WebCard id="cit-1032" title="CIT - 1032">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Introduction to Applications</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">90 Hours / 15 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of CIT-1022: IT Foundations class competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        In this class, students will gain a fundamental understanding of the integrated applications environment and the ability to complete tasks independently in each of the application suites.
                    </p>
                    <p className="mt-3 text-zinc-300">
                        They will be able to demonstrate the correct application of the principle features of Word 2019 by creating and editing two- to three-page documents for various purposes and situations.
                    </p>
                    <p className="mt-3 text-zinc-300">
                        The student will be introduced to the fundamental tasks of creating and managing worksheets and workbooks using Microsoft Excel 2019. Students will gain a basic understanding of creating worksheets and workbooks, and will develop cells and ranges, create tables, apply formulas and functions, and create charts and objects.
                    </p>
                    <p className="mt-3 text-zinc-300">
                        The student will also be introduced to communication and collaboration software using Microsoft Outlook 2019. Students will gain a fundamental understanding of customizing the Outlook environment. They will create, edit, and respond to professional-looking email messages, maintain calendars across time zones, and schedule tasks, meetings, and appointments for a variety of purposes and situations.
                    </p>
                </WebCard>

                <WebCard id="cit-1042" title="CIT - 1042">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Introduction to Operating Systems</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">90 Hours / 15 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of CITX-1022: IT Foundations class competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        Students in this class will be introduced to a comprehensive introduction to using and managing personal computers running a modern desktop operating system. Students will learn how operating systems are organized and function; how to perform desktop OS installation, upgrade and configuration; manage applications, services, and hardware; manage files, file systems, directories and storage devices; perform OS updates, maintenance, and security configuration tasks; manage user accounts, sharing, and securing shared resources; and navigate and manage files, directories, subdirectories, and file systems from a command-line.
                    </p>
                </WebCard>

                <WebCard id="cit-1070" title="CIT 1070">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">IT Help Desk Support Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">90 hours / 15 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of Personal Computer Operator Certificate competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        This course focuses on key information and skills for IT user support professionals, including: understanding leadership qualities of customer service professionals; developing professional interpersonal skills; using troubleshooting and problem-solving strategies; understanding strategies for successful communication with users; determining a client&apos;s specific needs and expectations; IT Help Desk Operations and User Support Management; and planning training and preparing training materials for end users.
                    </p>
                </WebCard>

                <WebCard id="cit-2030" title="CIT 2030">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Computer Support Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">426 hours / 71 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of Personal Computer Operator Certificate competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        This course focuses on key information and skills for IT user support professionals, including: understanding leadership qualities of customer service professionals; developing professional interpersonal skills; using troubleshooting and problem-solving strategies; understanding strategies for successful communication with users; determining a client&apos;s specific needs and expectations; IT Help Desk Operations and User Support Management; and planning training and preparing training materials for end users.
                    </p>
                </WebCard>

                <WebCard id="cit-3020" title="CIT 3020">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Networking Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">276 hours / 46 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of Technical Support Specialist Certificate objectives and competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        Students in this class will be introduced to the fundamental building blocks that form a modern network, such as hardware, topologies, and protocols, along with an introduction to the OSI model. Students will receive in-depth coverage of the most essential concepts in contemporary networking, including TCP/IP, Ethernet, wireless transmission, virtual networks, cloud computing, segmentation, security, performance optimization, and troubleshooting. After completing this course and mastering the competencies, students will be prepared to select the appropriate network design, hardware, and software for their network environment. Practitioners will have the foundational skills to build a network from scratch and maintain, upgrade, troubleshoot, and manage an existing network.
                    </p>
                </WebCard>

                <WebCard id="cit-3030" title="CIT 3030">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Networking Infrastructure Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">150 hours / 25 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of Technical Support Specialist Certificate objectives and competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        In this course, students will gain a comprehensive, systematic approach to learn the fundamentals of designing, installing, and supporting telecommunications lines for voice, data, and video copper-based cabling systems for residential and commercial distribution systems. This course is designed to provide entry-level installers with the background, knowledge, and basic skills needed to function safely and effectively as part of a low-voltage cabling installation team.
                    </p>
                </WebCard>

                <WebCard id="cit-4020" title="CIT 4020">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">IT Security Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">300 hours / 50 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of IT Network Support Specialist Certificate objectives and competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        The security of the data and information contained on computers and digital devices today are more threatened than ever before, and attacks are escalating daily. The need to identify and defend against these attacks has created an essential workforce that is now at the very core of the Information Technology (IT) industry. This class introduces the foundational concepts and strategies of network security, including compliance and operational security; threats and vulnerabilities; application, data, and host security; access control and identity management; and cryptography. The course also covers new topics in network security, including psychological approaches to social engineering attacks, web application attacks, penetration testing, data loss prevention, cloud computing security, and application programming development security.
                    </p>
                </WebCard>

                <WebCard id="cit-4030" title="CIT 4030">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Cloud Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">126 hours / 21 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Successful completion of IT Network Support Specialist Certificate objectives and competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        This course will introduce students to the Amazon Web Services cloud infrastructure and services. Students will be introduced to understanding AWS cloud solutions and will be able to explain the value of the AWS cloud; understand and explain the AWS shared responsibility model; understand cloud security best practices; understand AWS cloud costs, economics, and billing practices; describe and position the core AWS services, including compute, network, databases, and storage; and identify AWS services for everyday use cases.
                    </p>
                </WebCard>

                <WebCard id="cit-5020" title="CIT 5020">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Network Defense Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">216 hours / 36 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Completion of the Information Technology Systems Support Specialist Diploma class competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        This course will introduce students to the concepts and technologies in mastering intermediate-level cybersecurity skills and knowledge. It is designed to prepare student security analysts, threat intelligence analysts, and incident response handlers who will leverage intelligence and threat detection techniques, analyze and interpret data, identify and address vulnerabilities, suggest preventative measures, and effectively respond to and recover from incidents as they apply to an organization&apos;s data, applications, and digital infrastructure.
                    </p>
                </WebCard>

                <WebCard id="cit-5030" title="CIT 5030">
                    <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full text-left text-zinc-300 border border-white/10 rounded-md">
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-2 font-semibold text-zinc-100 w-1/3">Course Title</th>
                                    <td className="px-4 py-2">Network Penetration Foundations</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 font-semibold text-zinc-100">Duration</th>
                                    <td className="px-4 py-2">216 hours / 36 days</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-4 font-semibold text-zinc-100">Prerequisite Course</h3>
                    <p className="mt-2 text-zinc-300">Completion of the Information Technology Systems Support Specialist Diploma class competencies.</p>

                    <h3 className="mt-4 font-semibold text-zinc-100">Course Description</h3>
                    <p className="mt-2 text-zinc-300">
                        This course will introduce students to knowledge and technologies needed to plan and perform network penetration tests and other security engagements to gain a deeper understanding of cybersecurity from an offensive perspective. It is designed to prepare students for careers as security analysts, threat intelligence analysts, and incident response handlers, equipping them to plan engagements, conduct reconnaissance to identify vulnerabilities in target organizations, exploit vulnerable targets, and create follow-up reports.
                    </p>
                </WebCard>

                <WebCard id="download-syllabus" title="Download Full Syllabus">
                    <p>You can download the full syllabus PDF for offline viewing or printing.</p>
                    <p className="mt-3"><a href="/CIT_Syllabus.pdf" download className="text-indigo-300 underline font-semibold">Download the syllabus (CIT_Syllabus.pdf)</a></p>
                </WebCard>
            </main>
        </PageWrapper>
    );
}
