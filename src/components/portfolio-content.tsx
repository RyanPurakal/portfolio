"use client";

import {
  HEADER_SCROLL_OFFSET,
  useLenisScroll,
} from "@/components/lenis-provider";
import { HERO_GITHUB_URL, HERO_LINKEDIN_URL } from "@/components/hero-social-links";
import { Hero } from "@/components/hero";
import { Header, type HeaderNavLink } from "@/components/ui/header-2";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { experience, experienceGroups } from "@/data/portfolio";
import { EASE_PEAR } from "@/lib/motion-pear";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";

const EMAIL = "rjp326@scarletmail.rutgers.edu";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
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

  const reveal = (delay: number) =>
    prefersReducedMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE_PEAR, delay },
          viewport: { once: true, margin: "0px 0px -36px 0px" },
        };

  const viewExperienceClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToId("experience");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-foreground">
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

      <Hero
        prefersReducedMotion={prefersReducedMotion}
        onViewWork={viewExperienceClick}
        email={EMAIL}
      />

      <div className="editorial-design">
        <section id="about">
          <div className="about-inner">
            <motion.div {...reveal(0)}>
              <p className="section-label">About</p>
              <h2 className="section-title">
                A little <em>background</em>
              </h2>
            </motion.div>

            <motion.div className="about-copy" {...reveal(0.09)}>
              <p>
                I&apos;m a sophomore transfer in the Rutgers Honors College,
                studying Computer Science and Data Science.
              </p>
              <p>
                Most of my research sits where machine learning meets physical
                infrastructure. With Prof. Xiang Liu at Rutgers CAIT, I&apos;m
                working on computer vision for rail and transit safety through
                the Aresty program, and on a separate project modeling NJ
                TRANSIT&apos;s rail network. At Columbia I&apos;m in the CS3
                smart streetscapes accelerator under Prof. Jorge Ortiz, and in
                the I-Corps program.
              </p>
              <p>
                Outside the lab, I cofounded Health Decoded, a health literacy
                nonprofit, and run its technology; a lot of that means building
                workshop tools that get used live in classrooms. I&apos;m also
                the student community manager at CSL, where I run events and
                tutor other CS students.
              </p>
              <p>
                My favorite side project is a real-time, four-player version of
                the card game{" "}
                <a
                  href="https://github.com/RyanPurakal/56"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  56
                </a>
                . Away from a keyboard, there&apos;s a fair chance I&apos;m
                looking for a waterfall to jump off.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="experience">
          <motion.div {...reveal(0)}>
            <p className="section-label">Experience</p>
            <h2 className="section-title">
              What I&apos;m <em>working on</em>
            </h2>
          </motion.div>

          {experienceGroups.map((group) => (
            <div key={group} className="exp-group">
              <motion.h3 className="exp-group-label" {...reveal(0)}>
                {group}
              </motion.h3>
              <div className="experience-list">
                {experience
                  .filter((exp) => exp.group === group)
                  .map((exp, index) => (
                    <motion.div
                      key={`${exp.company}-${exp.title}`}
                      className="exp-item"
                      {...reveal((index % 5) * 0.09)}
                    >
                      <div className="exp-bar" aria-hidden />
                      <div className="exp-body">
                        <h4 className="exp-role">{exp.title}</h4>
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
            </div>
          ))}

          <ImageAutoSlider
            className="mt-16 md:mt-24"
            prefersReducedMotion={prefersReducedMotion}
            duration={38}
          />
        </section>

        <section id="contact">
          <div className="contact-inner">
            <motion.div {...reveal(0)}>
              <p className="section-label">Contact</p>
              <h2 className="contact-headline">Open to<br/>opportunities<em>.</em></h2>
              <p className="contact-body">
                I&apos;m building toward roles in software engineering and ML/AI.
                If you&apos;re working in one of those areas,
                or on transportation systems, I&apos;d like to hear about it.
              </p>
            </motion.div>

            <motion.div className="contact-links" {...reveal(0.09)}>
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

