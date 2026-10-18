"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Setzt <html data-tone> auf den Ton des Bereichs, der gerade unter dem
 * Header liegt. Der Header passt Schrift- und Glasfarbe daran an.
 */
export function ToneController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-tone], footer[data-tone]"),
    );
    if (sections.length === 0) return;

    const apply = (tone: string | undefined) => {
      if (tone && root.dataset.tone !== tone) root.dataset.tone = tone;
    };

    // Linie auf Höhe der Header-Mitte
    const line = 40;
    const current =
      sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= line && r.bottom >= line;
      }) ?? sections[0];
    apply(current.dataset.tone);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) apply((entry.target as HTMLElement).dataset.tone);
        }
      },
      { rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px` },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
