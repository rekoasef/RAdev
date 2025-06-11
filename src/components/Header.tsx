"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Logo = () => (
  <a href="#" className="text-2xl font-display font-bold text-brand-text-primary group">
    RA<span className="text-brand-accent group-hover:text-white transition-colors duration-300">.</span>Dev
  </a>
);

const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const scrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const linkStyles = "text-brand-text-secondary hover:text-brand-accent transition-colors duration-300";

  return (
    <>
      <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
        <button onClick={() => scrollTo('#methodology')} className={linkStyles}>Método</button>
      </motion.li>
      <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
        <button onClick={() => scrollTo('#projects')} className={linkStyles}>Proyectos</button>
      </motion.li>
      <motion.li variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
        <button onClick={() => scrollTo('#contact')} className="bg-brand-accent text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-300 font-semibold">Contactar</button>
      </motion.li>
    </>
  );
};


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Mantenemos el efecto de blur solo en la barra superior cuando está cerrada.
  const headerClasses = isOpen 
    ? "bg-brand-dark sticky top-0 z-30" 
    : "bg-brand-dark/90 backdrop-blur-lg sticky top-0 z-30";

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={headerClasses}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Menú para Desktop */}
        <motion.ul 
            className="hidden md:flex items-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.3 } }
            }}
        >
          <NavLinks />
        </motion.ul>

        {/* Botón de Menú para Móvil (Hamburguesa) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menú">
            <Menu className="text-white w-7 h-7" />
          </button>
        </div>

        {/* Overlay del Menú Móvil */}
        <AnimatePresence>
          {isOpen && (
            // CAMBIO FINAL: Fondo sólido para eliminar la mezcla con el contenido de atrás.
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brand-dark z-40"
            >
              <div className="container mx-auto px-6 h-full flex flex-col">
                <div className="flex justify-between items-center py-4">
                  <div className="text-2xl font-display font-bold invisible">RA.Dev</div>
                  <button onClick={toggleMenu} aria-label="Cerrar menú">
                      <X className="text-white w-8 h-8"/>
                  </button>
                </div>
                
                <motion.ul
                  className="flex flex-col items-center justify-center flex-grow gap-8 text-xl"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <NavLinks onLinkClick={toggleMenu} />
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;