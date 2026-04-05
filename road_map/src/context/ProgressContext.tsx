"use client";

import { createContext, useContext } from "react";
import { useProgress } from "@/src/hooks/useProgress";

const ProgressContext = createContext<any>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progressData = useProgress();

  return (
    <ProgressContext.Provider value={progressData}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  return useContext(ProgressContext);
}