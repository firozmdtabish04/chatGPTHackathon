import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  Mic,
  CalendarDays,
  CheckCircle2,
  Users,
  ArrowUpRight,
  Zap,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Meeting Intelligence",
    description:
      "Our proprietary LLM analyzes sentiment, intent, and context to provide summaries that go beyond simple transcription.",
    color: "from-blue-600 to-cyan-500",
    glow: "rgba(37, 99, 235, 0.15)",
  },
  {
    icon: Mic,
    title: "Real-time Transcription",
    description:
      "Industry-leading 99.2% accuracy across 50+ languages with automatic speaker identification and timestamping.",
    color: "from-purple-600 to-pink-500",
    glow: "rgba(147, 51, 234, 0.15)",
  },
  {
    icon: CheckCircle2,
    title: "Automated Action Items",
    description:
      "Neural networks extract tasks, owners, and deadlines, syncing them instantly with Jira, Asana, and Monday.com.",
    color: "from-emerald-600 to-teal-500",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: CalendarDays,
    title: "Enterprise Ecosystem",
    description:
      "Seamless bi-directional synchronization with Microsoft 365, Google Workspace, and specialized CRM systems.",
    color: "from-orange-600 to-amber-500",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  {
    icon: Users,
    title: "Team Knowledge Base",
    description:
      "Transform meetings into a searchable corporate brain. Search across months of conversations in milliseconds.",
    color: "from-indigo-600 to-blue-500",
    glow: "rgba(79, 70, 229, 0.15)",
  },
  {
    icon: FileText,
    title: "Privacy & Compliance",
    description:
      "SOC2 Type II, GDPR, and HIPAA compliant. Enterprise-grade encryption for all your sensitive voice data.",
    color: "from-rose-600 to-red-500",
    glow: "rgba(225, 29, 72, 0.15)",
  },
];

// --- FEATURE CARD WITH 3D TILT & SPOTLIGHT ---
const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth tilt
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]),
    { stiffness: 150, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]),
    { stiffness: 150, damping: 20 },
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-slate-900/60">
        {/* INTERACTIVE GLOW SPOTLIGHT */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(350px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${feature.glow}, transparent 80%)`,
            ),
          }}
        />

        {/* CARD CONTENT */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(40px)" }}
        >
          <div
            className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
          >
            <feature.icon size={32} className="text-white" />
          </div>

          <h3 className="mb-4 text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            {feature.title}
          </h3>

          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            {feature.description}
          </p>

          <div className="mt-10 flex items-center gap-2 text-sm font-black text-blue-500 uppercase tracking-widest opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Learn More <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 py-24 lg:py-36"
    >
      {/* 1. ENGINEERING GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 w-fit"
          >
            <Zap size={14} className="fill-blue-500 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
              Enterprise Ecosystem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black tracking-tight text-white md:text-7xl"
          >
            Powering the Future of <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
              Productive Collaboration.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-slate-400 leading-relaxed max-w-2xl"
          >
            MinutesMind doesn't just record meetings. We build a living
            searchable knowledge base for your entire organization using the
            latest AI models.
          </motion.p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* TRUST BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-12 backdrop-blur-xl"
        >
          <div>
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              Built for scale <ShieldCheck className="text-emerald-500" />
            </h3>
            <p className="text-slate-400 mt-1">
              Compliant with SOC2, GDPR, and HIPAA standards.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-2xl bg-white px-8 py-4 text-xs font-black text-slate-950 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300">
              Contact Sales
            </button>
            <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
