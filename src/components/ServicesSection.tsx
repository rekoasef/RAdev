"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
// NUEVO: Importamos los iconos que vamos a usar
import { Target, FileEdit } from 'lucide-react';

// MODIFICADO: El componente ServiceCard ahora acepta un 'icon'
const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  // Añadimos 'group' para que el hover sobre la tarjeta afecte al icono
  <div className="group bg-brand-surface p-8 rounded-lg shadow-lg h-full transition-all duration-300 hover:!shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2">
    {/* NUEVO: Contenedor del icono */}
    <div className="text-brand-accent mb-4 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brand-text-primary mb-3">{title}</h3>
    <p className="text-brand-text-secondary">{description}</p>
  </div>
);

const ServicesSection = () => {
  // NUEVO: Definimos las animaciones de entrada lateral personalizadas
  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-brand-dark py-20 overflow-x-hidden"> {/* Añadimos overflow-x-hidden para que no se vean las tarjetas antes de entrar */}
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
          {/* MODIFICADO: Aplicamos la animación de entrada desde la izquierda */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
          >
            <ServiceCard
              icon={<Target size={40} />} // Icono para "Landing Pages"
              title="Landing Pages de Alto Impacto"
              description="Páginas de aterrizaje optimizadas para la conversión, diseñadas para captar la atención y guiar al usuario hacia la acción."
            />
          </motion.div>

          {/* MODIFICADO: Aplicamos la animación de entrada desde la derecha */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ServiceCard
              icon={<FileEdit size={40} />} // Icono para "Páginas Autogestionables"
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