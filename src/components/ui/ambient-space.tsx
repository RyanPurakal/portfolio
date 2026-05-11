"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Hero ambient photo — painted on top with blend so it isn’t erased by opaque gradients. */
const HERO_AMBIENT_PHOTO = "/images/hero-ambient-photo.png";

export function AmbientSpace() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--bg)]"
      aria-hidden="true"
    >
      {/* Depth wash — only :root editorial tokens */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              165deg,
              color-mix(in srgb, var(--bg) 88%, var(--teal) 12%) 0%,
              var(--bg) 45%,
              color-mix(in srgb, var(--bg) 94%, #000 6%) 100%
            )
          `,
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 88% 62% at 50% 40%,
            var(--teal-glow) 0%,
            transparent 68%
          )`,
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            100% 48% at 50% 0%,
            color-mix(in srgb, var(--teal) 18%, transparent) 0%,
            transparent 52%
          )`,
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to top,
            color-mix(in srgb, var(--bg) 75%, #000 25%) 0%,
            transparent 36%
          )`,
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.22) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {prefersReducedMotion ? (
        <div
          className="absolute left-1/2 top-[20%] h-[min(42vh,380px)] w-[min(100vw,820px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          style={{ background: "var(--teal-dim)" }}
          aria-hidden
        />
      ) : (
        <>
          <motion.div
            className="absolute left-1/2 top-[22%] h-[min(48vh,420px)] w-[min(102vw,880px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ background: "var(--teal-glow)" }}
            animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.02, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-6%] left-1/2 h-[min(50vh,480px)] w-[min(115vw,1000px)] -translate-x-1/2 rounded-full blur-[130px]"
            style={{ background: "var(--teal-dim)" }}
            animate={{ opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Photo: on top + blend so it reads against the graded plate (was invisible under opaque fills). */}
      <div
        className={cn(
          "absolute inset-0 scale-[1.06] opacity-[0.48]",
          !prefersReducedMotion && "blur-[0.5px]",
        )}
        style={{
          backgroundImage: `url(${HERO_AMBIENT_PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center 28%",
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />

      {/* Light legibility veil on the upper third only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%]"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 52%, transparent), transparent)",
        }}
        aria-hidden
      />
    </div>
  );
}
