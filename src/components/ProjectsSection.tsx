"use client";
import React from 'react';
import { projects, Project } from '../data/projects';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';

// NUEVO Y ÚNICO DISEÑO DE TARJETA
const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-gradient-to-br from-brand-surface to-brand-dark/50 rounded-lg p-8 flex flex-col h-full shadow-lg hover:shadow-brand-accent/10 transition-shadow duration-300 border border-white/5"
  >
    <div className="flex-shrink-0 mb-6 text-brand-accent">
      {project.icon}
    </div>
    
    <div className="flex-grow flex flex-col">
      <h3 className="text-xl lg:text-2xl font-bold text-brand-text-primary mb-3">{project.title}</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold text-brand-accent text-sm">Objetivo:</h4>
        <p className="text-brand-text-secondary">{project.objective}</p>
      </div>

      <div className="mt-auto pt-4">
        <h4 className="font-semibold text-brand-text-primary mb-2 text-sm">Tecnologías Supervisadas:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.supervisedTech.map(tech => (
            <span key={tech} className="bg-brand-dark text-brand-text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-brand-accent text-white font-bold py-2 px-5 rounded-lg text-sm hover:opacity-90 transition-opacity duration-300">
            Ver Proyecto
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-brand-dark py-20">
      <div className="container mx-auto px-6">
        <motion.h2 variants={titleVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-3xl md:text-4xl font-bold text-center text-brand-text-primary mb-12">
          Casos de Estudio: Proyectos Dirigidos
        </motion.h2>
        
        {/* Usamos un grid de 3 columnas para el nuevo diseño, se verá más equilibrado */}
        <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map(project => (
             <ProjectCard project={project} key={project.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;