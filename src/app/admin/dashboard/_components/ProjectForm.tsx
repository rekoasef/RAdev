'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DbProject, ProjectInput } from '@/types/project';
import { ICON_OPTIONS } from '@/lib/iconMap';
import { X } from 'lucide-react';

interface ProjectFormProps {
  initial?: DbProject;
}

const emptyForm: ProjectInput = {
  title: '',
  type: '',
  icon_name: 'Code',
  objective: '',
  my_role: '',
  tech_stack: [],
  live_url: '',
  code_url: '',
  featured: false,
  display_order: 0,
};

export default function ProjectForm({ initial }: ProjectFormProps) {
  const isEdit = !!initial;
  const router = useRouter();

  const [form, setForm] = useState<ProjectInput>(
    initial
      ? {
          title: initial.title,
          type: initial.type,
          icon_name: initial.icon_name,
          objective: initial.objective,
          my_role: initial.my_role ?? '',
          tech_stack: initial.tech_stack,
          live_url: initial.live_url ?? '',
          code_url: initial.code_url ?? '',
          featured: initial.featured,
          display_order: initial.display_order,
        }
      : emptyForm
  );

  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key: keyof ProjectInput, value: unknown) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function addTech() {
    const trimmed = techInput.trim();
    if (trimmed && !form.tech_stack.includes(trimmed)) {
      set('tech_stack', [...form.tech_stack, trimmed]);
    }
    setTechInput('');
  }

  function removeTech(tech: string) {
    set('tech_stack', form.tech_stack.filter(t => t !== tech));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      live_url: form.live_url || null,
      code_url: form.code_url || null,
      my_role: form.my_role || null,
    };

    const url = isEdit ? `/api/admin/projects/${initial!.id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Error al guardar');
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <Field label="Título *">
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          required
          className={inputCls}
          placeholder="Ej: Bossio Monteresino - Estudio Jurídico"
        />
      </Field>

      {/* Type */}
      <Field label="Tipo de proyecto *">
        <input
          type="text"
          value={form.type}
          onChange={e => set('type', e.target.value)}
          required
          className={inputCls}
          placeholder="Ej: Web Corporativa Profesional"
        />
      </Field>

      {/* Icon */}
      <Field label="Ícono">
        <select
          value={form.icon_name}
          onChange={e => set('icon_name', e.target.value)}
          className={inputCls}
        >
          {ICON_OPTIONS.map(icon => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      </Field>

      {/* Objective */}
      <Field label="Objetivo *">
        <textarea
          value={form.objective}
          onChange={e => set('objective', e.target.value)}
          required
          rows={3}
          className={inputCls}
          placeholder="Descripción del objetivo del proyecto..."
        />
      </Field>

      {/* My Role */}
      <Field label="Mi rol">
        <textarea
          value={form.my_role ?? ''}
          onChange={e => set('my_role', e.target.value)}
          rows={3}
          className={inputCls}
          placeholder="Descripción de tu rol en el proyecto..."
        />
      </Field>

      {/* Tech Stack */}
      <Field label="Tecnologías">
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
            className={inputCls + ' flex-1'}
            placeholder="Ej: Next.js — Enter para agregar"
          />
          <button
            type="button"
            onClick={addTech}
            className="bg-brand-accent text-white px-4 rounded-lg hover:opacity-90 transition-opacity text-sm font-bold"
          >
            +
          </button>
        </div>
        {form.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {form.tech_stack.map(tech => (
              <span key={tech} className="flex items-center gap-1.5 bg-brand-dark text-brand-text-secondary text-xs px-3 py-1.5 rounded-full">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400 transition-colors">
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
      </Field>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="URL del proyecto">
          <input
            type="url"
            value={form.live_url ?? ''}
            onChange={e => set('live_url', e.target.value)}
            className={inputCls}
            placeholder="https://..."
          />
        </Field>
        <Field label="URL del código">
          <input
            type="url"
            value={form.code_url ?? ''}
            onChange={e => set('code_url', e.target.value)}
            className={inputCls}
            placeholder="https://github.com/..."
          />
        </Field>
      </div>

      {/* Display Order */}
      <Field label="Orden de visualización">
        <input
          type="number"
          value={form.display_order}
          onChange={e => set('display_order', parseInt(e.target.value, 10) || 0)}
          className={inputCls}
          min={0}
        />
      </Field>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={e => set('featured', e.target.checked)}
          className="w-4 h-4 accent-brand-accent"
        />
        <span className="text-brand-text-secondary text-sm">Mostrar en proyectos destacados (home)</span>
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear proyecto'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard')}
          className="text-brand-text-secondary hover:text-brand-text-primary transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-brand-text-secondary text-sm mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-brand-text-primary placeholder-brand-text-secondary/40 focus:outline-none focus:border-brand-accent transition-colors resize-none';
