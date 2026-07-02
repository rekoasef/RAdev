"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Counter from '@/components/ui/Counter';

// La escena 3D (three.js) se carga lazy: no bloquea el primer render.
// Mientras baja el bundle, se muestra un glow CSS como placeholder.
const CodeScene = dynamic(() => import('@/components/three/CodeScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[55%] aspect-square rounded-full bg-brand-accent/15 blur-[90px] animate-pulse" />
    </div>
  ),
});

const wordVariant = {
  hidden: { y: 60, opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.3 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const HeroSection = () => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax de salida: al scrollear, el hero se aleja y desvanece
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // La escena 3D solo se monta en pantallas grandes: mobile queda ultraliviano.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

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
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">

      {/* ── GRILLA TÉCNICA DE FONDO ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 60% 40%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 60% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* ── GLOW ORBS ── */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.11, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] right-[2%] w-[650px] h-[650px] bg-brand-accent rounded-full blur-[180px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-brand-accent rounded-full blur-[150px] pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">

        {/* ═══ IZQUIERDA: CONTENIDO ═══ */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="space-y-7">

          {/* Chip con pulso */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 bg-brand-accent/10 border border-brand-accent/25 rounded-full px-4 py-1.5 backdrop-blur-sm"
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

          {/* H1 — entrada palabra por palabra */}
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

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-brand-text-secondary text-lg leading-relaxed max-w-[500px]"
          >
            Ayudo a empresas y emprendedores a construir productos digitales que generan resultados. Código eficiente, diseño impactante.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
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
        </motion.div>

        {/* ═══ DERECHA: ESCENA 3D DE CÓDIGO ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: sceneY, scale: sceneScale }}
          className="relative hidden lg:block h-[600px]"
        >
          {/* Glow de base detrás del blob */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] aspect-square rounded-full bg-brand-accent/[0.07] blur-[100px]" />
          </div>

          {isDesktop && <CodeScene />}

          {/* Badge flotante */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 right-4 z-10"
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/80 text-xs font-medium">Disponible ahora</span>
            </div>
          </motion.div>

          {/* Badge tech flotante */}
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-10 left-2 z-10"
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-brand-accent/20 rounded-xl px-4 py-2.5">
              <span className="text-brand-accent font-mono text-sm font-bold">&lt;/&gt;</span>
              <span className="text-white/80 text-xs font-medium">Next.js · React · TypeScript</span>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── FADE INFERIOR ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />

      {/* ── INDICADOR DE SCROLL ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-brand-text-secondary text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-accent to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
