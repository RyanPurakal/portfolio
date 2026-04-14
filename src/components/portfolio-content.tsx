"use client";

import {
  BrowserMockup,
  MockScreenshot,
  PhoneMockup,
} from "@/components/device-mockups";
import {
  HEADER_SCROLL_OFFSET,
  useLenisScroll,
} from "@/components/lenis-provider";
import { ScrollStoryHero } from "@/components/scroll-story-hero";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { experience, projects } from "@/data/portfolio";
import { EASE_PEAR, springSoft, viewportPear } from "@/lib/motion-pear";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";

/** Hero portrait: 768×1024 — frame uses matching aspect */
const HERO_IMAGE = "/images/hero-portrait.png";
const EMAIL = "ryan.purakal@rutgers.edu";

function IconGithub({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function PortfolioContent() {
  const { scrollToId, prefersReducedMotion: prefersReducedMotionSystem } =
    useLenisScroll();
  const prefersReducedMotionMotion = useReducedMotion();
  const prefersReducedMotion =
    prefersReducedMotionMotion ?? prefersReducedMotionSystem;

  const [activeSectionId, setActiveSectionId] = useState<string>("hero");
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);

  const navClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToId(id);
    },
    [scrollToId],
  );

  const sectionIds = useMemo(
    () => NAV_SECTIONS.map((s) => s.id) as string[],
    [],
  );

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const rootMargin = `-${HEADER_SCROLL_OFFSET}px 0px -40% 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length === 0) return;
        const best = intersecting.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const id = best.target.id;
        if (id) setActiveSectionId(id);
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [sectionIds]);

  const inViewTransition = (delay: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : {
          duration: 0.6,
          delay,
          ease: EASE_PEAR,
        };

  const viewWorkClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToId("work");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {!prefersReducedMotion ? (
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <motion.div
            className="absolute -left-[18%] top-[-12%] h-[min(92vw,580px)] w-[min(92vw,580px)] rounded-full bg-brand/22 blur-[110px]"
            animate={{
              x: [0, 28, 0],
              y: [0, 20, 0],
              opacity: [0.38, 0.52, 0.38],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-[-12%] top-[32%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-teal-400/14 blur-[100px]"
            animate={{
              x: [0, -20, 0],
              y: [0, 32, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[-8%] left-[20%] h-[min(85vw,480px)] w-[min(85vw,480px)] rounded-full bg-violet-500/10 blur-[115px]"
            animate={{ opacity: [0.25, 0.4, 0.25] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
        <nav
          className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-center gap-x-1 gap-y-1 px-4 py-2.5 md:justify-end md:gap-x-4 md:px-12 md:py-3 lg:gap-x-6 lg:px-16"
          aria-label="Page sections"
        >
          {NAV_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => navClick(e, id)}
              className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm leading-none transition-all duration-500 ease-out md:min-h-0 md:px-2 md:py-1 md:text-base ${activeSectionId === id
                  ? "text-brand font-medium"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              aria-current={activeSectionId === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <ScrollStoryHero
        heroImage={HERO_IMAGE}
        prefersReducedMotion={prefersReducedMotion}
        onViewWork={viewWorkClick}
      />

      <section
        id="work"
        className="relative min-h-[78svh] px-5 py-20 sm:px-6 md:min-h-[88dvh] md:px-12 md:py-28 lg:px-16 lg:py-32"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.h2
            className="mb-14 font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 20,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0)}
          >
            Selected Work
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const mockup =
                project.frame === "phone" ? (
                  <PhoneMockup className="max-w-[240px]">
                    <MockScreenshot
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </PhoneMockup>
                ) : (
                  <BrowserMockup urlBar={project.title}>
                    <MockScreenshot
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </BrowserMockup>
                );

              const cardBody = (
                <>
                  <div className="relative mb-5 overflow-hidden rounded-2xl">
                    {mockup}
                    {project.href ? (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/55 opacity-0 transition-opacity duration-500 ease-out group-hover:pointer-events-auto group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-0">
                        <span className="font-medium text-white">
                          View Project →
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <h3 className="mb-2 text-base font-semibold">{project.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-secondary/40 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              );

              const className =
                "group block rounded-3xl border border-border/80 bg-card/25 p-5 shadow-md shadow-black/20 transition-[border-color,box-shadow] duration-500 ease-out hover:border-brand/35 hover:shadow-2xl hover:shadow-black/30";

              if (project.href) {
                return (
                  <motion.a
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                      opacity: prefersReducedMotion ? 1 : 0,
                      y: prefersReducedMotion ? 0 : 20,
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportPear}
                    transition={inViewTransition(index * 0.1)}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -10, transition: springSoft }
                    }
                    className={className}
                  >
                    {cardBody}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={project.title}
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    y: prefersReducedMotion ? 0 : 20,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportPear}
                  transition={inViewTransition(index * 0.1)}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -10, transition: springSoft }
                  }
                  className={className}
                >
                  {cardBody}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="border-t border-border/80 px-5 py-16 sm:px-6 md:min-h-[110dvh] md:px-12 md:py-24 lg:px-16 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.h2
            className="mb-12 font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 20,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0)}
          >
            Experience
          </motion.h2>
          <ul className="mb-0 flex flex-col gap-3" role="list">
            {experience.map((exp, index) => {
              const isOpen = openExperienceId === exp.company;
              const panelId = `exp-panel-${exp.company}`;
              return (
                <motion.li
                  key={exp.company}
                  className="rounded-2xl border border-border/90 border-l-4 border-l-brand/45 bg-secondary/15 shadow-sm shadow-black/10 transition-colors duration-500 hover:border-brand/35"
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    y: prefersReducedMotion ? 0 : 20,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportPear}
                  transition={inViewTransition(index * 0.1)}
                >
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left md:items-center md:py-3.5"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={`exp-trigger-${exp.company}`}
                    onClick={() =>
                      setOpenExperienceId(isOpen ? null : exp.company)
                    }
                  >
                    <div>
                      <h3
                        id={`exp-title-${exp.company}`}
                        className="text-base font-semibold text-foreground"
                      >
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="text-muted-foreground shrink-0 text-sm tabular-nums"
                      aria-hidden
                    >
                      {exp.period}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`exp-title-${exp.company}`}
                      className="border-t border-border/60 px-4 pb-3 pt-1"
                    >
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                        {exp.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.li>
              );
            })}
          </ul>

          <ImageAutoSlider
            className="mt-8 md:mt-10"
            prefersReducedMotion={prefersReducedMotion}
            duration={38}
          />
        </div>
      </section>

      <section
        id="contact"
        className="relative min-h-[76svh] border-t border-border/80 px-5 py-20 sm:px-6 md:min-h-[88dvh] md:px-12 md:py-32 lg:px-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-muted/50 via-brand-muted/15 to-background"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <motion.h2
            className="mb-6 font-serif text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 20,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0)}
          >
            Let&apos;s build something together
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-lg px-2 text-base sm:text-lg"
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 20,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0.1)}
          >
            Reach out for collaborations, internships, or just to talk product
            and frontend craft.
          </motion.p>
          <motion.a
            href={`mailto:${EMAIL}`}
            className="text-brand hover:text-brand/85 mb-10 inline-block max-w-full break-all px-2 text-lg font-medium underline-offset-4 transition-all duration-500 hover:underline sm:text-xl"
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 16,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0.2)}
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.02, transition: springSoft }
            }
          >
            {EMAIL}
          </motion.a>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            initial={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 16,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportPear}
            transition={inViewTransition(0.3)}
          >
            <a
              href="https://github.com/RyanPurakal"
              className="text-muted-foreground hover:text-brand inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-1 transition-all duration-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub className="size-6" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-purakal"
              className="text-muted-foreground hover:text-brand inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-1 transition-all duration-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconLinkedin className="size-6" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-6 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ryan Purakal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/RyanPurakal"
              className="text-muted-foreground inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-foreground"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-purakal"
              className="text-muted-foreground inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-foreground"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconLinkedin />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-muted-foreground inline-flex min-h-11 min-w-11 items-center justify-center transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <IconMail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
