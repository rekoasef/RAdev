"use client";
import { MotionConfig } from 'framer-motion';

// Respeta "reducir movimiento" del sistema en todas las animaciones de framer-motion.
const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
