import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BrainCircuit, ChevronRight, Laptop } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/feature" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <div className="relative bg-slate-900 rounded-xl p-2 border border-white/10">
              <BrainCircuit className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">
              Minutes<span className="text-blue-500">Mind</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              AI Assistant
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/40 border border-white/5 p-1.5 rounded-full backdrop-blur-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                relative px-5 py-2 text-sm font-medium transition-colors rounded-full
                ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-full -z-0"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
          >
            Get Started
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU (AnimatePresence for smooth mounting) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-slate-950 border-b border-white/10"
          >
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      block text-lg font-medium p-2 rounded-lg
                      ${isActive ? "text-blue-500 bg-blue-500/10" : "text-slate-300"}
                    `}
                  >
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                <Link
                  to="/login"
                  className="block w-full py-3 text-center text-slate-300 font-medium rounded-xl border border-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-3 text-center bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
