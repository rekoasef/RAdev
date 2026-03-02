"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function ScrollTracker() {
  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const scrollPercent = Math.round(
        (scrollTop / height) * 100
      );

      milestones.forEach((m) => {
        if (scrollPercent >= m) {
          track("scroll_depth", { percent: m });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}