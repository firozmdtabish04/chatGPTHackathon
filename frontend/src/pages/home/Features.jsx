import {
  BrainCircuit,
  FileText,
  Mic,
  CalendarDays,
  CheckCircle2,
  Users,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Meeting Summary",
    description: "Generate accurate summaries automatically using advanced AI.",
  },
  {
    icon: Mic,
    title: "Speech to Text",
    description:
      "Convert live meetings into searchable transcripts in seconds.",
  },
  {
    icon: CheckCircle2,
    title: "Action Items",
    description: "Extract tasks and assign them to your team automatically.",
  },
  {
    icon: CalendarDays,
    title: "Calendar Integration",
    description: "Sync meetings with Google Calendar and Outlook.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share notes, recordings and meeting insights with teammates.",
  },
  {
    icon: FileText,
    title: "Meeting History",
    description: "Access every meeting, summary and transcript from one place.",
  },
];

const Features = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-blue-400 font-semibold">FEATURES</p>

          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Everything You Need for Better Meetings
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            MeetMind AI helps you record, organise and analyse every meeting
            with powerful AI-driven tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
