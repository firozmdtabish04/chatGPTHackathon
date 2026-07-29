import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Icons
import { Mail, Lock, ArrowRight, ArrowLeft, BrainCircuit } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// --- 1. PERFORMANCE OPTIMIZED 3D BACKGROUND ---
const ParticleBackground = (props) => {
  const ref = useRef();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // useMemo prevents recalculating 15,000 floats on every render
  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array((isMobile ? 2000 : 5000) * 3), {
        radius: 1.5,
      }),
    [isMobile],
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
          size={isMobile ? 0.007 : 0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex items-center justify-center pt-24 overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* BACK BUTTON */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        {/* <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group pt-24"
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-bold tracking-widest hidden sm:block uppercase">
            Go Back
          </span>
        </Link> */}
      </motion.div>

      {/* LOGIN CARD */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-black/50">
          {/* LOGO & HEADER */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/20">
              <BrainCircuit className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Manage your meetings with MinutesMind AI
            </p>
          </motion.div>

          {/* ERROR ALERT */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[10px] uppercase tracking-widest font-bold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:ring-blue-500/40 outline-none transition-all placeholder:text-slate-700"
                />
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center transition-all group"
            >
              {loading ? "Verifying..." : "Secure Sign In"}
              {!loading && (
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </motion.button>
          </form>

          {/* SOCIALS */}
          <motion.div variants={itemVariants}>
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <span className="bg-[#0b1224] px-4">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <FcGoogle size={20} />{" "}
                <span className="text-sm text-white font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                <FaGithub size={20} className="text-white" />{" "}
                <span className="text-sm text-white font-bold">Github</span>
              </button>
            </div>
          </motion.div>

          {/* FOOTER */}
          <motion.p
            variants={itemVariants}
            className="text-center mt-10 text-slate-400 text-sm"
          >
            New to MinutesMind?{" "}
            <Link
              to="/register"
              className="text-white font-black hover:text-blue-400 transition-colors underline underline-offset-8 decoration-blue-500/40"
            >
              Create Account
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
