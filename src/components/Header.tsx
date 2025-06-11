"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => (
  <a href="#" className="text-2xl font-display font-bold text-brand-text-primary group">
    RA<span className="text-brand-accent group-hover:text-white transition-colors duration-300">.</span>Dev
  </a>
);

const Header = () => {
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <motion.ul 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.3 } }
          }}
          className="flex items-center space-x-6"
        >
          <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <button onClick={() => scrollTo('#methodology')} className="text-brand-text-secondary hover:text-brand-accent transition-colors duration-300">Método</button>
          </motion.li>
          <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <button onClick={() => scrollTo('#projects')} className="text-brand-text-secondary hover:text-brand-accent transition-colors duration-300">Proyectos</button>
          </motion.li>
          <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <button onClick={() => scrollTo('#contact')} className="bg-brand-accent text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-300 font-semibold">Contactar</button>
          </motion.li>
        </motion.ul>
      </nav>
    </motion.header>
  );
};

export default Header;