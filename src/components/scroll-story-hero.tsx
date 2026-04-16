"use client";

import { MockScreenshot, TabletMockup } from "@/components/device-mockups";
import { TechStackRow } from "@/components/tech-icons";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const HERO_NAME = ["Ryan", "Purakal"] as const;
const HERO_SUBTITLE = ["Frontend", "Engineer", "&", "Designer"] as const;

type ScrollStoryHeroProps = {
  heroImage: string;
  prefersReducedMotion: boolean;
  onViewWork: (e: MouseEvent<HTMLButtonElement>) => void;
};

function useHeroScrollTransforms(p: ReturnType<typeof useSpring>) {
  // CHAPTER 1: INTRO (0.0 to 0.35)
  // Name moves out from center quickly.
  const nameScale = useTransform(p, [0.0, 0.1], [1.35, 1]);
  const nameY = useTransform(p, [0.0, 0.1], ["0vh", "-4vh"]);
  const nameX = useTransform(p, [0.0, 0.1], ["0vw", "-16vw"]);
  const extrasY = useTransform(p, [0.03, 0.08], ["20px", "0px"]);

  // Intro stays visible the whole time
  const introOpacity = useTransform(p, [0.0, 0.03], [1, 1]);

  // Tablet slides UP from the bottom and stays firmly locked.
  const photoOpacity = useTransform(p, [0.03, 0.1], [0, 1]);
  const photoY = useTransform(p, [0.03, 0.1], ["30vh", "0vh"]);
  const photoScale = useTransform(p, [0.03, 0.1], [0.95, 1.0]);

  // CHAPTER 2: ABOUT SECTION (0.15 to 0.25)
  // About content enters after the initial intro snaps into place
  const aboutContainerOpacity = useTransform(p, [0.15, 0.25], [0, 1]);
  const aboutY = useTransform(p, [0.15, 0.25], ["20px", "0px"]);

  // CHAPTER 3: GRAND ZOOM-OUT (0.70 to 1.00)
  // Background zooms to fill the screen very gracefully over a long distance.
  const contentFadeOut = useTransform(p, [0.70, 0.85], [1, 0]);
  const bgZoom = useTransform(p, [0.70, 1.00], [1, 150]);

  return {
    nameScale,
    nameY,
    nameX,
    extrasY,
    introOpacity,
    photoOpacity,
    photoY,
    photoScale,
    aboutContainerOpacity,
    aboutY,
    contentFadeOut,
    bgZoom,
  };
}

