"use client";

import { HeroSocialLinks } from "@/components/hero-social-links";
import { AmbientSpace } from "@/components/ui/ambient-space";
import { HeroTitle } from "@/components/ui/hero-title";
import { EASE_PEAR } from "@/lib/motion-pear";
import { motion } from "motion/react";
import type { MouseEvent } from "react";

const HERO_NAME = ["Ryan", "Purakal"] as const;
const TRACKS = ["Software Engineering", "ML / AI", "Cybersecurity"] as const;

type HeroProps = {
  prefersReducedMotion: boolean;
  onViewWork: (e: MouseEvent<HTMLButtonElement>) => void;
  email: string;
};

export function Hero({ prefersReducedMotion, onViewWork, email }: HeroProps) {
  const enter = (delay: number) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE_PEAR },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--bg)] px-6 pt-28 pb-20 md:px-12 lg:px-[60px]"
    >
      <AmbientSpace />

      <div className="relative z-10 w-full max-w-3xl">
        <motion.p className="hero-eyebrow mb-6" {...enter(0)}>
          Rutgers Honors College · Computer Science &amp; Data Science
        </motion.p>

        <HeroTitle
          text={[...HERO_NAME]}
          prefersReducedMotion={prefersReducedMotion}
          className="justify-start"
        />

        <motion.p className="hero-lede max-w-xl" {...enter(0.15)}>
          I build software and machine learning systems. At Rutgers CAIT
          I&apos;m applying computer vision to rail and transit safety.
        </motion.p>

        <motion.div className="mt-8" {...enter(0.3)}>
          <p className="hero-tracks-label">Career tracks</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TRACKS.map((track) => (
              <li key={track} className="hero-track">
                {track}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          {...enter(0.45)}
        >
          <button
            type="button"
            onClick={onViewWork}
            className="bg-brand text-brand-foreground rounded-full px-7 py-3 font-sans text-sm font-medium transition-colors hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View experience
          </button>
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-border px-7 py-3 font-sans text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Get in touch
          </a>
          <HeroSocialLinks className="ml-1 justify-start" />
        </motion.div>
      </div>
    </section>
  );
}
