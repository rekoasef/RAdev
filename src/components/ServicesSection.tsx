"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const services = [
  {
    title: "Sitios Web",
    description: "Webs rápidas y a medida que presentan tu negocio y generan consultas desde cualquier dispositivo.",
    tags: ["Institucionales", "Landing pages", "SEO"],
  },
  {
    title: "Sistemas de Gestión",
    description: "Plataformas a medida que reemplazan planillas de Excel, con usuarios, permisos y datos en tiempo real.",
    tags: ["Paneles", "Stock y pedidos", "Reportes"],
  },
  {
    title: "Automatizaciones con IA",
    description: "Procesos manuales que pasan a hacerse solos: mensajes de WhatsApp, mails, reportes y carga de datos.",
    tags: ["WhatsApp", "Mails", "Carga de datos"],
  },
  {
    title: "Catálogos y Tiendas",
    description: "Tu catálogo online, fácil de actualizar, con consultas y ventas directas por WhatsApp.",
    tags: ["Autogestionable", "Ventas por WhatsApp"],
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const ServicesSection = () => {
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="bg-brand-dark py-24 overflow-x-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20">

        {/* Encabezado: fijo a la izquierda en desktop mientras se recorre la lista */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <TerminalPrompt command="radev --servicios" />
          <h2 className="text-3xl md:text-5xl font-bold font-display text-brand-text-primary tracking-tight leading-[1.1]">
            Qué puedo hacer<br className="hidden md:block" /> por tu negocio
          </h2>
          <p className="text-brand-text-secondary text-lg leading-relaxed mt-5 max-w-md">
            Desde tu primera web hasta el sistema con el que manejás el día a día.
            ¿Tenés un proyecto en mente? Te respondo en menos de 24 hs.
          </p>
          <button
            onClick={scrollToContact}
            className="mt-8 inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm hover:bg-[#E55A00] hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Hablemos de tu proyecto
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* Lista numerada */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="border-t border-white/[0.08]"
        >
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              variants={rowVariants}
              className="group relative grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-8 md:py-10 border-b border-white/[0.08]"
            >
              {/* Barra de acento que crece al pasar el mouse */}
              <span
                aria-hidden="true"
                className="absolute left-0 bottom-[-1px] h-px w-full origin-left scale-x-0 bg-brand-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="font-mono text-sm text-brand-text-secondary pt-2 tabular-nums transition-colors duration-300 group-hover:text-brand-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-text-primary tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {service.title}
                </h3>
                <p className="text-brand-text-secondary leading-relaxed mt-3 max-w-[52ch]">
                  {service.description}
                </p>
                <ul className="flex flex-wrap gap-2 mt-5">
                  {service.tags.map(tag => (
                    <li
                      key={tag}
                      className="font-mono text-xs text-brand-text-secondary border border-white/[0.08] rounded-full px-3 py-1 transition-colors duration-300 group-hover:border-brand-accent/30 group-hover:text-brand-text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>

      </div>
    </section>
  );
};

export default ServicesSection;
