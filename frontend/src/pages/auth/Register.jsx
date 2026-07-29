import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
// Icons
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  BrainCircuit,
  User,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// --- PERFORMANCE OPTIMIZED 3D BACKGROUND ---
function ParticleBackground(props) {
  const ref = useRef();
  // Detect if screen is small to reduce particle count for performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const [sphere] = useState(() =>
    random.inSphere(new Float32Array((isMobile ? 2500 : 5000) * 3), {
      radius: 1.5,
    }),
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={isMobile ? 0.007 : 0.005} // Slightly larger particles on mobile
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", form);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-x-hidden">
      {/* 1. BACK BUTTON - Responsive Position */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-4 sm:top-10 sm:left-10 z-50"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-bold tracking-widest hidden sm:block uppercase">
            Back
          </span>
        </Link>
      </motion.div>

      {/* 2. THREE.JS LAYER - Fixed and Backgrounded */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. GLOW DECORATIONS */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 4. MAIN CARD */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg md:max-w-2xl pt-16"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl ">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex p-3 sm:p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/20">
              <BrainCircuit className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Join MinutesMind AI to automate your meetings
            </p>
          </motion.div>

          {/* Form */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Grid Layout for Name and Email on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Tabish Firoz"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tabish@example.com"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-11 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                />
              </div>
            </motion.div>
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center"
            >
              {loading ? "Creating Account..." : "Get Started"}

              {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
            </motion.button>
          </form>

          {/* Social Register */}
          <motion.div variants={itemVariants}>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <span className="bg-[#0b1224] px-4">OR CONTINUE WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 sm:py-3.5 rounded-2xl hover:bg-white/10 transition-all">
                <FcGoogle size={20} />
                <span className="text-xs sm:text-sm text-white font-semibold">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 sm:py-3.5 rounded-2xl hover:bg-white/10 transition-all">
                <FaGithub size={20} className="text-white" />
                <span className="text-xs sm:text-sm text-white font-semibold">
                  Github
                </span>
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center mt-8 sm:mt-10 text-slate-400 text-xs sm:text-sm"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-bold hover:text-blue-400 transition-colors underline underline-offset-4 decoration-blue-500/40"
            >
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
