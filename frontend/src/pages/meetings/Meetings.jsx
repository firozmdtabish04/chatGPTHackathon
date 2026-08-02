import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  CheckCircle2,
  Clock,
  Users,
  Upload,
  Play,
  Copy,
  Check,
  ChevronRight,
  Bot,
  ListTodo,
} from "lucide-react";

// Mock initial meeting data
const MOCK_MEETINGS = [
  {
    id: "1",
    title: "Q3 Product Roadmap & AI Feature Planning",
    date: "Oct 24, 2024",
    time: "10:00 AM - 11:00 AM",
    duration: "45 mins",
    participants: ["Alex Rivera", "Sarah Chen", "David Kim"],
    transcript: `Alex Rivera: Welcome everyone. Today we are aligning on our Q3 roadmap, specifically prioritizing the AI Meeting Summarizer feature.
Sarah Chen: Thanks Alex. From the engineering side, we've prototyped Whisper API integration for audio transcription. Accuracy is looking around 95%.
David Kim: Great. From UX design, we want to make sure key takeaways and action items stand out clearly, rather than dumping raw text.
Alex Rivera: Agreed. Sarah, when can we test the end-to-end pipeline with LLM structured JSON output?
Sarah Chen: We can have a staging build ready by next Tuesday, November 2nd.
David Kim: Perfect. I'll finish the final Figma UI specs for action item assignments by Friday.
Alex Rivera: Excellent. Let's make sure David also syncs with the marketing team on the launch copy before Friday as well.`,
    summary: {
      executiveSummary:
        "The team discussed aligning the Q3 roadmap around the AI Meeting Summarizer feature. Engineering demonstrated a working Whisper API prototype with high accuracy (95%), while Design focused on clear UX for action items.",
      keyDecisions: [
        "Prioritized AI Meeting Summarizer for the Q3 release.",
        "Adopted OpenAI Whisper API for transcript generation.",
        "Targeted Tuesday, Nov 2nd for the staging build.",
      ],
      actionItems: [
        {
          id: "a1",
          task: "Prepare staging build with LLM integration",
          assignee: "Sarah Chen",
          dueDate: "Nov 2, 2024",
          completed: false,
        },
        {
          id: "a2",
          task: "Finalize Figma UI specs for action items",
          assignee: "David Kim",
          dueDate: "Oct 27, 2024",
          completed: true,
        },
        {
          id: "a3",
          task: "Sync with marketing on product launch copy",
          assignee: "David Kim",
          dueDate: "Oct 27, 2024",
          completed: false,
        },
      ],
    },
  },
  {
    id: "2",
    title: "Client Onboarding & Feedback Review",
    date: "Oct 22, 2024",
    time: "2:00 PM - 2:30 PM",
    duration: "30 mins",
    participants: ["Sarah Chen", "Emily Watson"],
    transcript: `Sarah Chen: Emily, how was the feedback from the beta user cohort?
Emily Watson: Overall very positive! Users loved the instant summary feature, but asked for direct export to Slack or Jira.
Sarah Chen: That's doable. We can scope Slack webhooks for Sprint 4.`,
    summary: null, // Unsummarized meeting example
  },
];

function Meetings() {
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [selectedMeetingId, setSelectedMeetingId] = useState(
    MOCK_MEETINGS[0].id,
  );
  const [activeTab, setActiveTab] = useState("summary"); // 'summary' | 'transcript' | 'actionItems'
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentMeeting =
    meetings.find((m) => m.id === selectedMeetingId) || meetings[0];

  // Simulate AI Summarization process
  const handleGenerateSummary = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedSummary = {
        executiveSummary:
          "Beta testing feedback was reviewed, showing high user satisfaction with instant summaries. Client requested integrations with Slack and Jira.",
        keyDecisions: ["Scope Slack webhooks integration for Sprint 4."],
        actionItems: [
          {
            id: `a-${Date.now()}`,
            task: "Draft scope for Slack webhooks integration",
            assignee: "Sarah Chen",
            dueDate: "Nov 5, 2024",
            completed: false,
          },
        ],
      };

      setMeetings((prev) =>
        prev.map((m) =>
          m.id === currentMeeting.id ? { ...m, summary: generatedSummary } : m,
        ),
      );
      setIsGenerating(false);
      setActiveTab("summary");
    }, 2000);
  };

  // Toggle Action Item Completion
  const toggleActionItem = (itemId) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.id === currentMeeting.id && m.summary) {
          return {
            ...m,
            summary: {
              ...m.summary,
              actionItems: m.summary.actionItems.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            },
          };
        }
        return m;
      }),
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans p-24">
      {/* SIDEBAR: Meeting List */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            <h1 className="font-bold text-lg text-white">AI Summarizer</h1>
          </div>
          <button className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs flex items-center gap-1 transition">
            <Upload className="w-3.5 h-3.5" /> Upload
          </button>
        </div>

        <div className="p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Recent Meetings
          </p>
          <div className="space-y-1">
            {meetings.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMeetingId(m.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition flex flex-col gap-1 border ${
                  selectedMeetingId === m.id
                    ? "bg-indigo-950/40 border-indigo-500/50 text-white"
                    : "border-transparent text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{m.title}</span>
                  {m.summary && (
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {m.duration}
                  </span>
                  <span>{m.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentMeeting.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-indigo-400" />{" "}
                {currentMeeting.date} ({currentMeeting.time})
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-indigo-400" />{" "}
                {currentMeeting.participants.join(", ")}
              </span>
            </div>
          </div>

          {!currentMeeting.summary ? (
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition"
            >
              <Sparkles
                className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              {isGenerating ? "Analyzing Transcript..." : "Generate AI Summary"}
            </button>
          ) : (
            <button
              onClick={() =>
                copyToClipboard(currentMeeting.summary.executiveSummary)
              }
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-md transition"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy Summary"}
            </button>
          )}
        </header>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-800 bg-slate-900/20 flex gap-6 text-sm">
          <button
            onClick={() => setActiveTab("summary")}
            className={`py-3 font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === "summary"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Summary
          </button>
          <button
            onClick={() => setActiveTab("actionItems")}
            className={`py-3 font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === "actionItems"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ListTodo className="w-4 h-4" /> Action Items
            {currentMeeting.summary?.actionItems && (
              <span className="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full text-xs">
                {currentMeeting.summary.actionItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("transcript")}
            className={`py-3 font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === "transcript"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" /> Full Transcript
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* STATE 1: Unsummarized Empty State */}
          {!currentMeeting.summary &&
            activeTab === "summary" &&
            !isGenerating && (
              <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                <Bot className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-80" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  No AI Summary Generated Yet
                </h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm mb-4">
                  Let AI extract executive key points, decisions, and action
                  items from this meeting's transcript.
                </p>
                <button
                  onClick={handleGenerateSummary}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
                >
                  Summarize Now
                </button>
              </div>
            )}

          {/* STATE 2: Generating Loading Spinner */}
          {isGenerating && (
            <div className="text-center py-20">
              <div className="inline-block p-4 rounded-full bg-indigo-500/10 mb-4 animate-bounce">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-white font-medium">
                Extracting key decisions and task assignments...
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Powered by LLM models
              </p>
            </div>
          )}

          {/* TAB: AI Summary */}
          {currentMeeting.summary && activeTab === "summary" && (
            <div className="space-y-6 max-w-4xl">
              {/* Executive Summary */}
              <div className="p-5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
                <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                  Executive Summary
                </h3>
                <p className="text-slate-200 leading-relaxed text-sm">
                  {currentMeeting.summary.executiveSummary}
                </p>
              </div>

              {/* Key Decisions */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key
                  Decisions Made
                </h3>
                <ul className="space-y-2">
                  {currentMeeting.summary.keyDecisions.map((decision, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-sm text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-indigo-400 font-bold">•</span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB: Action Items */}
          {activeTab === "actionItems" && (
            <div className="max-w-4xl space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">
                Assigned Tasks & Deliverables
              </h3>
              {currentMeeting.summary?.actionItems.length ? (
                currentMeeting.summary.actionItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleActionItem(item.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      item.completed
                        ? "bg-slate-900/40 border-slate-800 text-slate-500 line-through"
                        : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}} // handled by div click
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                      />
                      <span className="text-sm">{item.task}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                        @{item.assignee}
                      </span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">
                  No action items found for this meeting.
                </p>
              )}
            </div>
          )}

          {/* TAB: Full Transcript */}
          {activeTab === "transcript" && (
            <div className="max-w-4xl bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed">
              {currentMeeting.transcript}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Meetings;
