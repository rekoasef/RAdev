"use client";
import React from 'react';
import Link from 'next/link';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { containerVariants, titleVariants } from '@/utils/animations';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  // CAMBIO IMPORTANTE: Ahora mostramos solo los primeros 2 proyectos (Bossio y Mimate)
  const featuredProjects = projects.slice(0, 2);

  return (
    <section id="projects" className="bg-brand-dark py-20">
      <div className="container mx-auto px-6">
        <motion.h2 
          variants={titleVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.5 }} 
          className="text-3xl md:text-4xl font-bold text-center text-brand-text-primary mb-12"
        >
          Proyectos Destacados
        </motion.h2>
        
        {/* Ajustamos el grid para que se vea bien con 2 elementos (centrados en pantallas grandes) */}
        <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {featuredProjects.map(project => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/proyectos" 
            className="inline-flex items-center justify-center border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-accent hover:text-white transition-all duration-300"
          >
            Ver todos los proyectos
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;