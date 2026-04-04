"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "@/app/components/ui/Button";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!session) return null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <Button
        className="p-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={() => setOpen(!open)}
        variant="nav"
      >
        <img
          src={session.user?.image || ""}
          alt="profile"
          className="h-10 w-10 rounded-full border-2 border-gray-600 hover:border-orange-500 transition"
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-700 bg-[#1a1a1a] p-5 shadow-2xl z-50 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={session.user?.image || ""}
              alt="profile"
              className="h-12 w-12 rounded-full border border-gray-600"
            />
            <div>
              <p className="text-white font-semibold">{session.user?.name}</p>
              <p className="text-gray-400 text-sm truncate">{session.user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="nav"
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}