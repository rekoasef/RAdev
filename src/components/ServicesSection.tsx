"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, LayoutDashboard, Workflow, ShoppingBag } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Tilt from '@/components/ui/Tilt';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const services = [
  {
    icon: Globe,
    title: "Sitios Web",
    description: "Webs rápidas y a medida que presentan tu negocio y generan consultas desde cualquier dispositivo.",
    highlight: false,
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas de Gestión",
    description: "Plataformas a medida que reemplazan planillas de Excel, con usuarios, permisos y datos en tiempo real.",
    highlight: true,
  },
  {
    icon: Workflow,
    title: "Automatizaciones con IA",
    description: "Procesos manuales que pasan a hacerse solos: mensajes de WhatsApp, mails, reportes y carga de datos.",
    highlight: false,
  },
  {
    icon: ShoppingBag,
    title: "Catálogos y Tiendas",
    description: "Tu catálogo online, fácil de actualizar, con consultas y ventas directas por WhatsApp.",
    highlight: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ServicesSection = () => {
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="bg-brand-dark py-20 overflow-x-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <TerminalPrompt command="radev --servicios" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary">
            Qué puedo hacer por tu negocio
          </h2>
        </motion.div>

        {/* 4 Service Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants} className="group">
                <Tilt className="h-full">
                <SpotlightCard
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-default h-full
                    ${service.highlight
                      ? 'bg-brand-accent/[0.08] border-brand-accent/30 shadow-lg shadow-brand-accent/[0.08]'
                      : 'bg-brand-surface border-brand-border hover:border-brand-accent/20 hover:bg-[#181818] group-hover:-translate-y-1'
                    }`}
                >
                  <div className={`mb-5 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110
                    ${service.highlight ? 'bg-brand-accent/20' : 'bg-brand-accent/[0.08] group-hover:bg-brand-accent/15'}`}
                  >
                    <Icon size={22} className="text-brand-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-brand-text-primary font-bold font-display text-lg mb-2">{service.title}</h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">{service.description}</p>
                  <div className="flex gap-1.5 mt-6">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300
                          ${service.highlight
                            ? 'bg-brand-accent'
                            : i === 0
                            ? 'bg-brand-accent/50 group-hover:bg-brand-accent'
                            : 'bg-[#333] group-hover:bg-brand-accent/30'
                          }`}
                      />
                    ))}
                  </div>
                </SpotlightCard>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="bg-brand-surface border border-brand-border rounded-2xl px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-6"
        >
          <div>
            <p className="text-lg md:text-xl font-bold font-display text-brand-text-primary">
              ¿Tenés un proyecto en mente?
            </p>
            <p className="text-brand-text-secondary text-sm mt-1">
              Contame qué necesitás y te respondo en menos de 24 hs.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="bg-brand-accent text-brand-dark font-bold py-3.5 px-7 rounded-xl text-sm hover:bg-[#E55A00] hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          >
            Hablemos de tu proyecto →
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
