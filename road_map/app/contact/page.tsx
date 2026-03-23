"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Have questions about the platform or want to connect with the Ignitte Teaching Club?
            Reach out to us through the channels below.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-6 text-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                  📧
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="mt-1 text-sm text-gray-300">ignittetechnical@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                  🌐
                </div>
                <div>
                  <p className="font-semibold text-white">Official website</p>
                  <p className="mt-1 text-sm text-gray-300">
                    <a
                      href="https://ignitte.org/"
                      target="_blank"
                      className="text-orange-400 hover:text-orange-300"
                    >
                      ignitte.org
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                  🎓
                </div>
                <div>
                  <p className="font-semibold text-white">Kalvithadam</p>
                  <p className="mt-1 text-sm text-gray-300">
                    <a
                      href="https://kalvithadam.ignitte.org/"
                      target="_blank"
                      className="text-orange-400 hover:text-orange-300"
                    >
                      kalvithadam.ignitte.org
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Ignitte’s career guidance initiative helping students explore academic and career paths.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-200">
              <p className="text-lg font-semibold text-white">Follow IGNITTE</p>

              <div className="grid gap-4">
                <a
                  href="https://instagram.com/ignitte.nitt"
                  target="_blank"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-orange-500 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                    📸
                  </span>
                  <span className="text-sm font-medium text-gray-200">Instagram – @ignitte.nitt</span>
                </a>

                <a
                  href="https://facebook.com/ignitte.nitt"
                  target="_blank"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-orange-500 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                    📘
                  </span>
                  <span className="text-sm font-medium text-gray-200">Facebook – ignitte.nitt</span>
                </a>

                <a
                  href="https://x.com/ignitte_nitt"
                  target="_blank"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-orange-500 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                    🐦
                  </span>
                  <span className="text-sm font-medium text-gray-200">X / Twitter – ignitte_nitt</span>
                </a>

                <a
                  href="https://linkedin.com/company/ignitte"
                  target="_blank"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-orange-500 hover:bg-white/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-2xl text-orange-300">
                    💼
                  </span>
                  <span className="text-sm font-medium text-gray-200">LinkedIn – Ignitte Teaching Club</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}