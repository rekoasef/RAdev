"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { projectsInDev } from '@/data/projects';

const DevCard = ({ project, index }: { project: (typeof projectsInDev)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4 hover:border-brand-accent/20 hover:bg-white/[0.05] transition-all duration-300"
  >
    {/* Header row */}
    <div className="flex items-start justify-between gap-3">
      <div className="w-11 h-11 rounded-xl bg-brand-accent/[0.08] flex items-center justify-center text-brand-accent flex-shrink-0 group-hover:bg-brand-accent/15 transition-colors duration-300">
        {project.icon}
      </div>

      {/* En Progreso badge */}
      <div className="flex items-center gap-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full px-3 py-1 flex-shrink-0">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0"
        />
        <span className="text-brand-accent text-[11px] font-bold tracking-wide uppercase">En progreso</span>
      </div>
    </div>

    {/* Content */}
    <div className="flex-grow">
      <span className="text-brand-text-secondary text-[11px] font-semibold tracking-widest uppercase">
        {project.type}
      </span>
      <h3 className="text-brand-text-primary font-bold font-display text-base mt-1 mb-2 leading-snug">
        {project.title}
      </h3>
      <p className="text-brand-text-secondary text-sm leading-relaxed">
        {project.description}
      </p>
    </div>

    {/* Tech pills */}
    <div className="flex flex-wrap gap-1.5 mt-1">
      {project.supervisedTech.map(tech => (
        <span
          key={tech}
          className="bg-brand-dark/80 text-brand-text-secondary text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.07]"
        >
          {tech}
        </span>
      ))}
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
);

const ProjectsInDevelopmentSection = () => (
  <section className="relative py-24 overflow-hidden bg-brand-dark">

    {/* ── RADEV BG IMAGE ── */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.07, 1], x: [0, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/radev.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.2]"
          aria-hidden="true"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60" />
    </div>

    {/* ── GLOW SUTIL ── */}
    <motion.div
      animate={{ opacity: [0.04, 0.09, 0.04] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-accent rounded-full blur-[160px] pointer-events-none"
    />

    <div className="relative z-10 container mx-auto px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">Lo que viene</p>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary mb-4">
          Proyectos en Desarrollo
        </h2>
        <p className="text-brand-text-secondary text-base max-w-[520px] mx-auto leading-relaxed">
          Ideas y productos que estoy construyendo actualmente. Algunos serán lanzados como servicios, otros como templates reutilizables.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {projectsInDev.map((project, index) => (
          <DevCard project={project} index={index} key={project.id} />
        ))}
      </div>

    </div>
  </section>
);

export default ProjectsInDevelopmentSection;
