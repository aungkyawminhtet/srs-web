import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { VirtualClassroomSection } from "@/components/home/VirtualClassroomSection";
import { ValuePillars } from "@/components/home/ValuePillars";
import { TutorsSection } from "@/components/home/TutorsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ResourcesSection } from "@/components/home/ResourcesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProgramsSection />
        <VirtualClassroomSection />
        <ValuePillars />
        <TutorsSection />
        <HowItWorks />
        <ResourcesSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
