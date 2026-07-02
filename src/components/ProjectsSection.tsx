"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import Image from 'next/image';
import { containerVariants, titleVariants, itemVariants } from '@/utils/animations';
import { projects } from '@/data/projects';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Tilt from '@/components/ui/Tilt';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => (
  <motion.div variants={itemVariants} className="group h-full">
    <Tilt className="h-full" max={5}>
    <SpotlightCard
      className="bg-brand-surface border border-brand-border rounded-2xl p-7 h-full transition-all duration-300 hover:border-brand-accent/25 group-hover:-translate-y-1 hover:shadow-accent-glow-sm"
      contentClassName="flex flex-col"
    >
    <div className="flex items-start justify-between mb-5">
      <div className="w-12 h-12 rounded-xl bg-brand-accent/[0.08] flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/15 transition-colors duration-300">
        {project.icon}
      </div>
      <span className="text-xs font-semibold text-brand-text-secondary bg-brand-surface-2 px-2.5 py-1 rounded-full border border-brand-border">
        {project.type}
      </span>
    </div>

    <h3 className="text-lg font-bold font-display text-brand-text-primary mb-2">{project.title}</h3>
    <p className="text-brand-text-secondary text-sm leading-relaxed mb-5 flex-grow">{project.objective}</p>

    <div className="mt-auto space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {project.supervisedTech.map(tech => (
          <span key={tech} className="bg-brand-dark text-brand-text-secondary text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border">
            {tech}
          </span>
        ))}
      </div>
      {project.liveUrl && project.liveUrl !== '#' && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
        >
          Ver Proyecto <ExternalLink size={14} />
        </a>
      )}
    </div>
    </SpotlightCard>
    </Tilt>
  </motion.div>
);

const ProjectsSection = () => (
  <section id="projects" className="relative bg-brand-dark py-24 overflow-hidden">

    {/* ── RADEV1 BG IMAGE ── */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.07, 1], x: [0, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/radev1.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60" />
    </div>
    <div className="relative z-10 container mx-auto px-6">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-14"
      >
        <TerminalPrompt command="git log --proyectos" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary">
          Proyectos Destacados
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
      >
        {projects.map(project => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 border border-brand-accent/50 text-brand-accent font-bold py-3 px-8 rounded-xl text-sm hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
        >
          <Code2 size={16} /> Ver todos los proyectos
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
