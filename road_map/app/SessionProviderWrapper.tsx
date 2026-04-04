"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "@/app/components/navbar/NavBar";
import { getUserId, updateLastLogin } from "@/src/utils/progress";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  useEffect(() => {
      const userId = getUserId();
      if (userId) {
        updateLastLogin(userId);
      }
    }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}