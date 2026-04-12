import { supabase } from '@/lib/supabase';
import { DbProject } from '@/types/project';
import fallbackProjects from '@/data/projects-fallback.json';

/** Devuelve todos los proyectos ordenados por display_order.
 *  Si Supabase no está disponible, usa el JSON estático generado en el último deploy. */
export async function getAllProjects(): Promise<DbProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data) {
    console.warn('[getProjects] Usando fallback estático:', error?.message ?? 'sin datos');
    return fallbackProjects as DbProject[];
  }
  return data;
}

/** Devuelve solo los proyectos destacados.
 *  Si Supabase no está disponible, filtra desde el JSON estático. */
export async function getFeaturedProjects(): Promise<DbProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('display_order', { ascending: true });

  if (error || !data) {
    console.warn('[getFeaturedProjects] Usando fallback estático:', error?.message ?? 'sin datos');
    return (fallbackProjects as DbProject[]).filter(p => p.featured);
  }
  return data;
}
