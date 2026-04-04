// app/user/dashboard/page.tsx
"use client";

import StatsCards from "@/app/components/dashboard/StatsCards";
import StreakCard from "@/app/components/dashboard/StreakCard";
import NextMilestone from "@/app/components/dashboard/NextMilestone";
import ContinueLearning from "@/app/components/dashboard/ContinueLearning";
import SubjectProgress from "@/app/components/dashboard/SubjectProgress";
import ClusterProgress from "@/app/components/dashboard/ClusterProgress";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <StatsCards />
      <SubjectProgress />
      <ClusterProgress />
      <StreakCard />
      <NextMilestone />
      <ContinueLearning />
    </div>
  );
}