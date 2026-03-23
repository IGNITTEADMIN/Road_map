"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#111111] text-white">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-20 lg:flex-row lg:items-start">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Master JEE with a <span className="text-[#ff6b00]">structured roadmap</span> for every topic
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-200 md:text-xl">
            Follow a step-by-step learning path that breaks down concepts, connects ideas, and keeps you on track toward exam success.
          </p>

          <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/learn"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#ff6b00] px-8 py-3 text-center font-semibold text-black shadow-xl shadow-orange-500/20 transition hover:bg-orange-500 sm:w-auto"
            >
              Start Learning
            </Link>
            <Link
              href="/subjects"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-600 bg-transparent px-8 py-3 text-center font-semibold text-gray-200 transition hover:border-[#ff6b00] hover:text-[#ff6b00] sm:w-auto"
            >
              Explore Subjects
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative mx-auto flex h-64 w-full max-w-lg items-center justify-center overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.7)] sm:h-80 lg:h-[420px]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-700 bg-white/5">
                <span className="text-2xl font-semibold text-gray-200">🎯</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-100">Interactive roadmap preview</p>
                <p className="text-sm text-gray-400">Your study path comes alive here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
