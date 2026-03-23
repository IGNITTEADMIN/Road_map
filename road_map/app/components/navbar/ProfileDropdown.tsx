"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "@/app/components/ui/Button";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) return null;

  return (
    <div className="relative">
      
      {/* Avatar Button */}
      <Button
        className="p-0"
        onClick={() => setOpen(!open)}
        variant="nav"
      >
        <img
          src={session.user?.image || ""}
          alt="profile"
          className="h-9 w-9 rounded-full border border-gray-600"
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 rounded-xl border border-gray-700 bg-[#111111] p-4 shadow-lg">

          <p className="text-sm font-semibold text-white">
            {session.user?.name}
          </p>

          <p className="text-xs text-gray-400 mb-4">
            {session.user?.email}
          </p>

          <Button
            variant="nav"
            className="w-full"
            onClick={() => signOut()}
          >
            Logout
          </Button>

        </div>
      )}
    </div>
  );
}