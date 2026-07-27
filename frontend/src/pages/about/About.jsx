import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import { Brain, Target, ShieldCheck, Zap, Globe } from "lucide-react";
// --- 1. THE 3D AI CORE COMPONENT ---
function AICore() {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle rotation
    mesh.current.rotation.x = Math.cos(time / 4) * 0.2;
    mesh.current.rotation.y = Math.sin(time / 2) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 100, 100]} scale={1.4}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#1e3a8a"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" },
    }),
  };

  const values = [
    {
      icon: Target,
      title: "Precision",
      desc: "Our AI extracts the most critical insights with 99.2% accuracy.",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      desc: "Enterprise-grade SOC2 compliance and end-to-end encryption.",
    },
    {
      icon: Globe,
      title: "Global Scale",
      desc: "Supporting 50+ languages to unify teams across continents.",
    },
    {
      icon: Zap,
      title: "Velocity",
      desc: "Turning hour-long meetings into 2-minute actionable digests.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden pt-24 pb-20">
      {/* 3D HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        {/* Three.js Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight
              position={[-10, -10, -10]}
              color="#3b82f6"
              intensity={1}
            />
            <Suspense fallback={null}>
              <AICore />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="text-blue-500 font-black tracking-widest uppercase text-xs mb-4 block">
              Our Vision
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">
              The Future of <br />
              <span className="bg-gradient-to-r from-blue-400 via-white to-blue-600 bg-clip-text text-transparent italic">
                Work Intelligence.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              MinutesMind was born from a simple observation: meetings are where
              the best ideas happen, but documentation is where they go to die.
              We're changing that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Engineering a Better Brain for Business.
            </h2>
            <div className="space-y-6 text-slate-400 text-lg">
              <p>
                Founded in 2024, MinutesMind AI started with a team of
                researchers and developers obsessed with natural language
                processing. We realized that teams were spending more time
                "recaping" work than actually "doing" work.
              </p>
              <p>
                Our proprietary AI models don't just transcribe words; they
                understand
                <span className="text-blue-400 font-bold">
                  {" "}
                  intent, sentiment, and action.
                </span>
                By capturing the collective intelligence of every meeting, we
                help teams build a living, breathing knowledge base.
              </p>
            </div>

            <div className="flex gap-10 mt-12">
              <div>
                <h4 className="text-3xl font-black text-white">40K+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                  Users
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">1M+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                  Mins Processed
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">99%</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                  Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* Abstract Image or Decorative Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative h-[500px] bg-slate-900/50 rounded-[3rem] border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain
                size={200}
                className="text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-700"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-white/5">
              <p className="text-white font-bold italic">
                "We are moving from a world of manual documentation to a world
                of automatic realization."
              </p>
              <p className="text-slate-500 text-sm mt-2">
                — MinutesMind Engineering Team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="bg-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-colors"
              >
                <div className="bg-blue-600 w-12 h-12 flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-blue-600/20">
                  <v.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-blue-900/20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to join the revolution?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black transition-all hover:bg-slate-200 active:scale-95">
              GET STARTED FREE
            </button>
            <button className="bg-slate-950 text-white px-10 py-4 rounded-2xl font-black transition-all border border-white/10 hover:bg-slate-900">
              MEET THE TEAM
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
