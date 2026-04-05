//./app/SessionProviderWrapper.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "@/app/components/navbar/NavBar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  
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