"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function ContinueLearning() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Button variant="page" onClick={() => router.push("/learn")}>
        Continue Learning →
      </Button>
    </div>
  );
}