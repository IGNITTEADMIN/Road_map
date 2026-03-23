"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">About LearnPlatform</h1>

          <p className="mt-4 text-gray-200">
            LearnPlatform is a structured learning system designed to help students
            navigate their preparation with clarity. Users can explore subjects,
            follow topic roadmaps, and practice with quizzes while administrators
            manage and organize educational content.
          </p>

          <p className="mt-4 text-gray-200">
            The platform focuses on making complex subjects easier to approach by
            breaking them into clear learning paths and tracking progress over time.
          </p>

          <p className="mt-4 text-gray-200">
            Built using <span className="text-orange-400">Next.js</span>,{" "}
            <span className="text-orange-400">NextAuth</span>, and{" "}
            <span className="text-orange-400">Drizzle ORM</span>.
          </p>

          {/* Initiative Section */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-semibold text-white">
              An Initiative by Ignitte Teaching Club
            </h2>

            <p className="mt-4 max-w-2xl text-gray-300">
              This platform is built as part of an initiative by the Ignitte
              Teaching Club at NIT Trichy. Ignitte is a student-led organization
              dedicated to making education, mentorship, and career guidance more
              accessible to learners.
            </p>

            <p className="mt-4 max-w-2xl text-gray-300">
              The club works across multiple initiatives including technical
              mentorship, educational platforms, and career guidance programs
              aimed at helping students achieve their academic goals.
            </p>

            {/* Meet the Team Button */}
            <a
              href="https://ignitte.org/team/"
              target="_blank"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ff6b00] px-6 py-3 font-semibold text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-500"
            >
              👥 Meet the Ignitte Team
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}