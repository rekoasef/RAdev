"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

const AboutSection = () => (
  <section id="about" className="relative bg-brand-dark overflow-hidden">
    {/* Retrato: a la derecha en desktop, arriba en mobile */}
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="portrait-fade relative h-[420px] sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]"
    >
      <Image
        src="/images/renzo-retrato.webp"
        alt="Renzo Asef, desarrollador detrás de RAdev"
        fill
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-cover object-top brightness-90"
      />
    </motion.div>

    <div className="relative container mx-auto px-6 -mt-24 pb-24 lg:mt-0 lg:py-32 lg:min-h-[720px] lg:flex lg:items-center">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-xl"
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
