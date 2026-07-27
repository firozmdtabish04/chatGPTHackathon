import { Mail, MapPin, Phone, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              MinutesMind <span className="text-cyan-400">AI</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              AI-powered meeting intelligence platform that transforms meeting
              recordings into summaries, action items, tasks, and automated
              reminders to boost team productivity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Product</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Dashboard
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Meetings
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  AI Summaries
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Task Management
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Notifications
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-cyan-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Get in Touch
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400" />
                <span>support@minutesmind.ai</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-cyan-400" />
                <span>India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-cyan-500 hover:text-white"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-cyan-500 hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-cyan-500 hover:text-white"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row">
          <p>
            © {year}{" "}
            <span className="font-semibold text-white">MinutesMind AI</span>.
            All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Built with
            <Heart size={16} className="fill-red-500 text-red-500" />
            using React, Spring Boot & AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
