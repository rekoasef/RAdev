"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';
// Importamos de 'si' (Simple Icons)
import { 
    SiNextdotjs, 
    SiReact, 
    SiTypescript, 
    SiNodedotjs, 
    SiPython, 
    SiVercel, 
    SiFigma, 
    SiTailwindcss, 
    SiFirebase 
} from 'react-icons/si';
// CORRECCIÓN: Importamos el icono de AWS desde 'fa' (Font Awesome)
import { FaAmazon } from 'react-icons/fa';

const technologies = [
  { name: 'Next.js', icon: <SiNextdotjs size={40} /> },
  { name: 'React', icon: <SiReact size={40} /> },
  { name: 'TypeScript', icon: <SiTypescript size={40} /> },
  { name: 'Node.js', icon: <SiNodedotjs size={40} /> },
  { name: 'Firebase', icon: <SiFirebase size={40} /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={40} /> },
  { name: 'Python', icon: <SiPython size={40} /> },
  // CORRECCIÓN: Usamos el icono importado de 'fa'
  { name: 'AWS', icon: <FaAmazon size={40} /> },
  { name: 'Vercel', icon: <SiVercel size={40} /> },
  { name: 'Figma', icon: <SiFigma size={40} /> },
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="container mx-auto px-6 py-20">
      <motion.h2 
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-brand-text-primary mb-16"
      >
        Tecnologías que Dirijo y Superviso
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
      >
        {technologies.map((tech) => (
          <motion.div 
            key={tech.name} 
            variants={itemVariants}
            className="group"
          >
            <div className="flex flex-col items-center justify-center gap-4 bg-brand-surface p-6 rounded-lg transition-all duration-300 hover:bg-brand-surface/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-accent/10">
              <div className="text-brand-text-secondary transition-colors duration-300 group-hover:text-brand-accent">
                {tech.icon}
              </div>
              <p className="font-bold text-md text-brand-text-secondary transition-colors duration-300 group-hover:text-brand-text-primary">{tech.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStackSection;