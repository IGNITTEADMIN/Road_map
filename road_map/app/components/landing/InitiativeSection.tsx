export default function InitiativeSection() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
          Our initiative
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Built by the Ignitte Teaching Club, NIT Trichy
        </h2>
        <p className="mt-5 text-base leading-relaxed text-gray-300">
          This platform is a free, student-driven roadmap to help JEE aspirants learn with clarity and confidence. We combine structured lessons, quizzes, and progress tools to make consistent preparation simple.
        </p>
        <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/5 px-5 py-3 text-sm text-gray-200">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-300">
            🎓
          </span>
          <span>
            Powered by a team of NIT Trichy students dedicated to making exam prep more accessible.
          </span>
        </div>
      </div>
    </section>
  );
}
