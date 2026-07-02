"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Cada milestone se reporta UNA sola vez (antes disparaba gtag en cada
// evento de scroll ya superado el umbral: cientos de llamadas por segundo).
export default function ScrollTracker() {
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        if (height <= 0) return;

        const scrollPercent = (window.scrollY / height) * 100;
        for (const m of milestones) {
          if (scrollPercent >= m && !fired.has(m)) {
            fired.add(m);
            track("scroll_depth", { percent: m });
          }
        }
        if (fired.size === milestones.length) {
          window.removeEventListener("scroll", onScroll);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
