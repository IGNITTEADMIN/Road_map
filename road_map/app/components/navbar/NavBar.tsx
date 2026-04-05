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
  const buttonClass = "nav-button text-sm font-medium px-5 py-2";

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-3">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          LearnPlatform
        </Link>

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