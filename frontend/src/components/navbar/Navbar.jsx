import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BrainCircuit,
  ChevronRight,
  LayoutDashboard,
  Mic,
  CheckSquare,
  Bell,
  User,
  LogOut,
  Settings,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const publicNavItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/feature" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
];

const authNavItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Meetings", path: "/meetings", icon: Mic },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Reminders", path: "/reminders", icon: Calendar },
];

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setIsOpen(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  const activeNavItems = isLoggedIn ? authNavItems : publicNavItems;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* 1. LOGO SECTION */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-blue-500 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative bg-slate-900 rounded-xl p-2 border border-white/10">
              <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
          </div>
          <>
            <span className="hidden sm:block text-lg lg:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
              <span className="pr-1">Minutes</span>
              <span className="text-blue-600">Mind</span>
            </span>
          </>
        </Link>

        {/* 2. DESKTOP NAVIGATION (Hidden on Mobile/Tablet) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 p-1 rounded-full backdrop-blur-sm">
          {activeNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                relative px-4 xl:px-6 py-2 text-xs xl:text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-2
                ${isActive ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white"}
              `}
            >
              {({ isActive }) => (
                <>
                  {item.icon && (
                    <item.icon
                      size={16}
                      className={isActive ? "text-white" : "opacity-70"}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 shadow-lg shadow-blue-500/30 rounded-full -z-0"
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

        {/* 3. ACTIONS (Notification & Profile) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {!isLoggedIn ? (
            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                to="/login"
                className="hidden sm:block text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-lg shadow-blue-500/25"
              >
                Get Started{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notification Button */}
              <button className="p-2 sm:p-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full relative transition">
                <Bell size={18} className="sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pr-1 sm:pr-3 bg-slate-900 border border-white/10 rounded-full hover:ring-4 hover:ring-blue-500/10 transition-all"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-inner">
                    {user?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:block max-w-[100px] xl:max-w-[150px] truncate text-sm font-bold text-white">
                    {user?.fullName || "User"}
                  </span>
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-56 sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">
                          Account Info
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 rounded-xl transition font-semibold"
                        >
                          <User size={18} /> Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 rounded-xl transition font-semibold"
                        >
                          <Settings size={18} /> Settings
                        </Link>
                        <div className="my-2 border-t border-slate-100 dark:border-white/5" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition font-bold"
                        >
                          <LogOut size={18} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* MOBILE TOGGLE (Visible on < lg) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-xl transition active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE DRAWER MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 sm:px-8 py-8 space-y-3">
              {activeNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-4 p-4 rounded-2xl text-base font-bold transition-all
                    ${isActive ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"}
                  `}
                >
                  {item.icon && <item.icon size={20} />}
                  {item.name}
                </NavLink>
              ))}

              {!isLoggedIn ? (
                <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full py-4 text-center font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-2xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full py-4 text-center font-bold bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20"
                  >
                    Get Started Free
                  </Link>
                </div>
              ) : (
                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full p-4 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition"
                  >
                    <LogOut size={20} /> Logout Account
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
