import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CursorGlow from "@/components/ui/CursorGlow";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologySection from "@/components/MethodologySection";
import ProjectsSection from "@/components/ProjectsSection";
import PrivateWorkSection from "@/components/PrivateWorkSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <CursorGlow />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MethodologySection />
      <ProjectsSection />
      <PrivateWorkSection />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
