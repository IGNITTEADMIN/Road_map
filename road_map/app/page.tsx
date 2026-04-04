//./app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/navbar/NavBar";

import HeroSection from "@/app/components/landing/HeroSection";
import SubjectSection from "@/app/components/landing/SubjectSection";
import FeaturesSection from "@/app/components/landing/FeaturesSection";
import ProgressSection from "@/app/components/landing/ProgressSection";
import HowItWorksSection from "@/app/components/landing/HowItWorksSection";
import InitiativeSection from "@/app/components/landing/InitiativeSection";
import CTASection from "@/app/components/landing/CTASection";
import Footer from "@/app/components/landing/Footer";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user?.role === "admin") {
      redirect("/admin");
    } else {
      redirect("/user");
    }
  }

  return (
    <>

      <main className="bg-[#f8f9fa] flex flex-col">
        <HeroSection />
        <SubjectSection />
        <FeaturesSection />
        <ProgressSection />
        <HowItWorksSection />
        <InitiativeSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}