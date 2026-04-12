"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/animations';
import { DbProject } from '@/types/project';
import { getIcon } from '@/lib/iconMap';

export const ProjectCard = ({ project }: { project: DbProject }) => (
  <motion.div
    variants={itemVariants}
    className="bg-gradient-to-br from-brand-surface to-brand-dark/50 rounded-lg p-8 flex flex-col h-full shadow-lg hover:shadow-brand-accent/10 transition-shadow duration-300 border border-white/5"
  >
    <div className="flex-shrink-0 mb-6 text-brand-accent">
      {getIcon(project.icon_name)}
    </div>

    <div className="flex-grow flex flex-col">
      <h3 className="text-xl lg:text-2xl font-bold text-brand-text-primary mb-3">{project.title}</h3>

      <div className="mb-4">
        <h4 className="font-semibold text-brand-accent text-sm">Objetivo:</h4>
        <p className="text-brand-text-secondary">{project.objective}</p>
      </div>

      <div className="mt-auto pt-4">
        <h4 className="font-semibold text-brand-text-primary mb-2 text-sm">Tecnologías:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map(tech => (
            <span key={tech} className="bg-brand-dark text-brand-text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="bg-brand-accent text-white font-bold py-2 px-5 rounded-lg text-sm hover:opacity-90 transition-opacity duration-300">
              Ver Proyecto
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
