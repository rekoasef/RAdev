"use client";
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Contador que anima de 0 al target cuando entra en viewport.
const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.floor((frame / total) * target));
      if (frame >= total) { setCount(target); clearInterval(timer); }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default Counter;
