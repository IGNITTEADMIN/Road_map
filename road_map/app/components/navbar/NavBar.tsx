//./app/components/navbar/NavBar.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);

  const buttonClass =
  "w-full text-left text-lg font-semibold px-5 py-2 rounded-lg hover:bg-white/10 transition text-white";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0b0f1a] via-[#0f172a] to-[#111827] border-b border-blue-500/10 px-4 py-2 shadow-lg">
      
      <div className="flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/Logo_IGNITTE.png"
            alt="logo"
            className="h-10 w-10 object-contain"
          />

          <div className="flex flex-col leading-tight">
            <Link href="/" className="text-lg font-bold text-white">
              Roadmap
            </Link>
            <span className="text-[10px] text-gray-400">
              Structured JEE Prep Platform
            </span>
          </div>
        </div>

        {/* RIGHT: Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/about" className={buttonClass}>About</Link>
          <Link href="/contact" className={buttonClass}>Contact</Link>

          {session && (
            <button className={buttonClass} onClick={() => router.push("/learn")}>
              Learn
            </button>
          )}

          {session && isAdmin && (
            <Link href="/admin" className={buttonClass}>Admin</Link>
          )}

          {session && isAdmin && (
            <Link href="/admin/analyse" className={buttonClass}>Analyse</Link>
          )}

          {session && (
            <Link href="/user/dashboard" className={buttonClass}>
              Dashboard
            </Link>
          )}

          {!session && (
            <Link href="/login" className={buttonClass}>Login</Link>
          )}

          {session && <ProfileDropdown />}
        </div>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
  <div className="md:hidden mt-3 flex flex-col items-start gap-2 bg-black/80 p-3 rounded-xl">
    
    <Link href="/about" className={buttonClass}>About</Link>
    <Link href="/contact" className={buttonClass}>Contact</Link>

    {session && (
      <button className={buttonClass} onClick={() => router.push("/learn")}>
        Learn
      </button>
    )}

    {session && isAdmin && (
      <Link href="/admin" className={buttonClass}>Admin</Link>
    )}

    {session && isAdmin && (
      <Link href="/admin/analyse" className={buttonClass}>Analyse</Link>
    )}

    {session && (
      <Link href="/user/dashboard" className={buttonClass}>
        Dashboard
      </Link>
    )}

    {!session && (
      <Link href="/login" className={buttonClass}>Login</Link>
    )}

    {session && (
      <div className="w-full">
        <ProfileDropdown />
      </div>
    )}
  </div>
)}
    </nav>
  );
}