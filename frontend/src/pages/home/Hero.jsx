import React, { Suspense, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import {
  ArrowRight,
  PlayCircle,
  Zap,
  MousePointer2,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Users,
} from "lucide-react";
import ai from "../../assets/image.png";

// --- 3D PARTICLE BACKGROUND ---
function ParticleBackground() {
  const ref = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array((isMobile ? 1500 : 3000) * 3), {
      radius: 1.5,
    }),
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- FLOATING UI ELEMENT ---
const FloatingCard = ({ icon: Icon, text, delay, position }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay,
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
    className={`absolute hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-20 ${position}`}
  >
    <div className="bg-blue-500 p-2 rounded-lg">
      <Icon size={18} className="text-white" />
    </div>
    <span className="text-sm font-medium text-white whitespace-nowrap">
      {text}
    </span>
  </motion.div>
);

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-slate-950 overflow-hidden pt-28 pb-20">
      {/* 1. BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Trust Badge */}
          <motion.div
            variants={itemVariants}
            className="group cursor-default inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md mb-10 hover:border-blue-500/50 transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Trusted by 2,000+ modern teams
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-9xl"
          >
            Meetings, <br />
            <span className="bg-gradient-to-r from-blue-400 via-white to-indigo-400 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-400 font-medium"
          >
            MinutesMind AI turns your team conversations into structured
            knowledge. Automate your workflow, from transcription to Jira tasks,
            in one click.
          </motion.p>

          {/* CTA & Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/register"
                className="group relative flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-10 py-5 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] active:scale-95"
              >
                Start for free
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-10 py-5 font-bold text-white transition-all hover:bg-white/10 active:scale-95">
                <PlayCircle size={22} className="text-blue-400" />
                See it in action
              </button>
            </div>

            {/* Human Element: User Avatars */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-950"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium italic">
                "The best AI tool I've used this year" — Sarah, Product Lead
              </p>
            </div>
          </motion.div>

          {/* 3. INTERACTIVE DASHBOARD SECTION */}
          <motion.div
            variants={itemVariants}
            className="relative mt-24 w-full max-w-6xl px-4 lg:px-0"
            style={{ perspective: "1000px" }}
          >
            {/* Contextual Floating Elements */}
            <FloatingCard
              icon={Sparkles}
              text="Summary Generated"
              delay={0}
              position="top-[-20px] left-[5%]"
            />
            <FloatingCard
              icon={CheckCircle}
              text="Tasks assigned to Jira"
              delay={1}
              position="top-[40%] right-[-5%]"
            />
            <FloatingCard
              icon={Users}
              text="4 Members Active"
              delay={0.5}
              position="bottom-[10%] left-[-8%]"
            />

            <motion.div
              style={{ rotateX: mousePos.y / 10, rotateY: mousePos.x / 10 }}
              className="relative rounded-[2.5rem] border border-white/10 bg-slate-900/50 backdrop-blur-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />

              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                  MinutesMind Central Dashboard
                </div>
                <MousePointer2 size={14} className="text-slate-600" />
              </div>

              <img
                src={ai}
                alt="AI Dashboard"
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Logo Marquee (Trusted By) */}
          <motion.div
            variants={itemVariants}
            className="mt-20 w-full overflow-hidden"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600 mb-10">
              Powering meetings at companies like
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all">
              {["MICROSOFT", "NOTION", "VERCEL", "LINEAR", "SLACK"].map(
                (logo) => (
                  <span
                    key={logo}
                    className="text-xl font-black text-white tracking-tighter"
                  >
                    {logo}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
          Discover More
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