export function ScrollStoryHero({
  heroImage,
  prefersReducedMotion,
  onViewWork,
}: ScrollStoryHeroProps) {
  const [useStaticHero, setUseStaticHero] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const apply = () => setUseStaticHero(mediaQuery.matches);
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  const scrollRootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const t = useHeroScrollTransforms(smoothProgress);

  // Use state to track zoom so we can mount/dismount or control styles strictly?
  // Let's rely entirely on motion/react for performance.

  if (prefersReducedMotion || useStaticHero) {
    return (
      <section
        id="hero"
        className="relative flex h-auto flex-col overflow-hidden px-6 pt-24 pb-12 md:px-12 lg:px-16"
      >
        <div className="mx-auto grid min-h-0 w-full max-w-[1800px] flex-1 content-center items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="mb-8 w-full max-w-xl">
              <h1
                className="mb-6 flex flex-wrap gap-x-[0.2em] gap-y-1 font-serif text-5xl font-normal tracking-tight text-foreground sm:text-6xl md:text-7xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {HERO_NAME.map((word) => (
                  <span key={word} className="inline-block">
                    {word}
                  </span>
                ))}
              </h1>
              <div className="mb-6 h-px max-w-xs origin-left bg-border" />
              <p
                className="text-muted-foreground mb-8 flex flex-wrap gap-x-[0.35em] gap-y-1 text-lg sm:text-xl"
                style={{ letterSpacing: "-0.01em" }}
              >
                {HERO_SUBTITLE.map((word) => (
                  <span key={word} className="inline-block">
                    {word}
                  </span>
                ))}
              </p>
              <button
                type="button"
                onClick={onViewWork}
                className="bg-brand text-brand-foreground rounded-full px-8 py-3.5 text-sm font-medium shadow-lg shadow-brand/25 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                View Work
              </button>
            </div>
          </div>
          <div className="relative order-1 flex w-full justify-center lg:order-2">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100vw,520px)] w-[min(100vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/28 blur-[100px]"
              aria-hidden
            />
            <div className="relative z-10 w-full max-w-[min(100%,440px)]">
              <TabletMockup screenAspectClass="aspect-[768/1024]" inset={false}>
                <MockScreenshot
                  src={heroImage}
                  alt="Ryan Purakal"
                  sizes="(max-width: 640px) 88vw, 440px"
                  priority
                  imgClassName="object-cover object-center"
                />
              </TabletMockup>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={scrollRootRef}
      id="hero"
      // Extensive scroll distance accommodates the 3-chapter scroll story.
      className="relative h-[360vh] sm:h-[390vh] lg:h-[400vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden md:h-[100dvh]">
        {/* Glow backgrounds */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100vw,520px)] w-[min(100vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/24 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 top-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[90px] lg:h-80 lg:w-80"
          aria-hidden
        />

        <div className="relative z-10 w-full h-full max-w-[1800px] overflow-visible">
          
          {/* Intro Chapter: Main Name */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex w-[92vw] max-w-[40rem] -translate-x-1/2 -translate-y-1/2 flex-col px-2 sm:w-[90vw] sm:px-0 md:w-[40rem]">
             <motion.div
               className="w-full flex flex-col items-center pointer-events-auto"
               style={{ x: t.nameX, y: t.nameY, opacity: t.introOpacity }}
             >
              <motion.h1
                className="mb-[1.5rem] flex flex-wrap justify-center gap-x-[0.2em] gap-y-1 font-serif text-5xl font-normal tracking-tight text-foreground sm:text-6xl md:text-7xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  scale: t.nameScale,
                  transformOrigin: "center top",
                }}
              >
                {HERO_NAME.map((word) => (
                  <span key={word} className="inline-block">
                    {word}
                  </span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                className="w-full flex flex-col items-center"
                style={{ y: t.extrasY }}
              >
                 <div className="w-full max-w-sm">
                   <div className="mx-auto mb-6 h-px max-w-xs origin-center bg-border" />
                   <p
                     className="text-muted-foreground mb-8 flex flex-wrap justify-center gap-x-[0.35em] gap-y-1 text-lg sm:text-xl"
                     style={{ letterSpacing: "-0.01em" }}
                   >
                     {HERO_SUBTITLE.map((word) => (
                       <span key={word} className="inline-block">
                         {word}
                       </span>
                     ))}
                   </p>
                 </div>

                 {/* About Pop-up right under the subtitle */}
                 <motion.div
                   className="mt-4 flex w-[90vw] max-w-lg flex-col items-center justify-center gap-6 px-2 pointer-events-auto sm:px-0"
                   style={{ opacity: t.aboutContainerOpacity, y: t.aboutY }}
                 >
                    <div className="w-full space-y-4 text-center">
                      <motion.div style={{ opacity: t.contentFadeOut }}>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                          I&apos;m a student at Rutgers studying Computer Science and Data Science. I&apos;m interested in frontend engineering and AI/ML. Currently, I&apos;m the Director of Technology at Health Decoded, a nonprofit teaching health literacy to youth.
                        </p>
                        <div className="pt-4 flex flex-col items-center">
                          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Stack
                          </p>
                          <TechStackRow />
                        </div>
                      </motion.div>
                      
                      {/* The View Work Transition Button */}
                      <div className="relative inline-flex pt-4 w-full justify-center">
                        <button
                          type="button"
                          onClick={onViewWork}
                          className="group relative flex cursor-pointer justify-center rounded-full border-none bg-transparent align-middle outline-none"
                        >
                          <motion.div 
                            className="absolute inset-0 z-0 bg-brand rounded-full"
                            style={{ scale: t.bgZoom, transformOrigin: "center center" }}
                          />
                          <motion.span
                            className="relative z-10 block px-6 py-3 text-sm font-medium text-brand-foreground md:px-8 md:py-3.5"
                            style={{ opacity: t.contentFadeOut }}
                          >
                            View Work
                          </motion.span>

                        </button>
                      </div>
                    </div>
                 </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Intro Chapter: Photo */}
          <div className="pointer-events-none absolute right-[8%] top-1/2 z-20 hidden w-[min(44vw,480px)] -translate-y-1/2 lg:block">
            <motion.div
              style={{
                opacity: t.photoOpacity,
                y: t.photoY,
                x: 0,
                scale: t.photoScale,
                transformOrigin: "center right"
              }}
            >
              <div className="pointer-events-auto">
                <TabletMockup screenAspectClass="aspect-[768/1024]" inset={false}>
                  <MockScreenshot
                    src={heroImage}
                    alt="Ryan Purakal"
                    sizes="(max-width: 640px) 88vw, 440px"
                    priority
                    imgClassName="object-cover object-center brightness-[1.07] contrast-[1.02]"
                  />
                </TabletMockup>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
