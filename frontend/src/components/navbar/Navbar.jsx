import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, BrainCircuit } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setOpen(false)}
        >
          <div className="rounded-xl bg-blue-600 p-2">
            <BrainCircuit size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">MinutesMind AI</h1>
            <p className="text-xs text-slate-400">AI Meeting Assistant</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "font-semibold text-blue-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-5 py-2 text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-screen border-t border-slate-800" : "max-h-0"
        }`}
      >
        <div className="space-y-2 bg-slate-950 px-6 py-5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-slate-700 px-4 py-3 text-center text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
