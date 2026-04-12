/**
 * sync-fallback.mjs
 *
 * Descarga todos los proyectos de Supabase y los guarda en
 * src/data/projects-fallback.json antes del build.
 *
 * Si Supabase no está disponible (proyecto pausado, sin variables de entorno,
 * error de red), el script termina sin romper el build y el archivo existente
 * se usa como fallback.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../src/data/projects-fallback.json');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[sync-fallback] Variables de Supabase no encontradas, saltando sync.');
  process.exit(0);
}

try {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/projects?select=*&order=display_order.asc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!res.ok) {
    console.warn(`[sync-fallback] Supabase respondió ${res.status}, saltando sync.`);
    process.exit(0);
  }

  const projects = await res.json();
  writeFileSync(OUTPUT_PATH, JSON.stringify(projects, null, 2));
  console.log(`[sync-fallback] ${projects.length} proyecto(s) guardados en projects-fallback.json`);
} catch (err) {
  console.warn('[sync-fallback] Error al conectar con Supabase:', err.message);
  console.warn('[sync-fallback] El build continúa usando el fallback existente.');
  process.exit(0);
}
