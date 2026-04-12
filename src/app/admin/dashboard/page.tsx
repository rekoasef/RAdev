'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DbProject } from '@/types/project';
import { Plus, Pencil, Trash2, Star, Globe, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();

  async function fetchProjects() {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.status === 401) { router.push('/admin'); return; }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchProjects(); }, []);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`¿Eliminar "${title}"?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  }

  async function toggleFeatured(project: DbProject) {
    const updated = { ...project, featured: !project.featured };
    await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: updated.featured }),
    });
    setProjects(prev => prev.map(p => p.id === project.id ? updated : p));
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="bg-brand-surface border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold font-display text-brand-text-primary">
          RA<span className="text-brand-accent">.</span>Dev
          <span className="text-brand-text-secondary text-sm font-normal ml-3">Admin</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors text-sm"
        >
          <LogOut size={16} />
          Salir
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-text-primary">Proyectos</h1>
            <p className="text-brand-text-secondary text-sm mt-1">{projects.length} proyecto{projects.length !== 1 ? 's' : ''} en total</p>
          </div>
          <Link
            href="/admin/dashboard/new"
            className="flex items-center gap-2 bg-brand-accent text-white font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Nuevo proyecto
          </Link>
        </div>

        {loading ? (
          <div className="text-brand-text-secondary text-center py-20">Cargando proyectos...</div>
        ) : projects.length === 0 ? (
          <div className="text-brand-text-secondary text-center py-20">
            No hay proyectos. <Link href="/admin/dashboard/new" className="text-brand-accent underline">Crear el primero</Link>
          </div>
        ) : (
          <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-brand-text-secondary text-sm font-semibold">Proyecto</th>
                  <th className="text-left px-6 py-4 text-brand-text-secondary text-sm font-semibold hidden md:table-cell">Tipo</th>
                  <th className="text-center px-4 py-4 text-brand-text-secondary text-sm font-semibold">Destacado</th>
                  <th className="text-center px-4 py-4 text-brand-text-secondary text-sm font-semibold hidden sm:table-cell">Orden</th>
                  <th className="text-right px-6 py-4 text-brand-text-secondary text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-brand-text-primary font-medium">{project.title}</div>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-brand-accent text-xs mt-1 hover:underline"
                        >
                          <Globe size={11} />
                          {project.live_url}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-brand-text-secondary text-sm">{project.type}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleFeatured(project)}
                        title={project.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                        className={`transition-colors ${project.featured ? 'text-yellow-400' : 'text-brand-text-secondary/40 hover:text-yellow-400'}`}
                      >
                        <Star size={18} fill={project.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center hidden sm:table-cell">
                      <span className="text-brand-text-secondary text-sm">{project.display_order}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/dashboard/edit/${project.id}`}
                          className="text-brand-text-secondary hover:text-brand-accent transition-colors"
                          title="Editar"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          disabled={deleting === project.id}
                          className="text-brand-text-secondary hover:text-red-400 transition-colors disabled:opacity-40"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
