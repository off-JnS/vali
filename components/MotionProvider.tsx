"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion folgt der Systemeinstellung „Bewegung reduzieren“. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
