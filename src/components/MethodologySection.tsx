"use client";
import React from 'react';
import { Zap, DollarSign, Target, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';

const MethodologyCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-brand-surface/50 p-6 rounded-lg flex flex-col items-center text-center h-full transition-all duration-300 hover:!shadow-lg hover:shadow-brand-accent/10 hover:-translate-y-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
          className="text-brand-accent mb-4"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-brand-text-primary mb-2">{title}</h3>
        <p className="text-brand-text-secondary">{children}</p>
    </div>
);

const MethodologySection = () => {
  return (
    <section id="methodology" className="container mx-auto px-6 py-20">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text-primary mb-4">Cómo trabajo</h2>
        <p className="text-brand-text-secondary text-lg">
          Cada proyecto que desarrollo combina diseño cuidado, código limpio y foco en resultados. Así me aseguro de que lo que construimos juntos cumpla con tus objetivos reales.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
      >
        <motion.div variants={itemVariants}><MethodologyCard icon={<Zap size={40} />} title="Entrega Rápida">Tengo procesos y herramientas bien definidos para lanzar tu proyecto en tiempo récord sin comprometer la calidad.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<DollarSign size={40} />} title="Inversión Inteligente">Cada funcionalidad que construyo tiene un propósito claro. Sin features innecesarias, sin costos extras.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<Target size={40} />} title="Centrado en Resultados">Entiendo tus objetivos antes de escribir una línea de código. El producto final está diseñado para cumplir tus metas reales.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<BrainCircuit size={40} />} title="Tecnología Moderna">Uso el stack más actual del mercado para garantizar que tu proyecto sea rápido, seguro y fácil de escalar.</MethodologyCard></motion.div>
      </motion.div>
    </section>
  );
};

export default MethodologySection;