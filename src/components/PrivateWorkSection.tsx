"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { containerVariants, itemVariants, titleVariants } from '@/utils/animations';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

interface InternalSystem {
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  tech?: string[];
}

// Trabajo en Crucianelli S.A.: sistemas internos privados, se muestran resultados en vez de capturas.
const crucianelliSystems: InternalSystem[] = [
  {
    metric: '−80%',
    metricLabel: 'de tiempo',
    title: 'Logística de repuestos',
    description: 'La carga de tarimas pasó de una jornada completa de trabajo a 1–2 horas, con integración de IA.',
    tech: ['Next.js', 'PostgreSQL', 'IA'],
  },
  {
    metric: '~150',
    metricLabel: 'encuestas por mes',
    title: 'NPS automatizado por WhatsApp',
    description: 'Reemplazó un proceso 100% manual: encuestas personalizadas, alertas por mail ante puntajes bajos, seguimiento de regalos y dashboard de KPIs.',
    tech: ['Next.js', 'Supabase', 'Python'],
  },
  {
    metric: '900+',
    metricLabel: 'llamados en 5 meses',
    title: 'Wallboard de callcenter',
    description: 'Panel de KPIs y gráficos en tiempo real para un área donde antes no existía ningún registro.',
    tech: ['Next.js', 'Supabase'],
  },
  {
    metric: '5 → 1',
    metricLabel: 'planillas unificadas',
    title: 'Plataforma de posventa',
    description: 'Centralizó la operación del área: cinco hojas de cálculo críticas y otras fuentes de datos en una única plataforma en vivo.',
  },
  {
    metric: '300+',
    metricLabel: 'inscriptos',
    title: 'Inscripciones a eventos',
    description: 'Gestión de 4 eventos internos con control de asistencia y notificaciones automáticas.',
  },
  {
    metric: '300+',
    metricLabel: 'colaboradores',
    title: 'MasCrucianelli · Product Owner',
    description: 'Definición de producto, roadmap y backlog de la plataforma corporativa, coordinando áreas de negocio y desarrollo.',
  },
];

const capomasiModules = [
  'Clientes',
  'Honorarios y cobranzas',
  'Vencimientos',
  'Fondos',
  'Proveedores',
  'Empleadas',
  'Reportes PDF',
];

const TechList = ({ tech }: { tech: string[] }) => (
  <p className="font-mono text-xs text-brand-text-secondary">
    {tech.join(' · ')}
  </p>
);

const SystemRow = ({ system }: { system: InternalSystem }) => (
  <motion.li
    variants={itemVariants}
    className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[8.5rem_1fr] gap-x-5 md:gap-x-8 py-6 border-t border-brand-border first:border-t-0"
  >
    <div>
      <p className="font-display font-bold text-2xl md:text-3xl text-brand-accent tabular-nums leading-none whitespace-nowrap">
        {system.metric}
      </p>
      <p className="mt-1.5 text-xs text-brand-text-secondary leading-snug">{system.metricLabel}</p>
    </div>
    <div>
      <h4 className="font-display font-semibold text-brand-text-primary text-base md:text-lg mb-1">
        {system.title}
      </h4>
      <p className="text-sm text-brand-text-secondary leading-relaxed max-w-[62ch]">{system.description}</p>
      {system.tech && (
        <div className="mt-2.5">
          <TechList tech={system.tech} />
        </div>
      )}
    </div>
  </motion.li>
);

const PrivateWorkSection = () => (
  <section id="sistemas" className="relative bg-brand-dark py-24">
    <div className="container mx-auto px-6">
      <motion.div
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <TerminalPrompt command="ls ./sistemas-privados" />
        <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-text-primary mb-4">
          Software que se usa todos los días
        </h2>
        <p className="text-brand-text-secondary text-lg leading-relaxed">
          Plataformas internas para empresas de la región. Son privadas, así que en vez de capturas te muestro lo que cambiaron.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── CRUCIANELLI ── */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-brand-surface border border-brand-border rounded-2xl"
        >
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 p-7 md:p-9 border-b border-brand-border">
            <div>
              <p className="text-sm text-brand-text-secondary mb-2">
                Fabricante de sembradoras · Armstrong, Santa Fe
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-text-primary">
                Crucianelli S.A.
              </h3>
              <p className="text-brand-text-secondary mt-2 max-w-[56ch] leading-relaxed">
                Desarrollador full stack: 6+ plataformas internas usadas a diario por posventa, logística, callcenter y comunicación interna. Del relevamiento con usuarios al despliegue y mantenimiento.
              </p>
            </div>
            <p className="font-mono text-xs text-brand-text-secondary whitespace-nowrap md:pb-1">
              mar 2024 — hoy
            </p>
          </header>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="px-7 md:px-9 py-2"
          >
            {crucianelliSystems.map((system) => (
              <SystemRow system={system} key={system.title} />
            ))}
          </motion.ul>
        </motion.article>

        {/* ── ESTUDIO CAPOMASI ── */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-brand-surface border border-brand-border rounded-2xl p-7 md:p-9 grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12"
        >
          <div>
            <p className="text-sm text-brand-text-secondary mb-2">
              Estudio contable · Armstrong, Santa Fe
            </p>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-text-primary">
              Estudio Contable Capomasi
            </h3>
            <p className="text-brand-text-secondary mt-3 leading-relaxed">
              Sistema de gestión integral hecho a medida: reemplazó el Excel operativo del estudio por una plataforma web multiusuario, con permisos por rol y la misma lógica de trabajo que el equipo ya conocía.
            </p>
            <div className="mt-5">
              <TechList tech={['Next.js', 'TypeScript', 'Supabase']} />
            </div>
          </div>

          <div className="md:border-l md:border-brand-border md:pl-12">
            <p className="font-display font-bold text-2xl md:text-3xl text-brand-accent leading-none">
              Excel → web
            </p>
            <p className="mt-1.5 text-xs text-brand-text-secondary mb-5">toda la operación en un solo lugar</p>
            <ul className="flex flex-wrap gap-2">
              {capomasiModules.map((module) => (
                <li
                  key={module}
                  className="text-sm text-brand-text-primary bg-brand-dark border border-brand-border px-3 py-1.5 rounded-lg"
                >
                  {module}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        <p className="flex items-center justify-center gap-2 text-sm text-brand-text-secondary pt-2">
          <Lock size={14} aria-hidden="true" />
          Sistemas privados de uso interno: los detalles quedan entre el cliente y yo.
        </p>
      </div>
    </div>
  </section>
);

export default PrivateWorkSection;
