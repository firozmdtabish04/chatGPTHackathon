import React, { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Check,
  Zap,
  Crown,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";

// --- 1. INTERACTIVE BACKGROUND (Optimized) ---
function ParticleBackground() {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }),
  );
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          color="#3b82f6"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- 2. THEME FOR DATAGRID ---
const darkTheme = createTheme({
  palette: { mode: "dark", primary: { main: "#3b82f6" } },
});

// --- 3. PRICING CARD COMPONENT ---
const PricingCard = ({ plan, billing, index, isLogin }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const Icon = plan.icon;
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative group overflow-hidden rounded-[2.5rem] border transition-all duration-500 flex flex-col h-full p-8 md:p-10 ${
        plan.popular
          ? "border-blue-500 bg-blue-600/5 shadow-2xl shadow-blue-500/10"
          : "border-white/10 bg-slate-900/40 backdrop-blur-xl"
      }`}
    >
      {/* SPOTLIGHT EFFECT */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-b-2xl z-20">
          Most Popular
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div
          className={`mb-8 p-3 rounded-2xl w-fit ${plan.popular ? "bg-blue-600 shadow-lg shadow-blue-600/20" : "bg-white/5"}`}
        >
          <Icon className="text-white w-6 h-6" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

        <div className="flex items-baseline gap-1 mb-8 overflow-hidden h-12">
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-4xl font-black text-white"
            >
              {typeof price === "number" ? `$${price}` : price}
            </motion.span>
          </AnimatePresence>
          {typeof price === "number" && (
            <span className="text-slate-500 text-sm font-medium">/mo</span>
          )}
        </div>

        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors"
            >
              <Check className="w-5 h-5 text-blue-500 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
            plan.popular
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25"
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
          }`}
        >
          {isLogin ? "Upgrade Now" : "Get Started"} <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

// --- 4. MAIN PRICING COMPONENT ---
const Pricing = () => {
  const [billing, setBilling] = useState("monthly");
  const isLogin = true; // Replace with your auth state logic

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Zap,
      features: [
        "30 mins/mo",
        "Basic Summaries",
        "Email Support",
        "1 User License",
      ],
    },
    {
      name: "Pro AI",
      monthlyPrice: 19,
      yearlyPrice: 12,
      icon: Crown,
      popular: true,
      features: [
        "Unlimited Mins",
        "Advanced Analytics",
        "CRM Sync (Salesforce/Hubspot)",
        "Priority Support",
        "AI Action Item Extraction",
      ],
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      icon: Building2,
      features: [
        "Dedicated Instance",
        "Custom AI Models",
        "SOC2 Compliance",
        "24/7 Phone Support",
        "White-labeling",
      ],
    },
  ];

  const columns = [
    { field: "feature", headerName: "Compare Features", width: 300, flex: 1 },
    { field: "starter", headerName: "Starter", width: 150, align: "center" },
    { field: "pro", headerName: "Pro AI", width: 150, align: "center" },
    {
      field: "enterprise",
      headerName: "Enterprise",
      width: 150,
      align: "center",
    },
  ];

  const rows = [
    {
      id: 1,
      feature: "Monthly Transcription",
      starter: "30 Min",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      id: 2,
      feature: "AI Model",
      starter: "GPT-3.5",
      pro: "GPT-4 & Claude",
      enterprise: "Custom Fine-tuned",
    },
    {
      id: 3,
      feature: "Integrations",
      starter: "None",
      pro: "Standard",
      enterprise: "Custom API & SDK",
    },
    {
      id: 4,
      feature: "Data Retention",
      starter: "30 Days",
      pro: "Unlimited",
      enterprise: "Custom Policy",
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="relative min-h-screen bg-slate-950 overflow-x-hidden pt-32 pb-24">
        {/* Background Layer */}
        <div className="fixed inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense>
              <ParticleBackground />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black text-white mb-6"
            >
              Invest in <span className="text-blue-500 italic">Clarity.</span>
            </motion.h1>

            <div className="flex items-center justify-center gap-4 mt-10">
              <span
                className={`text-xs font-bold uppercase tracking-widest ${billing === "monthly" ? "text-white" : "text-slate-500"}`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))
                }
                className="w-14 h-7 bg-slate-800 rounded-full p-1 transition-all flex items-center border border-white/5"
              >
                <motion.div
                  animate={{ x: billing === "monthly" ? 0 : 28 }}
                  className="w-5 h-5 bg-blue-500 rounded-full shadow-lg"
                />
              </button>
              <span
                className={`text-xs font-bold uppercase tracking-widest ${billing === "yearly" ? "text-white" : "text-slate-500"}`}
              >
                Yearly <span className="text-emerald-500 ml-1">(-30%)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                billing={billing}
                index={i}
                isLogin={isLogin}
              />
            ))}
          </div>

          {/* MUI DATAGRID SECTION */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight uppercase tracking-[0.2em]">
                Detailed Analysis
              </h2>
              <div className="h-px bg-white/10 flex-grow" />
            </div>

            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 sm:p-8 overflow-hidden shadow-2xl">
              <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeader": {
                    color: "#fff",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  },
                  "& .MuiDataGrid-cell": {
                    color: "#94a3b8",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  },
                  "& .MuiDataGrid-virtualScroller": { minHeight: "300px" },
                }}
              />
            </div>
          </div>

          {/* TRUST FOOTER */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 border-t border-white/5 opacity-60">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-500" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                Enterprise Grade Security
              </span>
            </div>
            <div className="flex gap-8 items-center grayscale opacity-50">
              <span className="font-black text-xl italic">MICROSOFT</span>
              <span className="font-black text-xl italic">NOTION</span>
              <span className="font-black text-xl italic">SLACK</span>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Pricing;
