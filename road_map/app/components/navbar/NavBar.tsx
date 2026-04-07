"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const isAdmin = session?.user?.role === "admin";

  // Common button style
  const buttonClass = "nav-button text-sm font-medium px-5 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0b0f1a] via-[#0f172a] to-[#111827] backdrop-blur-md border-b border-blue-500/10 px-6 py-1 shadow-lg">
      <div className="w-full flex items-center justify-between">
        
        <div className="flex items-center gap-3">
  <img src="/Logo_IGNITTE.png" alt="Ignitte Logo" className="h-16 w-16" />

  <div className="flex flex-col">
    <Link
      href="/"
      className="text-2xl font-bold text-white tracking-tight hover:text-white-300 transition-colors"
    >
      Roadmap
    </Link>

    <p className="text-xs text-gray-300">
      Structured JEE Prep Platform
    </p>
  </div>
</div>

        {/* Links & Actions */}
        <div className="flex items-center gap-4">

          {/* Public Links */}
          <Link href="/about" className={buttonClass}>
            About
          </Link>

          <Link href="/contact" className={buttonClass}>
            Contact
          </Link>

          {/* Learn Button */}
          {session && (
            <button
              className={buttonClass}
              onClick={() => router.push("/learn")}
            >
              Learn
            </button>
          )}

          {/* Admin Link */}
          {session && isAdmin && (
            <Link href="/admin" className={buttonClass}>
              Admin
            </Link>
          )}

          {/* User Dashboard */}
          {session && (
            <Link href="/user/dashboard" className={buttonClass}>
              Dashboard
            </Link>
          )}

          {/* Login */}
          {!session && (
            <Link href="/login" className={buttonClass}>
              Login
            </Link>
          )}

          {/* Profile */}
          {session && <ProfileDropdown />}
        </div>
      </div>
    </nav>
  );
}