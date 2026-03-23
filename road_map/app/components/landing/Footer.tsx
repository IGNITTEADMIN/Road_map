export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">About</h3>
          <p className="max-w-sm text-sm text-gray-300">
            A student-built platform by the Ignitte Teaching Club, NIT Trichy, helping you navigate JEE prep with clarity and confidence.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="text-sm text-gray-300">ignitte@nitt.edu</p>
          <p className="text-sm text-gray-300">NIT Tiruchirappalli</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Ignite Teaching Club</h3>
          <p className="max-w-sm text-sm text-gray-300">
            A community of learners and mentors working to make competitive exam prep accessible for everyone.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ignite Teaching Club • All rights reserved.
      </div>
    </footer>
  );
}
