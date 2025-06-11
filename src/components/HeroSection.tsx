"use client";
import React from 'react';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

const HeroSection = () => {
  const scrollToMethodology = () => {
    document.querySelector('#methodology')?.scrollIntoView({ behavior: 'smooth' });
  };

  const titleAnimation = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const letterAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative container mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
      <HeroBackground />
      
      <div className="relative z-10">
        <motion.h1
          variants={titleAnimation}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold font-display text-brand-text-primary leading-tight"
        >
          {"Llevo tu idea a una realidad digital.".split(" ").map((word, index) => (
            <span key={index} className="inline-block overflow-hidden pb-2">
              <motion.span variants={letterAnimation} className="inline-block pr-2 md:pr-4">
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          <span className="text-brand-accent">
            {"Soluciones web ágiles".split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden pb-2">
                <motion.span variants={letterAnimation} className="inline-block pr-2 md:pr-4">
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          {" impulsadas por IA.".split(" ").map((word, index) => (
            <span key={index} className="inline-block overflow-hidden pb-2">
              <motion.span variants={letterAnimation} className="inline-block pr-2 md:pr-4">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-brand-text-secondary"
        >
          Soy RA Dev. Combino estrategia humana con el poder de la IA para construir y entregar proyectos web excepcionales con máxima eficiencia.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4, ease: "backOut" }}
          className="mt-10"
        >
          <button
            onClick={scrollToMethodology}
            className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300"
          >
            Conoce mi Método
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;