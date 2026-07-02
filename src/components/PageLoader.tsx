"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Loader de marca: rápido (1.3s) y solo en la primera visita de la sesión.
// Las navegaciones siguientes entran directo, sin bloquear.
export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('radev_loaded')) return;
    sessionStorage.setItem('radev_loaded', '1');
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(14px)', scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8"
        >
          {/* Logo letra por letra */}
          <div className="flex items-baseline">
            {[
              { char: 'R', accent: false },
              { char: 'A', accent: false },
              { char: '.', accent: true },
              { char: 'D', accent: true },
              { char: 'e', accent: true },
              { char: 'v', accent: true },
            ].map((item, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.05 + i * 0.06,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-[4.5rem] md:text-[6rem] font-bold leading-none tracking-tight ${
                  item.accent ? 'text-[#FF6500]' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-display, inherit)' }}
              >
                {item.char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-white/30 text-sm tracking-[0.25em] uppercase"
          >
            Desarrollo Web · Armstrong
          </motion.p>

          {/* Barra de progreso */}
          <motion.div className="w-32 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
              className="w-full h-full bg-[#FF6500] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
