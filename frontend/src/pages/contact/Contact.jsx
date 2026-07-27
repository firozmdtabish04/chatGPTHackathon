import React, { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Send,
  Globe,
  HeadphonesIcon,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// --- 1. 3D INTERACTIVE NEURAL BACKGROUND ---
function NeuralNetwork() {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(3000 * 3), { radius: 1.5 }),
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@minutesmind.ai",
      color: "text-blue-500",
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      detail: "24/7 Priority Queue",
      color: "text-emerald-500",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      detail: "Average response: 2 mins",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden pt-28 pb-20">
      {/* 3D BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <NeuralNetwork />
          </Suspense>
        </Canvas>
      </div>

      {/* AMBIENT LIGHTING */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Let's Talk{" "}
              <span className="text-blue-500 italic">Intelligence.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions about our Enterprise features or custom AI models?
              Our team of engineers and product experts are ready to help.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="grid gap-6">
              {contactMethods.map((method, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-all group"
                >
                  <div
                    className={`p-4 rounded-2xl bg-slate-900 group-hover:scale-110 transition-transform`}
                  >
                    <method.icon className={method.color} size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{method.title}</h3>
                    <p className="text-slate-400 text-sm">{method.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="p-8 rounded-[2rem] bg-blue-600/10 border border-blue-500/20">
              <h4 className="text-white font-bold mb-6">
                Connect with our Ecosystem
              </h4>
              <div className="flex gap-4">
                {[FaLinkedin, FaXTwitter, FaGithub, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="p-4 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-blue-600 transition-all"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Elon Musk"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="elon@spacex.com"
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-2">
                    Subject
                  </label>
                  <select className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Enterprise Licensing</option>
                    <option>API Support</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 ml-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Tell us how we can help your team..."
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group active:scale-[0.98]">
                  DISPATCH MESSAGE
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM GLOBAL MAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              India · USA · Europe · Remote
            </h2>
            <p className="text-blue-100 font-medium text-lg">
              We are a globally distributed team building the future of meeting
              intelligence.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-2 bg-slate-950/30 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
              <MapPin size={14} /> Headquartered in India
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
