import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Heart,
  BrainCircuit,
  Send,
  Globe,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "AI Transcription", path: "/features" },
      { name: "Smart Summaries", path: "/features" },
      { name: "Team Analytics", path: "/analytics" },
      { name: "Integrations", path: "/integrations" },
      { name: "Pricing Plans", path: "/pricing" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Security (SOC2)", path: "/security" },
      { name: "Terms of Service", path: "/terms" },
    ],
    resources: [
      { name: "Documentation", path: "/docs" },
      { name: "API Reference", path: "/api" },
      { name: "Community", path: "/community" },
      { name: "Help Center", path: "/help" },
      { name: "Status Page", path: "/status" },
    ],
  };

  return (
    <footer className="relative border-t border-white/5 bg-slate-950 pt-20 pb-10 overflow-hidden">
      {/* Visual Accent - Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <BrainCircuit className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                MinutesMind{" "}
                <span className="text-blue-500 font-extrabold italic">AI</span>
              </span>
            </Link>
            <p className="max-w-sm text-slate-400 leading-relaxed text-sm">
              The next-generation meeting intelligence engine. We process over
              1M+ minutes monthly, turning raw conversations into actionable
              team knowledge.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {/* System Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  System Operational
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck size={12} className="text-blue-500" />
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  SOC2 COMPLIANT
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-3xl">
              <h4 className="text-white font-bold mb-2">
                Join the Intelligence Report
              </h4>
              <p className="text-slate-400 text-sm mb-6">
                Weekly insights on AI productivity and meeting hacks.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="enter your work email"
                  className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                  Subscribe <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 py-16">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-6">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={12}
                        className="ml-1 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Office / Location Column */}
          <div>
            <h3 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-6">
              Global HQ
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>
                  Cyber City, Phase II
                  <br />
                  Gurugram, India 122002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <a
                  href="mailto:hello@minutesmind.ai"
                  className="hover:text-white transition"
                >
                  hello@minutesmind.ai
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 (800) AI-TRANS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: SOCIALS & COPYRIGHT */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>© {year} MinutesMind AI</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>All rights reserved.</span>
            <span className="hidden sm:flex items-center gap-1 ml-4">
              Built with{" "}
              <Heart size={12} className="text-red-500 fill-red-500" /> for the
              future of work.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: FaGithub, href: "#" },
              { icon: FaLinkedin, href: "#" },
              { icon: FaXTwitter, href: "#" },
              { icon: FaDiscord, href: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -3 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-lg"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
