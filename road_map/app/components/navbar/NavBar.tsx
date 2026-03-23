"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import Button from "@/app/components/ui/Button";
import ResetProgress from "@/app/components/ResetProgress";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="bg-black/90 border-b border-white/10 px-6 py-4 text-white backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          LearnPlatform
        </Link>

        <div className="flex flex-wrap items-center gap-4">

          {/* Public Links */}
          <Link
            href="/about"
            className="text-sm font-medium text-gray-200 transition hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-200 transition hover:text-white"
          >
            Contact
          </Link>

          {/* Learn Button */}
          {session && (
            <Button
              variant="nav"
              className="px-4 py-2 text-sm"
              onClick={() => router.push("/learn")}
            >
              Learn
            </Button>
          )}

          {/* Admin Link */}
          {session && isAdmin && (
            <Link
              href="/admin"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-white"
            >
              Admin
            </Link>
          )}

          {/* User Dashboard */}
          {session && (
            <Link
              href="/user/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-white"
            >
              Dashboard
            </Link>
          )}

          {/* Login if not authenticated */}
          {!session && (
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-white"
            >
              Login
            </Link>
          )}
          <div className="flex items-center gap-3">
            <ResetProgress />
          </div>
          {session && <ProfileDropdown />}

        </div>
      </div>
    </nav>
  );
}