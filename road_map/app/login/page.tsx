"use client";

import { signIn } from "next-auth/react";
import Button from "@/app/components/ui/Button";

export default function LoginPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-4 text-gray-200">
            Sign in with your Google account to access learning roadmaps, quizzes, and progress tracking.
          </p>

          <Button
            variant="action"
            onClick={() => signIn("google")}
            className="mt-8 !flex !flex-row items-center justify-center gap-3 border border-red-500"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="btn-txt">
              Sign in with Google
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
}

