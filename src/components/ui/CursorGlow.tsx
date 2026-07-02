"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Linterna sutil que sigue al cursor por toda la página.
// mix-blend screen: solo ilumina, nunca tapa contenido.
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 25 });
  const sy = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  // Sin mix-blend-mode: obligaba a recomponer toda la página en cada frame.
  // Un gradiente translúcido en su propia capa GPU es visualmente igual y gratis.
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        style={{
          x: sx,
          y: sy,
          willChange: 'transform',
          background:
            'radial-gradient(circle, rgba(255,140,60,0.05) 0%, rgba(255,101,0,0.02) 40%, transparent 70%)',
        }}
        className="absolute w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full"
      />
    </div>
  );
}
