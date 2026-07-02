"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';
import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs,
  SiPython, SiVercel, SiFigma, SiTailwindcss, SiFirebase
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

const technologies = [
  { name: 'Next.js', icon: <SiNextdotjs size={28} /> },
  { name: 'React', icon: <SiReact size={28} /> },
  { name: 'TypeScript', icon: <SiTypescript size={28} /> },
  { name: 'Node.js', icon: <SiNodedotjs size={28} /> },
  { name: 'Firebase', icon: <SiFirebase size={28} /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={28} /> },
  { name: 'Python', icon: <SiPython size={28} /> },
  { name: 'AWS', icon: <FaAmazon size={28} /> },
  { name: 'Vercel', icon: <SiVercel size={28} /> },
  { name: 'Figma', icon: <SiFigma size={28} /> },
];

const TechPill = ({ tech }: { tech: (typeof technologies)[0] }) => (
  <div className="flex items-center gap-3 bg-brand-surface border border-brand-border px-6 py-4 rounded-2xl flex-shrink-0 group hover:border-brand-accent/30 hover:bg-[#181818] transition-colors duration-300">
    <span className="text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-300">
      {tech.icon}
    </span>
    <span className="text-sm font-semibold font-display text-brand-text-secondary group-hover:text-brand-text-primary transition-colors duration-300 whitespace-nowrap">
      {tech.name}
    </span>
  </div>
);

// Fila de marquee: el contenido se repite 4x para cubrir monitores anchos;
// translateX(-50%) cae en un múltiplo exacto del patrón, así el loop es continuo.
const MarqueeRow = ({ items, reverse = false }: { items: typeof technologies; reverse?: boolean }) => (
  <div className={`flex gap-4 pr-4 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
    {[...items, ...items, ...items, ...items].map((tech, i) => (
      <TechPill key={`${tech.name}-${i}`} tech={tech} />
    ))}
  </div>
);

const TechStackSection = () => {
  const rowA = technologies.slice(0, 5);
  const rowB = technologies.slice(5);

  return (
    <section id="tech-stack" className="bg-brand-dark py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-14"
        >
          <TerminalPrompt command="npm list --stack" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary">
            Stack Tecnológico
          </h2>
        </motion.div>
      </div>

      {/* Marquee full-bleed con fades laterales */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative marquee-paused space-y-4"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-brand-dark to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-brand-dark to-transparent z-10" />

        <div className="overflow-hidden">
          <MarqueeRow items={rowA} />
        </div>
        <div className="overflow-hidden">
          <MarqueeRow items={rowB} reverse />
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackSection;
