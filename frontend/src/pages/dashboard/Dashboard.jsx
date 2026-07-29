import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plus,
  MoreHorizontal,
  ChevronRight,
  FileText,
  AlertCircle,
  Search,
  Calendar as CalendarIcon,
  Users,
  ArrowUpRight,
  Filter,
  LayoutGrid,
} from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Update API documentation", priority: "High", done: false },
    {
      id: 2,
      text: "Review meeting summaries",
      priority: "Medium",
      done: false,
    },
    { id: 3, text: "Send email to stakeholders", priority: "Low", done: true },
  ]);

  const stats = [
    {
      label: "Total Meetings",
      value: "24",
      change: "+12%",
      icon: Mic,
      color: "blue",
    },
    {
      label: "Tasks Pending",
      value: "12",
      change: "-2",
      icon: Clock,
      color: "amber",
    },
    {
      label: "Completion Rate",
      value: "89%",
      change: "+5%",
      icon: CheckCircle2,
      color: "emerald",
    },
    {
      label: "AI Hours Saved",
      value: "5.2h",
      change: "+1.4h",
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const recentMeetings = [
    {
      id: 1,
      title: "Product Sync - Q3",
      date: "Today, 10:30 AM",
      duration: "45m",
      status: "Summarized",
      members: 4,
    },
    {
      id: 2,
      title: "Client Feedback Session",
      date: "Yesterday",
      duration: "32m",
      status: "Summarized",
      members: 2,
    },
    {
      id: 3,
      title: "Marketing Brainstorm",
      date: "Oct 10, 2023",
      duration: "1h 10m",
      status: "Processing",
      members: 8,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#020617] text-slate-200 pt-28 pb-12 px-6 md:px-12 selection:bg-blue-500/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-10"
        >
          {/* --- HEADER --- */}
          <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                <span className="w-8 h-[2px] bg-blue-500"></span> Overview
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                Insight <span className="text-blue-600">Hub.</span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="relative group hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search meetings..."
                  className="bg-slate-900/50 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none w-64 transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-2xl shadow-blue-600/20 transition-all active:scale-95 group">
                <Plus
                  size={20}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                <span>Record Meeting</span>
              </button>
            </motion.div>
          </header>

          {/* --- STATS GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative bg-slate-900/40 border border-white/5 p-6 rounded-[2.5rem] overflow-hidden hover:border-blue-500/20 transition-colors"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-slate-600" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3.5 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 shadow-inner`}
                  >
                    <stat.icon size={22} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-black text-white">
                    {stat.value}
                  </h3>
                  <span
                    className={`text-xs font-bold ${stat.change.includes("+") ? "text-emerald-500" : "text-slate-500"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- MAIN SECTION --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RECENT MEETINGS */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-slate-900/20 border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    <LayoutGrid size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    Recent Sessions
                  </h2>
                </div>
                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Filter size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="group flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-transparent hover:border-blue-500/20 hover:bg-white/[0.07] transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-950 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                        <FileText className="text-blue-500" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {meeting.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon size={14} /> {meeting.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users size={14} /> {meeting.members} participants
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span
                        className={`text-[10px] font-black px-4 py-1.5 rounded-xl tracking-widest uppercase ${
                          meeting.status === "Summarized"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-blue-600/10 text-blue-500 animate-pulse"
                        }`}
                      >
                        {meeting.status}
                      </span>
                      <button className="p-2 text-slate-600 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ACTION ITEMS */}
            <motion.div
              variants={itemVariants}
              className="bg-slate-900/20 border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl"
            >
              <div className="flex items-center gap-3 mb-10">
                <AlertCircle size={22} className="text-blue-500" />
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Focus List
                </h2>
              </div>

              <div className="space-y-5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all"
                  >
                    <button
                      onClick={() =>
                        setTasks(
                          tasks.map((t) =>
                            t.id === task.id ? { ...t, done: !t.done } : t,
                          ),
                        )
                      }
                      className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        task.done
                          ? "bg-blue-600 border-blue-600"
                          : "border-slate-700 group-hover:border-blue-500"
                      }`}
                    >
                      {task.done && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-bold transition-all ${task.done ? "text-slate-600 line-through" : "text-white"}`}
                      >
                        {task.text}
                      </p>
                      <span
                        className={`text-[10px] font-black uppercase tracking-tighter mt-1 block ${
                          task.priority === "High"
                            ? "text-rose-500"
                            : task.priority === "Medium"
                              ? "text-amber-500"
                              : "text-slate-500"
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-xs font-black uppercase tracking-widest text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/5">
                Launch Task Manager
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
