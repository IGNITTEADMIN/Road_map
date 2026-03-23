export default function ProgressSection() {
  const stats = [
    {
      label: "Roadmap Completion",
      value: 68,
      color: "bg-orange-500",
    },
    {
      label: "Quizzes Passed",
      value: 52,
      color: "bg-green-500",
    },
    {
      label: "Video Watch Time",
      value: 42,
      color: "bg-blue-500",
    },
  ];

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
              Track your progress
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              See how far you've come and where you're headed
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300">
              Visual progress bars and quick dashboard cards keep your learning momentum going. Check what’s completed, what’s next, and when you’ll be exam-ready.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-200">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}%</p>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                    <div
                      className={`${stat.color} h-full rounded-full transition-all duration-500`} 
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-200">Today’s streak</p>
                  <p className="mt-1 text-3xl font-bold text-white">7 days</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-300">
                  🔥
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                Keep the streak going by completing a short quiz or revision session each day.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-200">Next milestone</p>
                  <p className="mt-1 text-3xl font-bold text-white">Finish Chapter 5</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
                  🎯
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                You’re close—just 3 more topics to complete before unlocking the next quiz set.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
