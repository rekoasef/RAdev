"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function TimeTracker() {
  useEffect(() => {
    const start = Date.now();

    return () => {
      const timeSpent = Math.round(
        (Date.now() - start) / 1000
      );

      track("time_on_page", { seconds: timeSpent });
    };
  }, []);

  return null;
}