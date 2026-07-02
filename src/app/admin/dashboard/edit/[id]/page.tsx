import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase';
import ProjectForm from '../../_components/ProjectForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: project, error } = await admin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) notFound();

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="bg-brand-surface border-b border-white/5 px-6 py-4">
        <Link href="/admin/dashboard" className="text-xl font-bold font-display text-brand-text-primary">
          RA<span className="text-brand-accent">.</span>Dev
          <span className="text-brand-text-secondary text-sm font-normal ml-3">Admin</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1 text-brand-text-secondary hover:text-brand-accent transition-colors text-sm mb-8"
        >
          <ChevronLeft size={16} />
          Volver al listado
        </Link>

        <h1 className="text-2xl font-bold text-brand-text-primary mb-2">Editar proyecto</h1>
        <p className="text-brand-text-secondary text-sm mb-8">{project.title}</p>

        <div className="bg-brand-surface border border-white/5 rounded-xl p-8">
          <ProjectForm initial={project} />
        </div>
      </main>
    </div>
  );
}
