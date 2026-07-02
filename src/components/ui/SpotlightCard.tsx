"use client";
import React, { useRef, useState } from 'react';

// Card con spotlight: un glow radial sigue al cursor dentro de la card.
// Solo CSS vars + un handler, sin re-renders por movimiento.
const SpotlightCard = ({
  children,
  className = '',
  contentClassName = '',
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0,
          background:
            'radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,101,0,0.09), transparent 65%)',
        }}
      />
      <div className={`relative z-10 h-full ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default SpotlightCard;
