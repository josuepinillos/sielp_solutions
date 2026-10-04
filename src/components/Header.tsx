"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import type { NavItem } from "@/content/site";
import { buttonClass } from "./Button";
import { Logo } from "./Logo";

type Secondary = { label: string; href: string };

/*
  Shared header for both lines of Sielp Solutions.
  - nav: in-page anchors of the current route.
  - brandHref: "#inicio" on the home, "/" on a secondary line (back to Sielp).
  - division: name of the secondary line, shown next to the logo.
  - secondary: quiet link to the other line; never styled like the main CTA.
*/
export function Header({
  nav,
  brandHref = "#inicio",
  division,
  secondary,
}: {
  nav: NavItem[];
  brandHref?: string;
  division?: string;
  secondary: Secondary;
}) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const navIds = nav.map((item) => item.id).join(",");

  // Publish the header's real height (--header-h) so in-page links land right
  // below it at every breakpoint (see scroll-padding-top in globals.css).
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const sync = () => root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 12;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Highlight the nav item of the section crossing the middle of the viewport.
  useEffect(() => {
    const ids = ["inicio", ...navIds.split(",")];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "inicio" ? null : entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navIds]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const closeOnDesktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => closeOnDesktop.matches && setOpen(false);
    closeOnDesktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      closeOnDesktop.removeEventListener("change", onChange);
      // preventScroll: never interrupt the smooth scroll to the chosen section.
      menuButton.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const solid = scrolled || open;
  const brandLabel = brandHref === "#inicio" ? "Sielp Solutions, ir al inicio" : "Sielp Solutions, ir a la página principal";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          solid
            ? "border-line/80 bg-canvas/90 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/80"
            : "border-transparent bg-canvas/0"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          {/* Brand lockup. On a secondary line the division name sits under the
              logo, at every width: a specialised division of Sielp Solutions. */}
          <div className="flex min-w-0 flex-col justify-center">
            {brandHref.startsWith("#") ? (
              <a href={brandHref} aria-label={brandLabel} className="shrink-0 self-start rounded-md">
                <Logo />
              </a>
            ) : (
              <Link href={brandHref} aria-label={brandLabel} className="shrink-0 self-start rounded-md">
                <Logo />
              </Link>
            )}
            {division && (
              <p className="mt-1 text-[0.8125rem] leading-none font-medium whitespace-nowrap text-indigo">{division}</p>
            )}
          </div>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-200 ${
                        isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          aria-hidden
                          className="absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-indigo"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              {/* The other line of the business: present, but quieter than the nav
                  and far from the weight of the "Hablemos" button. */}
              <li className="flex">
                <span aria-hidden className="mx-2 h-5 w-px self-center bg-line" />
                {/* No prefetch: the other line's code loads only if the visitor goes there. */}
                <Link
                  href={secondary.href}
                  prefetch={false}
                  className="block rounded-full px-3 py-2 text-[0.875rem] whitespace-nowrap text-ink-soft transition-colors duration-200 hover:text-indigo"
                >
                  {secondary.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contacto" className={buttonClass("primary", "h-10 shrink-0 px-5 text-[0.875rem]")}>
              Hablemos
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="grid size-10 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-indigo/30 lg:hidden"
            >
              {open ? <X aria-hidden className="size-5" /> : <List aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[68px] bottom-0 z-30 overflow-y-auto bg-canvas lg:hidden"
          >
            <nav aria-label="Menú móvil" className="shell flex min-h-full flex-col pt-6 pb-10">
              <ul className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      ref={index === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-[2rem] leading-tight font-semibold tracking-[-0.03em] text-ink"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Link
                href={secondary.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="group mt-8 inline-flex items-center gap-2 self-start py-2 text-[1.0625rem] font-medium text-indigo"
              >
                {secondary.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
