"use client";

import { ProgressProvider } from "@/src/context/ProgressContext";

export default function UserProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProgressProvider>{children}</ProgressProvider>;
}