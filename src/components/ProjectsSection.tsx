"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { containerVariants, titleVariants, itemVariants } from '@/utils/animations';
import { featuredProjects, type Project } from '@/data/projects';
import { getIcon } from '@/lib/iconMap';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Tilt from '@/components/ui/Tilt';
import TerminalPrompt from '@/components/ui/TerminalPrompt';
import BrowserPreview from '@/components/ui/BrowserPreview';

// Proyectos con mockups 4:5: dos lado a lado llenan exacto el formato 16:10 de las capturas.
const GalleryPreview = ({ project }: { project: Project }) => (
  <div className="grid grid-cols-2 aspect-[16/10] overflow-hidden rounded-t-2xl">
    {project.gallery!.slice(0, 2).map((img) => (
      <div key={img.src} className="relative overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          quality={90}
          sizes="(min-width: 768px) 250px, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    ))}
  </div>
);

const ProjectCard = ({ project, className = '' }: { project: Project; className?: string }) => (
  <motion.div variants={itemVariants} className={`group ${className}`}>
    <Tilt className="h-full" max={5}>
    <SpotlightCard
      className="bg-brand-surface border border-brand-border rounded-2xl h-full transition-all duration-300 hover:border-brand-accent/25 group-hover:-translate-y-1 hover:shadow-accent-glow-sm"
      contentClassName="flex flex-col"
    >
    {project.image ? (
      <BrowserPreview project={{ ...project, image: project.image }} />
    ) : project.gallery?.length ? (
      <GalleryPreview project={project} />
    ) : null}

    <div className="flex flex-col flex-grow p-7">
    <div className="flex items-start justify-between gap-4 mb-3">
      {!project.image && !project.gallery?.length && (
        <div className="w-12 h-12 rounded-xl bg-brand-accent/[0.08] flex items-center justify-center text-brand-accent">
          {getIcon(project.icon)}
        </div>
      )}
      <span className="text-xs font-semibold text-brand-text-secondary bg-brand-surface-2 px-2.5 py-1 rounded-full border border-brand-border">
        {project.type}
      </span>
    </div>

    <h3 className="text-lg font-bold font-display text-brand-text-primary mb-2">{project.title}</h3>
    <p className="text-brand-text-secondary text-sm leading-relaxed mb-5 flex-grow">{project.objective}</p>

    <div className="mt-auto space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map(tech => (
          <span key={tech} className="bg-brand-dark text-brand-text-secondary text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border">
            {tech}
          </span>
        ))}
      </div>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
        >
          Ver Proyecto <ExternalLink size={14} />
        </a>
      )}
    </div>
    </div>
    </SpotlightCard>
    </Tilt>
  </motion.div>
);

// Carrusel con scroll-snap nativo: la card siguiente queda asomada para que se note que hay más.
const ProjectsCarousel = ({ projects }: { projects: Project[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduceMotion = useReducedMotion();

  const step = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    // Al final se ven varias cards a la vez y el scroll no llega a la última: se marca la última igual.
    setIndex(end ? track.children.length - 1 : s ? Math.round(track.scrollLeft / s) : 0);
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(end);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: reduceMotion ? 'auto' : 'smooth' });

  const fadeMask = `linear-gradient(to right, ${atStart ? '#000' : 'transparent'}, #000 4%, #000 92%, ${atEnd ? '#000' : 'transparent'})`;

  const arrowClass =
    'grid place-items-center w-11 h-11 rounded-full border border-brand-border bg-brand-surface text-brand-text-primary transition-all duration-300 hover:border-brand-accent/50 hover:text-brand-accent disabled:opacity-30 disabled:pointer-events-none';

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        ref={trackRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos destacados"
        tabIndex={0}
        // El padding vertical deja lugar al hover (sube 4px) y a la sombra sin que el scroll los recorte.
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 -my-4 px-1 -mx-1"
        // Desvanecido en el borde que tiene más cards; se apaga al llegar a ese extremo.
        style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      >
        {projects.map((project) => (
          <ProjectCard
            project={project}
            key={project.id}
            className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-1.25rem)/2.3)]"
          />
        ))}
      </motion.div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" aria-label="Elegir proyecto">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${p.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-brand-accent' : 'w-1.5 bg-brand-border hover:bg-brand-text-secondary'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-brand-text-secondary tabular-nums" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => scrollByCards(-1)} disabled={atStart} aria-label="Proyecto anterior" className={arrowClass}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => scrollByCards(1)} disabled={atEnd} aria-label="Proyecto siguiente" className={arrowClass}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="relative bg-brand-dark py-24 overflow-hidden">

    {/* ── RADEV1 BG IMAGE (estática: animarla repintaba toda la sección) ── */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Image
        src="/images/radev1.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60" />
    </div>
    <div className="relative z-10 container mx-auto px-6">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-14"
      >
        <TerminalPrompt command="git log --proyectos" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary">
          Proyectos Destacados
        </h2>
      </motion.div>

      <ProjectsCarousel projects={featuredProjects} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 border border-brand-accent/50 text-brand-accent font-bold py-3 px-8 rounded-xl text-sm hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300"
        >
          <Code2 size={16} /> Ver todos los proyectos
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
