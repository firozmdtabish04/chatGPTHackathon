import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  BrainCircuit,
  FileText,
  Mic,
  CalendarDays,
  CheckCircle2,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Meeting Intelligence",
    description:
      "Our proprietary LLM analyzes sentiment, intent, and context to provide summaries that go beyond simple transcription.",
    color: "from-blue-600 to-cyan-500",
    glow: "rgba(37, 99, 235, 0.2)",
  },
  {
    icon: Mic,
    title: "Real-time Transcription",
    description:
      "Industry-leading 99.2% accuracy across 50+ languages with automatic speaker identification and timestamping.",
    color: "from-purple-600 to-pink-500",
    glow: "rgba(147, 51, 234, 0.2)",
  },
  {
    icon: CheckCircle2,
    title: "Automated Action Items",
    description:
      "Neural networks extract tasks, owners, and deadlines, syncing them instantly with Jira, Asana, and Monday.com.",
    color: "from-emerald-600 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    icon: CalendarDays,
    title: "Enterprise Ecosystem",
    description:
      "Seamless bi-directional synchronization with Microsoft 365, Google Workspace, and specialized CRM systems.",
    color: "from-orange-600 to-amber-500",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  {
    icon: Users,
    title: "Team Knowledge Base",
    description:
      "Transform meetings into a searchable corporate brain. Search across months of conversations in milliseconds.",
    color: "from-indigo-600 to-blue-500",
    glow: "rgba(79, 70, 229, 0.2)",
  },
  {
    icon: FileText,
    title: "Privacy & Compliance",
    description:
      "SOC2 Type II, GDPR, and HIPAA compliant. Enterprise-grade encryption for all your sensitive voice data.",
    color: "from-rose-600 to-red-500",
    glow: "rgba(225, 29, 72, 0.2)",
  },
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);

  // Mouse tracking for tilt and spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the tilt effect
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]),
    springConfig,
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;

    // Normalize values between -0.5 and 0.5
    mouseX.set(mouseXRelative / width - 0.5);
    mouseY.set(mouseYRelative / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full w-full"
    >
      {/* THE CARD BODY */}
      <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 backdrop-blur-sm transition-all duration-500 group-hover:border-white/20 group-hover:bg-slate-900/60">
        {/* INTERACTIVE SPOTLIGHT */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${feature.glow}, transparent 80%)`,
            ),
          }}
        />

        {/* BORDER BEAM EFFECT (Animated Border Gradient) */}
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,white_360deg)] opacity-20" />
        </div>

        <div
          className="relative z-10 flex flex-col h-full"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* ICON SECTION */}
          <div
            className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon size={32} className="text-white" />
          </div>

          {/* TEXT CONTENT */}
          <h3 className="mb-4 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
            {feature.title}
          </h3>

          <p className="mb-8 flex-grow text-base leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
            {feature.description}
          </p>

          {/* INTERACTIVE FOOTER */}
          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-500 transition-all group-hover:gap-3 group-hover:text-blue-400">
              EXPLORE TECH <ArrowUpRight size={18} />
            </div>
            <div className="flex -space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500/50" />
              <div className="h-2 w-2 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
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
      {/* ENTERPRISE BACKGROUND: GRID SYSTEM */}
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

      {/* AMBIENT GLOWS */}
      <div className="absolute -top-24 left-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5"
          >
            <Zap size={14} className="fill-blue-500 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
              Enterprise Ready
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl"
          >
            The Future of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic font-black">
              Collective Intelligence.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-400"
          >
            We don't just transcribe meetings. We turn them into searchable,
            actionable assets that propel your team's velocity.
          </motion.p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* BOTTOM CALL-TO-ACTION BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex-row md:p-12"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              Scale your corporate brain{" "}
              <ShieldCheck className="text-emerald-500" />
            </h3>
            <p className="text-slate-400">
              Trusted by over 450 enterprises worldwide.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button className="rounded-2xl bg-white px-10 py-4 text-sm font-black text-slate-950 transition-all hover:bg-blue-500 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              GET STARTED FREE
            </button>
            <button className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors">
              BOOK A DEMO
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
