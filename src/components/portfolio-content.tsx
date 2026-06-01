"use client";

import {
  HEADER_SCROLL_OFFSET,
  useLenisScroll,
} from "@/components/lenis-provider";
import { HERO_GITHUB_URL, HERO_LINKEDIN_URL } from "@/components/hero-social-links";
import { ScrollStoryHero } from "@/components/scroll-story-hero";
import { Header, type HeaderNavLink } from "@/components/ui/header-2";
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

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
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

  const sectionIds = useMemo(
    () => NAV_SECTIONS.map((s) => s.id) as string[],
    [],
  );

  const headerLinks = useMemo<HeaderNavLink[]>(
    () => NAV_SECTIONS.map((s) => ({ label: s.label, href: `#${s.id}` })),
    [],
  );

  const handleHeaderNavigate = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, link: HeaderNavLink) => {
      e.preventDefault();
      const id = link.href.startsWith("#") ? link.href.slice(1) : link.href;
      if (id) scrollToId(id);
    },
    [scrollToId],
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
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-foreground">
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
            className="absolute right-[-12%] top-[32%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-[var(--blue-accent)]/16 blur-[100px]"
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
            className="absolute bottom-[-8%] left-[20%] h-[min(85vw,480px)] w-[min(85vw,480px)] rounded-full bg-[var(--blue-accent)]/10 blur-[115px]"
            animate={{ opacity: [0.25, 0.4, 0.25] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ) : null}

      <Header
        layout="wide"
        links={headerLinks}
        activeHref={`#${activeSectionId}`}
        onNavigate={handleHeaderNavigate}
        showAuthButtons={false}
        wordmark={
          <a
            href="#hero"
            className="font-serif text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-brand md:text-base"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("hero");
            }}
          >
            Ryan Purakal
          </a>
        }
      />

      <ScrollStoryHero
        heroImage={HERO_IMAGE}
        prefersReducedMotion={prefersReducedMotion}
        onViewWork={viewWorkClick}
      />


      <div className="editorial-design">
        <TealFlood />

        <section id="work">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Projects</motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Selected <em>work</em></motion.h2>

          <div className="work-grid">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card ${index % 3 === 0 ? "wide" : ""}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (index % 3) * 0.09,
                }}
                viewport={{ once: true, margin: "0px 0px -36px 0px" }}
              >
                <span className="project-number">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tech.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="experience">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Experience</motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          ><em>Where</em> I've worked</motion.h2>

          <div className="experience-list">
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.company} 
                className="exp-item"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (index % 5) * 0.09 }}
                viewport={{ once: true, margin: "0px 0px -36px 0px" }}
              >
                <div className="exp-bar" aria-hidden />
                <div className="exp-body">
                  <h3 className="exp-role">{exp.title}</h3>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      className="exp-org exp-org-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                      <span className="exp-org-arrow" aria-hidden>
                        {" "}
                        ↗
                      </span>
                    </a>
                  ) : (
                    <p className="exp-org">{exp.company}</p>
                  )}
                  <p className="exp-period-sm">{exp.period}</p>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="exp-date">{exp.period}</div>
              </motion.div>
            ))}
          </div>

          <ImageAutoSlider
            className="mt-16 md:mt-24"
            prefersReducedMotion={prefersReducedMotion}
            duration={38}
          />
        </section>

        <section id="contact">
          <div className="contact-inner">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "0px 0px -36px 0px" }}
            >
              <p className="section-label">Contact</p>
              <h2 className="contact-headline">Open to<br/>opportunities<em>.</em></h2>
              <p className="contact-body">I'm looking for internships in software engineering and AI/ML for Summer/Fall 2026. If you're building something interesting, reach out.</p>
            </motion.div>

            <motion.div 
              className="contact-links"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
              viewport={{ once: true, margin: "0px 0px -36px 0px" }}
            >
              <a className="contact-link-item" href={`mailto:${EMAIL}`}>
                <span className="contact-link-type">Email</span>
                <span className="contact-link-label">{EMAIL}</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a className="contact-link-item" href={HERO_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <span className="contact-link-type">GitHub</span>
                <span className="contact-link-label">github.com/RyanPurakal</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a className="contact-link-item" href={HERO_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <span className="contact-link-type">LinkedIn</span>
                <span className="contact-link-label">linkedin.com/in/ryan-purakal</span>
                <span className="contact-link-arrow">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        <footer>
          <span className="footer-left">Ryan Purakal</span>
          <span className="footer-right">© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  );
}


function TealFlood() {
  useEffect(() => {
    const zone = document.getElementById('flood-zone');
    const fill = document.getElementById('flood-fill');
    if (!zone || !fill) return;

    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function clamp(v: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, v));
    }

    function update() {
      if (!zone || !fill) return;
      const rect = zone.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp(scrolled / total, 0, 1);

      if (progress <= 0 || progress >= 1) {
        fill.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
        zone.classList.remove('flood-peak');
        return;
      }

      if (progress < 0.5) {
        const p = ease(progress / 0.5);
        const top = lerp(100, 0, p);
        fill.style.clipPath = `polygon(0 ${top}%, 100% ${top}%, 100% 100%, 0 100%)`;
        zone.classList.toggle('flood-peak', p > 0.85);
      } else {
        const p = ease((progress - 0.5) / 0.5);
        const bottom = lerp(100, 0, p);
        fill.style.clipPath = `polygon(0 0, 100% 0, 100% ${bottom}%, 0 ${bottom}%)`;
        zone.classList.toggle('flood-peak', p < 0.15);
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div id="flood-zone">
      <div id="flood-fill"></div>
      <div className="flood-text">
        <span>Selected Work</span>
      </div>
    </div>
  );
}
