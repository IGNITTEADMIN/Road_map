//./app/post-login/page.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PostLoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    async function checkProfile() {
      const res = await fetch("/api/user/me");
      const user = await res.json();

      if (!user.profileCompleted) {
        window.location.href = "/profile/setup";
      } else {
        window.location.href = "/user/content";
      }
    }

    checkProfile();
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Redirecting...
    </div>
  );
}