"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Avatar } from "../Avatar";

// The mascot welcomes visitors from an arch, a doorway into the brand. Her
// head breaks out of the top of the arch while its base crops her at the
// thighs, so she reads as part of the layout rather than a pasted cut-out.
// On scroll the three layers drift at different speeds for a little depth.
export function HeroMascot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mascotY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);
  const outlineY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[22rem] pt-12 sm:max-w-[25rem] lg:max-w-[28rem] lg:pt-14">
      {/* @container so the arch radius can be exactly half its width (50cqw);
          rounded-t-full would make CSS shrink the bottom corners to zero. */}
      <div
        className="rise @container relative h-[min(27rem,105vw)] sm:h-[30rem] lg:h-[min(38rem,calc(100dvh-12rem))]"
        style={{ "--rise-delay": "0.2s" } as React.CSSProperties}
      >
        <motion.div
          aria-hidden
          style={{ y: outlineY }}
          className="absolute -inset-x-3.5 -top-3.5 bottom-6 rounded-t-[calc(50cqw+0.875rem)] rounded-b-panel border border-lavender/80"
        />
        <motion.div
          aria-hidden
          style={{ y: archY }}
          className="absolute inset-0 rounded-t-[50cqw] rounded-b-panel bg-[radial-gradient(60%_45%_at_50%_30%,#ffffff_0%,rgba(255,255,255,0)_75%),linear-gradient(180deg,var(--color-lavender-mist)_0%,var(--color-lavender-soft)_100%)]"
        />
        <div className="absolute inset-0 [clip-path:inset(-30%_0_0_0_round_0_0_28px_28px)]">
          <motion.div style={{ y: mascotY }} className="absolute inset-x-[11%] -top-[9%]">
            <Avatar name="hero" priority sizes="(min-width: 1024px) 350px, 75vw" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
