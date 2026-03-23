export default function HowItWorksSection() {
  const steps = [
    {
      title: "Choose subject",
      description: "Pick Physics, Chemistry, or Mathematics and begin your personalized roadmap.",
      icon: "📚",
    },
    {
      title: "Follow roadmap",
      description: "Complete each topic in order with clear milestones and built-in guidance.",
      icon: "🗺️",
    },
    {
      title: "Practice with quizzes",
      description: "Test understanding with quizzes that adapt to your progress.",
      icon: "📝",
    },
    {
      title: "Track progress",
      description: "See scores, streaks, and roadmap completion at a glance.",
      icon: "📈",
    },
  ];

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Your learning journey in four simple steps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-300">
            From choosing your subject to tracking your progress, everything is designed to keep you moving forward.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 lg:justify-between">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="min-w-[240px] flex-shrink-0 rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(255,107,0,0.5)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                {step.icon}
              </div>
              <p className="mt-6 text-sm font-semibold text-gray-200">Step {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
