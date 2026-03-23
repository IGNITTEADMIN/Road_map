import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to level up your JEE prep?
        </h2>
        <p className="mt-4 max-w-2xl text-base text-gray-300">
          Start your journey with a clear roadmap, quick quizzes, and progress tracking that keeps you accountable.
        </p>
        <Link
          href="/learn"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ff6b00] px-10 py-4 text-base font-semibold text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-500"
        >
          Start Learning
        </Link>
      </div>
    </section>
  );
}
