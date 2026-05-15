"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.floor((frame / total) * target));
      if (frame >= total) { setCount(target); clearInterval(timer); }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const wordVariant = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.4 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
};

const HeroSection = () => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const allWords = [
    { text: 'Desarrollo', accent: false },
    { text: 'experiencias', accent: false },
    { text: 'web', accent: false, break: true },
    { text: 'modernas,', accent: true },
    { text: 'rápidas', accent: true },
    { text: 'y', accent: false },
    { text: 'escalables.', accent: false },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none"
      >
        <source src="/images/Video1.mp4" type="video/mp4" />
      </video>

      {/* ── DARK GRADIENTS ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/70 pointer-events-none" />

      {/* ── ANIMATED GLOW ORBS ── */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] right-[2%] w-[650px] h-[650px] bg-brand-accent rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 right-[30%] w-[500px] h-[500px] bg-brand-accent rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute top-0 right-[7%] w-px h-full bg-gradient-to-b from-transparent via-brand-accent/30 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">

        {/* ═══ LEFT: CONTENT ═══ */}
        <div className="space-y-7">

          {/* Chip with pulse */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 bg-brand-accent/10 border border-brand-accent/25 rounded-full px-4 py-1.5"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0"
            />
            <span className="text-brand-accent text-sm font-semibold tracking-wide">
              Disponible para proyectos
            </span>
          </motion.div>

          {/* H1 — word-by-word entrance */}
          <h1 className="text-[2.8rem] md:text-[3.5rem] xl:text-[4rem] font-bold font-display leading-[1.08] tracking-tight">
            {allWords.map((w, i) => (
              <React.Fragment key={i}>
                {w.break && <br className="hidden sm:block" />}
                <motion.span
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  animate="visible"
                  className={`inline-block mr-[0.22em] ${w.accent ? 'text-brand-accent' : 'text-white'}`}
                >
                  {w.text}
                </motion.span>
              </React.Fragment>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-brand-text-secondary text-lg leading-relaxed max-w-[500px]"
          >
            Ayudo a empresas y emprendedores a construir productos digitales que generan resultados. Código eficiente, diseño impactante.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap gap-4 pt-1"
          >
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(255,101,0,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="bg-brand-accent text-white font-bold py-4 px-8 rounded-xl text-base shadow-lg shadow-brand-accent/25"
            >
              Trabajemos juntos
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#projects')}
              whileHover={{ scale: 1.04, borderColor: 'rgba(255,101,0,0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/15 hover:bg-white/[0.05] transition-all duration-300"
            >
              Ver proyectos →
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-8 pt-7 border-t border-white/[0.08]"
          >
            {[
              { value: 10, suffix: '+', label1: 'Proyectos', label2: 'Completados' },
              { value: 2,  suffix: '+', label1: 'Años de', label2: 'Experiencia' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px bg-white/[0.08] self-stretch hidden sm:block" />}
                <div>
                  <p className="text-3xl font-bold font-display text-white">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-brand-text-secondary mt-1 leading-5">
                    {s.label1}<br />{s.label2}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT: ANIMATED MOCKUP ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Levitation + subtle tilt loop */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-0.8, 0.8, -0.8],
            }}
            transition={{
              y:      { duration: 6,   repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 9,   repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative w-full max-w-[420px]"
          >
            {/* Pulsing glow ring */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 50px rgba(255,101,0,0.18), 0 0 120px rgba(255,101,0,0.07)',
                  '0 0 110px rgba(255,101,0,0.42), 0 0 220px rgba(255,101,0,0.16)',
                  '0 0 50px rgba(255,101,0,0.18), 0 0 120px rgba(255,101,0,0.07)',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full rounded-3xl overflow-hidden border border-brand-accent/30 shadow-[0_40px_100px_rgba(0,0,0,0.85)]"
            >
              <Image
                src="/images/img1.png"
                alt="RAdev.tech — Portfolio Preview"
                width={420}
                height={560}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 pointer-events-none"
              />

              {/* Top vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-brand-accent rounded-tl-3xl pointer-events-none z-10" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-brand-accent rounded-br-3xl pointer-events-none z-10" />

              {/* Status badge */}
              <div className="absolute bottom-5 left-5 z-10">
                <motion.div
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 bg-black/65 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs font-medium">Disponible ahora</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Reflection blur under the card */}
            <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-brand-accent/10 blur-2xl rounded-full pointer-events-none" />
          </motion.div>
        </motion.div>

      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
