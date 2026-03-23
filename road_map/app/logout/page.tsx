"use client";

import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/Button";

export default function LogoutButton() {
  return (
    <main className="bg-black min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-bold">Logout</h1>
          <p className="mt-4 text-gray-200">
            Click below to sign out and secure your account.
          </p>

          <Button variant="page" onClick={() => signOut()} className="mt-8">
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
}