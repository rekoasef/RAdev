import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import HeroBackground from "@/components/HeroBackground";
import CursorGlow from "@/components/ui/CursorGlow";
import { getAllProjects } from "@/lib/getProjects";

export default async function AllProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="bg-brand-dark min-h-screen flex flex-col relative">
      <CursorGlow />
      <Header />

      <HeroBackground />

      <section className="container mx-auto px-6 py-24 flex-grow relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6">
            Portafolio Completo
          </h1>
          <p className="text-xl text-brand-text-secondary">
            Una colección de los proyectos que he desarrollado para clientes reales, con foco en calidad, velocidad y resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
