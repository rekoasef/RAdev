"use client";
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Encabezado estilo terminal: tipea el comando cuando la sección entra en viewport.
const TerminalPrompt = ({ command }: { command: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChars(command.length);
      return;
    }
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= command.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, [inView, command]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-2 font-mono text-[13px] bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-1.5 mb-5"
    >
      <span className="text-brand-accent select-none">~$</span>
      <span className="text-brand-text-secondary">
        {command.slice(0, chars)}
      </span>
      <span
        className={`w-[7px] h-[15px] bg-brand-accent inline-block ${chars >= command.length ? 'animate-pulse' : ''}`}
      />
    </span>
  );
};

export default TerminalPrompt;
