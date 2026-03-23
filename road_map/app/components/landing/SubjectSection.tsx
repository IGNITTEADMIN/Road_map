export default function SubjectSection() {
  const subjects = [
    {
      name: "Physics",
      description: "Build a strong foundation with mechanics, optics, and modern physics concepts.",
      icon: "⚛️",
    },
    {
      name: "Chemistry",
      description: "Master inorganic, organic, and physical chemistry through guided pathways.",
      icon: "🧪",
    },
    {
      name: "Mathematics",
      description: "Tackle algebra, calculus, and geometry with clear, structured steps.",
      icon: "📐",
    },
  ];

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Subjects</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Learn through curated subject roadmaps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-300">
            Each subject is broken down into manageable milestones so you always know what to study next.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(255,107,0,0.5)]"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                {subject.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {subject.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">
                {subject.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-300 opacity-0 transition group-hover:opacity-100">
                <span>View roadmap</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
