export default function FeaturesSection() {
  const features = [
    {
      title: "Structured Roadmap Learning",
      description: "Follow a clear step-by-step plan that maps every concept to your exam goals.",
      icon: "🗺️",
    },
    {
      title: "Tamil Lecture Videos",
      description: "Learn from expert Tamil-speaking instructors with bite-sized, topic-focused videos.",
      icon: "🎥",
    },
    {
      title: "Quiz & Practice Platform",
      description: "Practice with timed quizzes and instant feedback to build speed and confidence.",
      icon: "✅",
    },
    {
      title: "Progress Tracking",
      description: "Track your learning streak, mastery level, and readiness across subjects.",
      icon: "📈",
    },
  ];

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Features</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Built for focused, consistent JEE prep
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-300">
            Everything you need is organized in one place so you can study smarter and move forward with confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(255,107,0,0.5)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
