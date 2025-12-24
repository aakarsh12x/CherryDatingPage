"use client";

import HeroSection from "@/components/HeroSection";
import ValuePropSection from "@/components/ValuePropSection";
import SignupForm from "@/components/SignupForm";
import SocialProofSection from "@/components/SocialProofSection";
import FeatureTeasers from "@/components/FeatureTeasers";
import NarrativeSection from "@/components/NarrativeSection";
import TeamSection from "@/components/TeamSection";
import PressSection from "@/components/PressSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-lightBackground overflow-x-hidden">
      <HeroSection />
      <ValuePropSection />
      <SignupForm />
      <SocialProofSection />
      <FeatureTeasers />
      <NarrativeSection />
      <TeamSection />
      <PressSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
