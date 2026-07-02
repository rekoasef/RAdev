"use client";
import React from 'react';
import { Zap, DollarSign, Target, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Tilt from '@/components/ui/Tilt';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const methods = [
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Procesos y herramientas definidos para lanzar tu proyecto en tiempo récord sin comprometer la calidad.",
  },
  {
    icon: DollarSign,
    title: "Inversión Inteligente",
    description: "Cada funcionalidad tiene un propósito claro. Sin features innecesarias, sin costos extras.",
  },
  {
    icon: Target,
    title: "Centrado en Resultados",
    description: "Entiendo tus objetivos antes de escribir una línea de código. El producto está diseñado para tus metas reales.",
  },
  {
    icon: BrainCircuit,
    title: "Tecnología Moderna",
    description: "Uso el stack más actual del mercado para garantizar que tu proyecto sea rápido, seguro y escalable.",
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
          Cada proyecto combina diseño cuidado, código limpio y foco en resultados reales para tu negocio.
        </p>
      </motion.div>

      {/* Línea conectora que se dibuja al entrar */}
      <div className="relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute -top-6 left-[8%] right-[8%] h-px origin-left bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent hidden lg:block"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {methods.map((method, i) => {
          const Icon = method.icon;
          return (
            <motion.div key={i} variants={itemVariants} className="group h-full">
              <Tilt className="h-full">
              <SpotlightCard className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center transition-all duration-300 group-hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-accent-glow-sm h-full">
                <span className="absolute top-4 right-5 text-brand-text-secondary/25 font-display font-bold text-sm select-none" aria-hidden="true">
                  0{i + 1}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: "backOut" }}
                  className="w-14 h-14 rounded-xl bg-brand-accent/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-accent/15 transition-colors duration-300"
                >
                  <Icon size={26} className="text-brand-accent" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-bold font-display text-brand-text-primary mb-2">{method.title}</h3>
                <p className="text-brand-text-secondary text-sm leading-relaxed">{method.description}</p>
              </SpotlightCard>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default MethodologySection;
