"use client";
import React from 'react';
import { motion } from 'framer-motion';

const taglines = ['Moderno', 'Rápido', 'Escalable', 'Seguro'];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative bg-brand-dark border-t border-white/[0.05]"
    >
      {/* Línea de acento superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
      {/* Tagline bar */}
      <div className="border-b border-white/[0.05] py-5">
        <div className="container mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
          {taglines.map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && <span className="text-brand-accent text-xs">•</span>}
              <span className="text-brand-text-secondary text-sm font-medium">{tag}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <div className="flex items-center gap-2">
            <span className="text-brand-accent font-mono text-sm font-bold">&lt;/&gt;</span>
            <span className="text-brand-text-primary font-display font-bold text-sm">
              RA<span className="text-brand-accent">dev</span><span className="text-brand-text-secondary font-normal">.tech</span>
            </span>
          </div>
          <p className="text-brand-text-secondary text-sm">
            &copy; {currentYear} RA Dev. Todos los derechos reservados.
          </p>
          <p className="text-brand-text-secondary text-xs">
            Construido con <span className="text-brand-accent font-medium">código eficiente</span> y IA.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
