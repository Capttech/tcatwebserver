import SiteHeader from "../components/SiteHeader";
import PageWrapper from "../components/PageWrapper";
import WebCard from "../components/WebCard";

export default function ClassEdicatePage() {
    const etiquetteItems = [
        {
            title: "Body language",
            description:
                "Everyone has bad mornings, and sometimes they follow you into the office or classroom. Be aware of your body language even when you aren’t saying anything. If you feel angry or frustrated, give yourself a 10-minute “time-out” in a private space to bring yourself back to neutral. You don’t want to give the wrong impression during a morning meeting or your performance reviews. Office etiquette requires professionalism even on your worst day.",
        },
        {
            title: "Don’t be late",
            description:
                "Whether it is arriving for class/work or to a meeting, being punctual actually means being five minutes early. Showing up late is simply disrespectful. It delivers the message to your coworkers that their time isn’t as important as yours.",
        },
        {
            title: "Dress appropriately",
            description:
                "Almost every class/office has a dress code; make sure that what you wear is appropriate to that code. Whether you work at a corporate law firm, or it’s casual Friday, there will be a set of rules to follow. If you are unsure of your school/company’s dress code, your HR team will be able to give you all the details.",
        },
        {
            title: "If you are sick stay home",
            description:
                "Do your team a favor and don’t share your pneumonia germs with everyone. Take a day or 2, and focus on getting better. You’re no good to anyone when you are too sick to read the numbers on your computer screen. If you must work, then work remotely – grab your laptop, and work from the comfort of home. Don’t forget to sanitize your desk when you get back to work.",
        },
        {
            title: "Respect students/coworkers down time",
            description:
                "Never contact a student/co-worker after hours, when they are off sick, or on vacation, unless they have given you specific directions to do so. Respect their downtime like they respect yours.",
        },
        {
            title: "Knock before you enter",
            description:
                "Knock on any office door before you go in. It is a way to tell someone you are there before you start speaking. The same goes when you visit coworkers in cubicles. Even though their space doesn’t have a traditional door, you can knock on their cubical wall. If they are deep in their work, ask them to come see you when they have a moment – or make a time to come back and chat with them.",
        },
        {
            title: "Turn the music (and your goofy) down",
            description:
                "Though you may think that classical opera is the best music to help your concentration, your fellow students/coworkers might not feel the same way. It is fine to have soft music playing in your area as long as the volume won’t interrupt anyone else’s train of thought. Keep the volume turned down to a private level, or wear headphones.",
        },
        {
            title: "Give meetings all your attention",
            description:
                "This means no answering phone calls, texting, or checking your email. If you aren’t giving a meeting your full attention there is a strong possibility you are missing critical details. Even worse is if you’re allowing these distractions to break your focus if you are the one who called the meeting!",
        },
        {
            title: "Respect everyone’s space",
            description:
                "Just because another student/coworkers desk is within reach doesn’t mean is common space – treat it like a private office. Don’t just you can help yourself to anything that is on their desk, instead ask before borrowing anything. Alternatively get your own supplies.",
        },
        {
            title: "Respect other people’s allergies",
            description:
                "Avoid overpowering fragrances, or any food your fellow classmates/coworkers are allergic to. No one wants to be responsible for sending anyone to the hospital.",
        },
        {
            title: "Keep social media appropriate",
            description:
                "If you are “friends” with other students/coworkers online, know that nothing you post is truly private or confidential. Don’t complain about your boss, company or coworkers on social media. While it may help with your stress levels, if you take your complaining too far, it could damage your career.",
        },
        {
            title: "Take phone conversations in private rooms",
            description:
                "If you have a door, close it when you take a personal call. If you are in an open classroom/office, move your conversation to an area that is conducive to having a private conversation. If these aren’t an option, try to keep the call as short as possible or arrange to call the person back.",
        },
        {
            title: "Keep meetings in conference rooms, not at your desk",
            description:
                "Your meeting has nothing to do with anyone else. This is doubly important to remember when you are discussing confidential matters. Keep all your meetings to the conference rooms or to dedicated meeting rooms, if your office has them.",
        },
        {
            title: "End meetings on time",
            description:
                "Just as meetings need to be started on time, they need to end on time as well. Make sure that you leave enough time for any questions before you run out of the time you’ve allocated. You don’t know what everyone has planned for the rest of the day, but it probably isn’t a plan to spend more than an hour in a meeting.",
        },
        {
            title: "Reply to emails or instant messages",
            description:
                "Though you may receive ‘spam’ emails occasionally, most of the emails and instant messages you receive are probably important. Try to reply as fast as your work allows – or at least before the end of the day.",
        },
        {
            title: "Don’t just hit “reply all”",
            description:
                "It’s great when an email gets sent to the whole company congratulating a team on the great work they did on a project – but it’s not so great when 100 people hit reply all to chime in. Instead of automatically including everyone in your reply email, only include the people you need to.",
        },
        {
            title: "Clean up after yourself",
            description:
                "The office is not your home, and no one here is going to be cleaning up after you. This means washing your own dishes if you have a kitchen, throwing garbage away, and not leaving your personal items all over the office. Maintain a high level of cleanliness in communal spaces.",
        },
        {
            title: "Mute your cellphone and computer",
            description:
                "Somehow email notifications at high volume sound like nuclear warning alarms in a quiet office. So does your Crazy Frog ringtone. Do everyone a favor and turn them off completely.",
        },
    ];

    return (
        <PageWrapper>
            <SiteHeader
                title="Class Edicate"
                subtitle="Class information and expectations for professional behavior in class and workplace settings."
            />

            <div className="mt-6 space-y-4">
                {etiquetteItems.map((item) => (
                    <WebCard key={item.title} title={item.title} className="p-4">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{item.description}</p>
                    </WebCard>
                ))}
            </div>

            <div className="mt-6">
                <WebCard id="download-class-edicate" title="Download Class Etiquette PDF">
                    <p>You can download the full class etiquette PDF for offline viewing or printing.</p>
                    <p className="mt-3"><a href="/class_etiquette.pdf" download className="text-indigo-300 underline font-semibold">Download class etiquette (class_etiquette.pdf)</a></p>
                </WebCard>
            </div>
        </PageWrapper>
    );
}
