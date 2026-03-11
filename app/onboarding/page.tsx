import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import PageWrapper from "../components/PageWrapper";
import WebCard from "../components/WebCard";
import { JSX } from "react";

export default function OnboardingPage(): JSX.Element {
  return (
    <PageWrapper>
      <SiteHeader
        title="Onboarding"
        subtitle="Follow the steps below to complete initial setup for this course."
      />

      <main className="mx-auto space-y-6 text-zinc-700 dark:text-zinc-300">
        <p>
          Welcome to the course! The onboarding steps below will guide you through essential items you must review and accounts you should create before classes begin. Read each section and follow the provided links to complete the tasks.
        </p>

        <WebCard title="Review the Syllabus">
          <p>
            The syllabus outlines course objectives, weekly topics, grading policies, required materials, and important dates. Please read it carefully so you understand expectations and deadlines. You can open the syllabus here: <Link href="/syllabus" className="text-indigo-600 underline">View Syllabus</Link>.
          </p>
        </WebCard>

        <WebCard title="Review the Safety Page">
          <p>
            Safety information covers lab rules, required personal protective equipment, emergency procedures, and reporting protocols. Reviewing these guidelines now helps keep you and others safe during hands-on activities. Open the safety page here: <Link href="/safety" className="text-indigo-600 underline">Safety Information</Link>.
          </p>
        </WebCard>

        <WebCard title="Login to Your Email Account">
          <p>
            We will use your institutional or Outlook account for official communications, announcements, and password resets. Make sure you can sign in and that you know how to access mail on your phone and desktop. Sign in to Outlook here: <a href="https://outlook.office.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Outlook Mail</a>.
          </p>
        </WebCard>

        <WebCard title="Login to Microsoft Teams">
          <p>
            As we get started, please take a few minutes to review the links below. These brief tutorials will help you get comfortable using Microsoft Teams, the primary platform we’ll be using for class communication, assignments, and resources.
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li className="mt-2">
              <a href="https://www.microsoft.com/en-us/microsoft-teams/log-in" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Sign in to Microsoft Teams</a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=voZE-xwK1gE" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Teams Training in 10 Minutes (YouTube)</a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/teams" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Microsoft Teams Full Video Training (Beginner to Advanced)</a>
            </li>
          </ul>
        </WebCard>

        <WebCard title="Create an Account on CompTIA">
          <p>
            If the course requires CompTIA resources or certification tracking, create an account on the CompTIA portal. Use a reliable email address, remember your credentials, and verify your account if prompted. Create your CompTIA account here: <a href="https://login.comptia.org/home" target="_blank" rel="noreferrer" className="text-indigo-600 underline">CompTIA Sign Up</a>.
          </p>
        </WebCard>
      </main>
    </PageWrapper>
  );
}
