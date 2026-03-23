"use client";

import StatsCards from "@/app/components/dashboard/StatsCards";
import StreakCard from "@/app/components/dashboard/StreakCard";
import NextMilestone from "@/app/components/dashboard/NextMilestone";
import ContinueLearning from "@/app/components/dashboard/ContinueLearning";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatsCards />
      <StreakCard />
      <NextMilestone />
      <ContinueLearning />
    </div>
  );
}