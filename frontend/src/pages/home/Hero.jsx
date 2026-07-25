import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          🚀 AI Powered Meeting Assistant
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Smarter Meetings with
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            MinutesMind AI
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Record meetings, generate AI summaries, extract action items, schedule
          follow-ups, and collaborate with your entire team from one intelligent
          platform.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-8 py-4 text-white transition hover:bg-slate-900">
            <PlayCircle size={22} />
            Watch Demo
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-bold text-white">25K+</h2>
            <p className="text-slate-400">Meetings</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">99%</h2>
            <p className="text-slate-400">Accuracy</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">50+</h2>
            <p className="text-slate-400">Countries</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">24/7</h2>
            <p className="text-slate-400">AI Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
