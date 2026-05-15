"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(18px)', scale: 1.06 }}
          transition={{ duration: 1.4, ease: 'easeIn' }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center gap-10"
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
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.09,
                  duration: 0.6,
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
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-white/30 text-sm tracking-[0.25em] uppercase"
          >
            Desarrollo Web · Armstrong
          </motion.p>

          {/* Barra de progreso */}
          <motion.div className="w-32 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ delay: 0.5, duration: 1.6, ease: 'easeInOut' }}
              className="w-full h-full bg-[#FF6500] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
