"use client";

import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      
      <Link href="/admin" className="text-sm font-medium">
        Home
      </Link>

      
      <button
        type="button"
        onClick={() => {
          console.log("Logout clicked");
        }}
        className="text-sm"
      >
        Logout
      </button>
    </header>
  );
}
