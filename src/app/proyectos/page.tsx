import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import CursorGlow from "@/components/ui/CursorGlow";
import ProjectCases from "@/components/ProjectCases";
import PrivateWorkSection from "@/components/PrivateWorkSection";

export default function AllProjectsPage() {
  return (
    <main className="bg-brand-dark min-h-screen flex flex-col relative">
      <CursorGlow />
      <Header />

      <HeroBackground />

      <section className="container mx-auto px-6 pt-24 pb-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-text-primary mb-5">
            Proyectos
          </h1>
          <p className="text-lg text-brand-text-secondary leading-relaxed">
            Sitios, productos y sistemas que diseñé y desarrollé para clientes reales y para mí.
          </p>
        </div>

        <h2 className="sr-only">Sitios y productos</h2>
        <ProjectCases />
      </section>

      <div className="relative z-10">
        <PrivateWorkSection />
      </div>

      <section className="relative z-10 container mx-auto px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-brand-surface border border-brand-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-brand-text-primary mb-2">
              ¿Tenés un proyecto en mente?
            </h2>
            <p className="text-brand-text-secondary">
              Contame qué necesitás y te respondo en menos de 24 hs.
            </p>
          </div>
          <Link
            href="/#contact"
            className="bg-brand-accent text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm hover:bg-[#E55A00] transition-colors duration-300 whitespace-nowrap self-start md:self-auto"
          >
            Hablemos de tu proyecto →
          </Link>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
