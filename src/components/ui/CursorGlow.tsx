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

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none mix-blend-screen" aria-hidden="true">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute w-[550px] h-[550px] -ml-[275px] -mt-[275px] rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,101,0,0.07) 0%, rgba(255,101,0,0.03) 35%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}
