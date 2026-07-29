import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
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
  X,
  Upload,
  FileAudio,
  Loader2,
  Sparkles,
} from "lucide-react";

// --- 1. THE 3D EARTH COMPONENT ---
function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();

  // Load high-quality textures
  const [colorMap, nightMap, cloudsMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 10;
    cloudsRef.current.rotation.y = elapsedTime / 8; // Clouds move slightly faster
  });

  return (
    <group position={[1.2, -0.2, 0]} scale={1.8}>
      {" "}
      {/* Positioned to the right */}
      {/* Ambient Glow / Atmosphere */}
      <Sphere args={[1.02, 64, 64]}>
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Earth Body */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          emissiveMap={nightMap}
          emissive={new THREE.Color("#ffaa00")}
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// --- 2. ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- 3. SUB-COMPONENT: NEW MEETING MODAL ---
const NewMeetingModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const handleUpload = async () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onClose();
      setFile(null);
      setTitle("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 text-white">
                <Mic size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                New Analysis
              </h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 ml-1">
                  Session Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q3 Strategic Planning"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all"
                />
              </div>
              <div
                className={`border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all ${file ? "border-blue-500 bg-blue-500/5" : "border-slate-800 hover:border-slate-700 bg-slate-950/30"}`}
              >
                <input
                  type="file"
                  id="audio-upload"
                  className="hidden"
                  accept="audio/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer flex flex-col items-center text-center"
                >
                  {file ? (
                    <>
                      <FileAudio size={48} className="text-blue-500 mb-4" />
                      <p className="text-sm font-bold text-white truncate max-w-[200px]">
                        {file.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload size={32} className="text-slate-500 mb-4" />
                      <p className="text-sm font-bold text-slate-300">
                        Drop audio or{" "}
                        <span className="text-blue-500">browse</span>
                      </p>
                    </>
                  )}
                </label>
              </div>
              <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-4 flex gap-3">
                <Sparkles className="text-blue-500 shrink-0" size={18} />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  AI will transcribe and extract action items automatically.
                </p>
              </div>
              <button
                onClick={handleUpload}
                disabled={!file || !title || uploading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Analyzing...
                  </>
                ) : (
                  "Start AI Analysis"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- 4. MAIN DASHBOARD ---
const Dashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
      {/* 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Stars
              radius={300}
              depth={60}
              count={20000}
              factor={7}
              saturation={0}
              fade
            />
            <ambientLight intensity={0.4} />
            <pointLight
              position={[10, 10, 10]}
              intensity={1.5}
              color="#ffffff"
            />
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <Earth />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <NewMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* CONTENT LAYER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-12"
      >
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-2">
              <span className="w-8 h-[2px] bg-blue-500"></span> Welcome Back
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              {user?.fullName?.split(" ")[0] || "Insight"}{" "}
              <span className="text-blue-600">Hub.</span>
            </h1>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-600/20 transition-all active:scale-95 group"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              <span>Record Meeting</span>
            </button>
          </motion.div>
        </header>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Meetings",
              value: "24",
              icon: Mic,
              color: "text-blue-500",
            },
            {
              label: "Tasks",
              value: "12",
              icon: Clock,
              color: "text-amber-500",
            },
            {
              label: "Rate",
              value: "89%",
              icon: CheckCircle2,
              color: "text-emerald-500",
            },
            {
              label: "Saved",
              value: "5.2h",
              icon: TrendingUp,
              color: "text-purple-500",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl hover:border-blue-500/20 transition-all group"
            >
              <div
                className={`p-4 rounded-2xl bg-white/5 ${stat.color} mb-6 w-fit shadow-inner group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={22} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black text-white">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-slate-900/20 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-3xl shadow-2xl"
          >
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
              Recent Sessions
            </h2>
            <div className="space-y-4">
              {["Product Sync", "Client Review", "Design Sprint"].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.03] border border-transparent hover:border-blue-500/20 hover:bg-white/[0.06] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-slate-950 rounded-2xl shadow-xl group-hover:rotate-6 transition-transform">
                        <FileText className="text-blue-500" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">{item}</h4>
                    </div>
                    <ChevronRight
                      size={24}
                      className="text-slate-600 group-hover:text-white transition-colors"
                    />
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-slate-900/20 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-3xl shadow-2xl"
          >
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
              Focus List
            </h2>
            <div className="space-y-5">
              {["Finalize Docs", "Email Client"].map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] transition-all"
                >
                  <div className="w-6 h-6 rounded-lg border-2 border-slate-700 group-hover:border-blue-500 transition-colors" />
                  <p className="text-sm font-bold text-white">{task}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
