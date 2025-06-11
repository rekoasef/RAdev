"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
import { Target, FileEdit } from 'lucide-react';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group bg-brand-surface p-8 rounded-lg shadow-lg h-full transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2">
    <div className="text-brand-accent mb-4 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brand-text-primary mb-3">{title}</h3>
    <p className="text-brand-text-secondary">{description}</p>
  </div>
);

const ServicesSection = () => {
  // NUEVO: Una sola animación de "fade in y slide up" que se verá bien en móvil y en desktop.
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <section className="bg-brand-dark py-20 overflow-x-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-brand-text-primary mb-12"
        >
          Soluciones a tu Medida
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Se aplica la misma animación a ambas tarjetas para un efecto más limpio */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<Target size={40} />}
              title="Landing Pages de Alto Impacto"
              description="Páginas de aterrizaje optimizadas para la conversión, diseñadas para captar la atención y guiar al usuario hacia la acción."
            />
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<FileEdit size={40} />}
              title="Páginas Web Autogestionables"
              description="Sitios web completos y dinámicos, conectados a un CMS para que puedas actualizar tu contenido de forma sencilla e independiente."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;