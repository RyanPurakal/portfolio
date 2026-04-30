"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function AmbientSpace() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Dot Grid with Radial Fade */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)"
        }}
      />

      {/* 2. Floating Crosshairs (+) for Engineer/Design Vibe */}
      <Crosshair x="15%" y="20%" delay={0} />
      <Crosshair x="80%" y="15%" delay={1} />
      <Crosshair x="25%" y="75%" delay={2} />
      <Crosshair x="75%" y="80%" delay={3} />
      <Crosshair x="8%" y="50%" delay={4} />
      <Crosshair x="88%" y="50%" delay={1.5} />

      {/* 3. Drifting Orbs / Blurred Elements to fill large negative spaces */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute left-[10%] top-[30%] h-64 w-64 rounded-full bg-violet-500/10 blur-[80px]"
            animate={{
              x: [0, 40, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-brand/10 blur-[90px]"
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}
    </div>
  );
}

function Crosshair({ x, y, delay }: { x: string; y: string; delay: number }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="absolute text-white/10"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        prefersReducedMotion
          ? { opacity: 0.5, scale: 1 }
          : { opacity: [0.05, 0.25, 0.05], scale: [0.9, 1, 0.9], rotate: [0, 90] }
      }
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}
