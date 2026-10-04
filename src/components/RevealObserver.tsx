"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Marks [data-reveal] elements as revealed the first time they enter the viewport.
// Re-scans on every route change, since client-side navigation mounts new elements.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
