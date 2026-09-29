"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const steps = [
  {
    title: "Relevamiento",
    description: "Hablamos de tu negocio, cómo trabajan hoy y qué querés lograr. Si hay planillas o procesos manuales, los veo de cerca.",
    result: "Objetivos claros",
  },
  {
    title: "Propuesta y diseño",
    description: "Te presento qué voy a construir, en qué orden y cuánto sale. Diseñamos juntos las pantallas antes de programar.",
    result: "Alcance y presupuesto cerrados",
  },
  {
    title: "Desarrollo",
    description: "Construyo por etapas y te muestro avances reales para que pruebes y opines durante todo el proceso.",
    result: "Versiones para probar",
  },
  {
    title: "Lanzamiento y soporte",
    description: "Publicamos, capacito a quien lo vaya a usar y sigo disponible para ajustes y mejoras.",
    result: "En uso desde el día uno",
  },
];

const MethodologySection = () => (
  <section id="methodology" className="bg-brand-dark py-24">
    <div className="container mx-auto px-6">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <TerminalPrompt command="cat metodologia.md" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary mb-4">
          Cómo trabajo
        </h2>
        <p className="text-brand-text-secondary text-lg leading-relaxed">
          Cuatro pasos, del primer mensaje a un sistema funcionando. Siempre sabés en qué etapa estamos.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Línea conectora: horizontal en desktop, vertical en mobile */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute top-5 left-5 right-5 h-px origin-left bg-gradient-to-r from-brand-accent/50 via-brand-accent/25 to-transparent hidden lg:block"
          aria-hidden="true"
        />
        <div
          className="absolute top-5 bottom-5 left-5 w-px bg-gradient-to-b from-brand-accent/50 via-brand-accent/20 to-transparent lg:hidden"
          aria-hidden="true"
        />

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={itemVariants}
              className="relative pl-16 lg:pl-0"
            >
              <span className="absolute left-0 top-0 lg:static flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark border border-brand-accent/60 text-brand-accent font-display font-bold text-sm tabular-nums lg:mb-6">
                {i + 1}
              </span>
              <h3 className="text-lg font-bold font-display text-brand-text-primary mb-2 lg:pt-0 pt-2">
                {step.title}
              </h3>
              <p className="text-brand-text-secondary text-sm leading-relaxed mb-4 max-w-[46ch]">
                {step.description}
              </p>
              <p className="font-mono text-xs text-brand-accent/90">→ {step.result}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  </section>
);

export default MethodologySection;
