"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Reveal } from "../Reveal";

export function FinalCta() {
  // The mascot celebrates from behind the panel, above the button, and jumps a
  // little higher when the visitor is about to press it.
  const [eager, setEager] = useState(false);

  return (
    <section aria-labelledby="cta-title" className="pt-44 pb-16 md:pt-52 md:pb-24 lg:pt-56">
      <div className="shell">
        <Reveal>
          {/* isolate: the mascot (z-0) sits behind the panel (z-10) in its own
              stacking context, so the panel hides her lower body (and the
              straight cut of the current pose) while she peeks over the top edge. */}
          <div className="relative isolate">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 z-0 w-[11rem] -translate-x-1/2 translate-y-[42%] sm:w-[12rem] lg:right-20 lg:left-auto lg:w-[16rem] lg:translate-x-0"
            >
              <motion.div
                animate={{ y: eager ? -12 : 0, rotate: eager ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                <Avatar name="cta" decorative sizes="(min-width: 1024px) 256px, 192px" className="mx-auto w-full" />
              </motion.div>
            </div>

            <div className="relative z-10 grid gap-10 rounded-panel bg-[radial-gradient(50%_80%_at_85%_100%,rgba(106,97,220,0.5)_0%,rgba(106,97,220,0)_70%),linear-gradient(135deg,var(--color-indigo-night)_0%,var(--color-indigo-deep)_100%)] px-7 py-10 text-paper sm:px-10 md:px-14 md:py-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:gap-16 lg:px-20 lg:py-20">
              <div>
                <h2
                  id="cta-title"
                  className="text-[clamp(2.25rem,1.2rem+3.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
                >
                  <span className="block">¿Tienes una idea?</span> <span className="block">Hagámosla digital.</span>
                </h2>
                <p className="mt-6 max-w-[32rem] text-[1.125rem] leading-relaxed text-lavender-soft">
                  Cuéntanos qué quieres crear y encontremos juntos la forma de convertirlo en una experiencia digital.
                </p>
              </div>

              <div
                className="flex justify-start lg:justify-center"
                onMouseEnter={() => setEager(true)}
                onMouseLeave={() => setEager(false)}
                onFocus={() => setEager(true)}
                onBlur={() => setEager(false)}
              >
                <Button href="#contacto" variant="inverse" arrow>
                  Empezar un proyecto
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
