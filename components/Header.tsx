"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation, site } from "@/data/site";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  if (href.startsWith("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

function scrollToHash(href: string) {
  document.getElementById(href.slice(1))?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü schließen bei Seitenwechsel
  useEffect(() => setOpen(false), [pathname]);

  // Scroll sperren, Escape schließt, Fokus bleibt im Menü
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = [
          toggleRef.current,
          ...menuRef.current.querySelectorAll<HTMLElement>("a"),
        ].filter(Boolean) as HTMLElement[];
        const i = focusables.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? i - 1 : i + 1;
        if (next < 0 || next >= focusables.length) {
          e.preventDefault();
          focusables[(next + focusables.length) % focusables.length].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? "border-line bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-md"
            : "border-transparent"
        }`}
        aria-hidden="true"
      />
      <div className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-colors duration-500 sm:px-6 md:h-20 lg:px-8 ${open ? "text-paper" : "text-fg"}`}>
        <Link href="/" className="group relative z-10 -m-2 rounded-full p-2" aria-label="ReSpin Studios – zur Startseite">
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative block rounded-full px-4 py-2 text-sm"
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-4 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-out-soft ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 -mr-2 flex h-12 items-center gap-3 rounded-full px-3 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span>{open ? "Schließen" : "Menü"}</span>
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-out-soft ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ease-out-soft ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            data-tone="dark"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 flex flex-col overflow-y-auto bg-ink px-4 pb-8 pt-24 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 32px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="grooves pointer-events-none absolute -right-1/2 top-1/3 aspect-square w-[150%] opacity-50" aria-hidden="true" />
            <nav aria-label="Hauptnavigation mobil" className="relative">
              <ul className="flex flex-col">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        setOpen(false);
                        if (item.href.startsWith("#")) {
                          e.preventDefault();
                          // erst nach dem Schließen scrollen, wenn die Scroll-Sperre weg ist
                          setTimeout(() => scrollToHash(item.href), 80);
                        }
                      }}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex min-h-20 items-center justify-between py-4 font-display text-[2.6rem] font-light leading-none aria-[current=page]:italic aria-[current=page]:text-accent"
                    >
                      {item.label}
                      <span className="text-base text-muted" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto pt-12 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <p>Schreib uns:</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-block py-2 text-lg text-paper underline decoration-line underline-offset-4">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
