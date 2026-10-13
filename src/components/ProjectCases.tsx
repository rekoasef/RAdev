"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { getIcon } from '@/lib/iconMap';
import BrowserPreview from '@/components/ui/BrowserPreview';

const TechList = ({ tech }: { tech: string[] }) => (
  <ul className="flex flex-wrap gap-1.5">
    {tech.map((t) => (
      <li
        key={t}
        className="bg-brand-dark text-brand-text-secondary text-xs font-medium px-2.5 py-1 rounded-full border border-brand-border"
      >
        {t}
      </li>
    ))}
  </ul>
);

// Sin captura: bloque con el ícono del proyecto, mismo formato 16:10 que las capturas.
const IconPreview = ({ project }: { project: Project }) => (
  <div className="rounded-xl border border-brand-border bg-brand-surface-2 aspect-[16/10] flex items-center justify-center text-brand-accent">
    {getIcon(project.icon)}
  </div>
);

// Mockups 4:5: el primero grande a la izquierda, los otros dos apilados a la derecha.
const Gallery = ({ images }: { images: NonNullable<Project['gallery']> }) => {
  const [main, ...rest] = images;
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-3">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-brand-border">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          quality={90}
          sizes="(min-width: 768px) 400px, 66vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="grid grid-rows-2 gap-3">
        {rest.slice(0, 2).map((img) => (
          <div key={img.src} className="relative rounded-xl overflow-hidden border border-brand-border">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              quality={90}
              sizes="(min-width: 768px) 200px, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCase = ({ project }: { project: Project }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="group grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center py-12 md:py-16 border-t border-brand-border first:border-t-0 first:pt-0"
  >
    {project.gallery?.length ? (
      <Gallery images={project.gallery} />
    ) : project.image ? (
      <div className="rounded-xl overflow-hidden border border-brand-border transition-colors duration-300 group-hover:border-brand-accent/25">
        <BrowserPreview
          project={{ ...project, image: project.image }}
          sizes="(min-width: 768px) 600px, 100vw"
        />
      </div>
    ) : (
      <IconPreview project={project} />
    )}

    <div>
      <span className="inline-block text-xs font-semibold text-brand-text-secondary bg-brand-surface-2 px-2.5 py-1 rounded-full border border-brand-border mb-4">
        {project.type}
      </span>
      <h3 className="text-2xl md:text-[1.75rem] font-bold font-display text-brand-text-primary mb-3 leading-tight">
        {project.title}
      </h3>
      <p className="text-brand-text-secondary leading-relaxed mb-5">{project.objective}</p>

      {project.myRole && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-brand-text-primary mb-1.5">Mi rol</h4>
          <p className="text-sm text-brand-text-secondary leading-relaxed">{project.myRole}</p>
        </div>
      )}

      {project.techStack.length > 0 && <TechList tech={project.techStack} />}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-brand-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
        >
          Ver Proyecto <ExternalLink size={14} />
        </a>
      )}
    </div>
  </motion.article>
);

const ProjectCases = () => (
  <div className="max-w-6xl mx-auto">
    {projects.map((project) => (
      <ProjectCase project={project} key={project.id} />
    ))}
  </div>
);

export default ProjectCases;
