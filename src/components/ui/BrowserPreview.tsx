import Image from 'next/image';
import type { Project } from '@/data/projects';

// Captura del sitio dentro de un marco de navegador con la URL real.
// El enlace duplica al "Ver Proyecto" de la card, por eso queda fuera del tab y de lectores.
const BrowserPreview = ({
  project,
  sizes = '(min-width: 768px) 500px, 100vw',
  className = '',
}: {
  project: Project & { image: string };
  sizes?: string;
  className?: string;
}) => {
  const host = project.liveUrl ? new URL(project.liveUrl).host.replace(/^www\./, '') : '';
  const frame = (
    <>
      <div className="flex items-center gap-3 h-9 px-4 bg-brand-surface-2 border-b border-brand-border">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </span>
        {host && (
          <span className="font-mono text-xs text-brand-text-secondary truncate">{host}</span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-dark">
        <Image
          src={project.image}
          alt={`Captura del sitio de ${project.title.split(' - ')[0]}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </>
  );

  return project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={`block ${className}`}
    >
      {frame}
    </a>
  ) : (
    <div className={className}>{frame}</div>
  );
};

export default BrowserPreview;
