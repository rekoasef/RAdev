import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologySection from "@/components/MethodologySection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getFeaturedProjects } from "@/lib/getProjects";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <ProjectsSection projects={featuredProjects} />
      <TechStackSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
