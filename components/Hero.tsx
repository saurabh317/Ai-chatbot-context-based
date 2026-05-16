"use client";

import { ArrowRight, Play, Shield, Sparkles, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/common/Logo";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col bg-[#0B0F17] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600/20 blur-[160px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-[22px]">
          <Logo size={44} />
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a className="hover:text-white cursor-pointer">Features</a>
          <a className="hover:text-white cursor-pointer">How it Works</a>
          <a className="hover:text-white cursor-pointer">Pricing</a>
          <a className="hover:text-white cursor-pointer">Docs</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/auth-page")}
            className="text-sm text-white/70 hover:text-white"
          >
            Sign in
          </button>

          <button
            onClick={() => router.push("/auth-page")}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-medium hover:opacity-90"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative z-10 flex-1 flex items-center -mt-4">
        <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="py-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Context that{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                flows.
              </span>{" "}
              Answers that matter.
            </h1>

            <p className="mt-6 text-white/70 max-w-xl text-lg">
              ThreadAI remembers your conversations, understands your context,
              and delivers smarter responses.
            </p>

            {/* CTA */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => router.push("/auth-page")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full
                bg-gradient-to-r from-purple-500 to-blue-500
                shadow-lg shadow-purple-500/20 hover:opacity-90"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* FIXED BUTTON */}
              <button
                className="flex items-center gap-2 px-7 py-3.5 rounded-full
                bg-white/10 hover:bg-white/20 border border-white/10"
              >
                See how it works
                <Play className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            {/* FEATURES */}
            <div className="mt-12 flex items-center gap-10 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-white">Context aware</span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-white">Secure & private</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white">Built for teams</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="
              w-full max-w-lg lg:max-w-xl
              rounded-3xl border border-white/10 
              bg-white/5 backdrop-blur-xl 
              p-6 sm:p-7
              shadow-2xl
              scale-105 lg:scale-110
            "
            >
              <div className="flex gap-4">
                {/* Sidebar */}
                <div className="w-44 border-r border-white/10 pr-4 hidden sm:block">
                  <button className="w-full mb-4 px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                    + New Thread
                  </button>

                  <div className="text-xs text-white/60 space-y-2">
                    <p>AI Product Ideas</p>
                    <p>Marketing Strategy</p>
                    <p>Code Review</p>
                    <p>Research Notes</p>
                  </div>
                </div>

                {/* Chat */}
                <div className="flex-1 flex flex-col gap-4">
                  <div
                    className="self-end max-w-[80%] px-4 py-3 rounded-2xl text-sm
                    bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    I&apos;m thinking of building an AI that helps developers
                    with their workflow.
                  </div>

                  <div
                    className="max-w-[80%] px-4 py-3 rounded-2xl text-sm
                    bg-white/10 border border-white/10 text-white/80"
                  >
                    That&apos;s a great idea! Here are some ways you can
                    approach it:
                    <ul className="mt-2 list-disc pl-4 space-y-1 text-xs">
                      <li>Code generation & completion</li>
                      <li>Bug detection & suggestions</li>
                      <li>Documentation automation</li>
                      <li>Context-aware code review</li>
                    </ul>
                  </div>

                  <div
                    className="
                    mt-4 flex items-center gap-3 
                    rounded-full border border-white/10 
                    bg-white/5 px-5 py-3.5
                  "
                  >
                    <input
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent outline-none text-sm placeholder-white/40"
                    />
                    <button
                      className="
                      w-9 h-9 rounded-full
                      bg-gradient-to-r from-purple-500 to-blue-500
                      flex items-center justify-center
                    "
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
