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
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text-primary mb-4">Mi Metodología: El Futuro del Desarrollo, Hoy</h2>
        <p className="text-brand-text-secondary text-lg">
          Mi enfoque combina mi experiencia en estrategia web con las herramientas de Inteligencia Artificial más avanzadas. Este método de desarrollo asistido me permite ofrecer ventajas únicas a mis clientes:
        </p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
      >
        <motion.div variants={itemVariants}><MethodologyCard icon={<Zap size={40} />} title="Velocidad Exponencial">Reducimos los tiempos de desarrollo, permitiéndote lanzar tu proyecto mucho antes.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<DollarSign size={40} />} title="Eficiencia en Costos">La automatización de tareas repetitivas se traduce en un presupuesto más ajustado y accesible para ti.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<Target size={40} />} title="Enfoque en la Estrategia">Dedico mi tiempo a lo más importante: entender tus objetivos, asegurar la calidad y garantizar que el producto final cumpla tus expectativas.</MethodologyCard></motion.div>
        <motion.div variants={itemVariants}><MethodologyCard icon={<BrainCircuit size={40} />} title="Innovación Constante">Trabajo en la frontera de la tecnología para asegurar que tu proyecto sea funcional, moderno y competitivo.</MethodologyCard></motion.div>
      </motion.div>
    </section>
  );
};

export default MethodologySection;