"use client"; // Importante agregar esto porque HeroBackground usa hooks
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import HeroBackground from "@/components/HeroBackground"; // Importamos el fondo
import { projects } from "@/data/projects"; 

export default function AllProjectsPage() {
return (
    <main className="bg-brand-dark min-h-screen flex flex-col relative">
    <Header />
    
      {/* 1. Agregamos el fondo interactivo aquí */}
    <HeroBackground />
    
      {/* 2. Añadimos 'relative z-10' para que el contenido flote SOBRE las partículas */}
    <section className="container mx-auto px-6 py-24 flex-grow relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary mb-6">
            Portafolio Completo
        </h1>
        <p className="text-xl text-brand-text-secondary">
            Una colección exhaustiva de los proyectos donde he aplicado mi metodología de desarrollo ágil asistida por IA.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
        ))}
        </div>
    </section>

      {/* Footer también necesita estar por encima del fondo */}
    <div className="relative z-10">
        <Footer />
    </div>
    </main>
);
}