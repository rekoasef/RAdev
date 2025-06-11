"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-brand-dark py-6"
    >
      <div className="container mx-auto px-6 text-center text-brand-text-secondary">
        <p>&copy; {currentYear} RA Dev. Todos los derechos reservados.</p>
        <p className="text-sm mt-1">Construido con estrategia y <span className="text-brand-accent">código eficiente</span>.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;