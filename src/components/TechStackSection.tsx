"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';
import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs,
  SiPython, SiVercel, SiFigma, SiTailwindcss, SiFirebase
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

const technologies = [
  { name: 'Next.js', icon: <SiNextdotjs size={36} /> },
  { name: 'React', icon: <SiReact size={36} /> },
  { name: 'TypeScript', icon: <SiTypescript size={36} /> },
  { name: 'Node.js', icon: <SiNodedotjs size={36} /> },
  { name: 'Firebase', icon: <SiFirebase size={36} /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={36} /> },
  { name: 'Python', icon: <SiPython size={36} /> },
  { name: 'AWS', icon: <FaAmazon size={36} /> },
  { name: 'Vercel', icon: <SiVercel size={36} /> },
  { name: 'Figma', icon: <SiFigma size={36} /> },
];

const TechStackSection = () => (
  <section id="tech-stack" className="bg-brand-dark py-24">
    <div className="container mx-auto px-6">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-16"
      >
        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">Tecnologías</p>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary">
          Stack Tecnológico
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {technologies.map((tech) => (
          <motion.div key={tech.name} variants={itemVariants} className="group">
            <div className="flex flex-col items-center justify-center gap-3 bg-brand-surface border border-brand-border p-6 rounded-2xl transition-all duration-300 hover:border-brand-accent/25 hover:bg-[#181818] hover:-translate-y-1 hover:shadow-accent-glow-sm">
              <div className="text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-300">
                {tech.icon}
              </div>
              <p className="text-sm font-semibold font-display text-brand-text-secondary group-hover:text-brand-text-primary transition-colors duration-300">
                {tech.name}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TechStackSection;
