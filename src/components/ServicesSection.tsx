"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
// AGREGAMOS: BarChart3 para dashboards y Database para sistemas
import { Target, FileEdit, BarChart3, Database } from 'lucide-react';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group bg-brand-surface p-8 rounded-lg shadow-lg h-full transition-all duration-300 hover:shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2 border border-white/5">
    <div className="text-brand-accent mb-4 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brand-text-primary mb-3">{title}</h3>
    <p className="text-brand-text-secondary">{description}</p>
  </div>
);

const ServicesSection = () => {
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

        {/* CAMBIO: Aumentamos max-w-4xl a max-w-5xl para que la grilla 2x2 tenga más espacio */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Tarjeta 1: Landing Pages */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<Target size={40} />}
              title="Landing Pages de Alto Impacto"
              description="Páginas de aterrizaje optimizadas para la conversión, diseñadas estratégicamente para captar la atención y guiar al usuario hacia la acción."
            />
          </motion.div>

          {/* Tarjeta 2: Webs Autogestionables */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<FileEdit size={40} />}
              title="Páginas Web Autogestionables"
              description="Sitios web dinámicos conectados a un CMS, permitiéndote actualizar tu contenido de forma sencilla e independiente sin tocar código."
            />
          </motion.div>

          {/* Tarjeta 3: Automatizaciones (NUEVA) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<BarChart3 size={40} />}
              title="Automatización y Dashboards"
              description="Transformo datos en decisiones. Implemento automatizaciones de carga de datos, reportes de KPIs y dashboards interactivos para optimizar tu tiempo."
            />
          </motion.div>

          {/* Tarjeta 4: Sistemas a Medida (NUEVA) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <ServiceCard
              icon={<Database size={40} />}
              title="Sistemas de Gestión a Medida"
              description="Herramientas potentes para tu negocio. Desarrollo sistemas de control de stock, plataformas de inscripciones y gestión interna adaptados a tus flujos."
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;