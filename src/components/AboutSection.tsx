"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const AboutSection = () => (
  <section id="about" className="relative bg-brand-dark overflow-hidden py-24 lg:py-32">
    <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-16 items-center">
      {/* Retrato con bordes nítidos y tamaño acotado: nunca se estira más allá de su resolución real */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[380px] aspect-[4/5] mx-auto lg:order-2 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
      >
        <Image
          src="/images/renzo-retrato.webp"
          alt="Renzo Asef, desarrollador detrás de RAdev"
          fill
          quality={95}
          sizes="380px"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-xl lg:order-1"
      >
        <TerminalPrompt command="whoami" />
        <h2 className="text-3xl md:text-5xl font-bold font-display text-brand-text-primary tracking-tight">
          Sobre mí
        </h2>
        <span className="block w-14 h-[3px] bg-brand-accent mt-3 mb-4" aria-hidden="true" />
        <a
          href="mailto:radevelopment02@gmail.com"
          className="font-mono text-sm text-brand-text-secondary hover:text-brand-accent transition-colors"
        >
          radevelopment02@gmail.com
        </a>

        <div className="mt-10 space-y-4 text-brand-text-primary/85 text-base md:text-lg leading-relaxed">
          <p>
            Soy <strong className="text-brand-text-primary font-semibold">Renzo Asef</strong>, desarrollador
            web y la persona detrás de RAdev. Diseño y programo sitios, sistemas de gestión y
            automatizaciones para negocios que quieren dejar atrás las planillas y los procesos manuales.
          </p>
          <p className="text-brand-text-secondary">
            Trabajo de forma directa con cada cliente: sin intermediarios, hablás siempre con quien
            construye tu proyecto, desde la primera charla hasta el soporte después del lanzamiento.
          </p>
        </div>

        <p className="mt-12 flex items-center gap-3 text-sm text-brand-text-secondary">
          <span className="w-6 h-px bg-brand-accent" aria-hidden="true" />
          Armstrong, Santa Fe · Argentina
          <span className="w-6 h-px bg-brand-accent" aria-hidden="true" />
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
