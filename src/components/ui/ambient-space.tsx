"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Hero backdrop: faint engineering grid plus an abstract transit-map diagram
 * (45° routes, stations, one interchange). Nods to the rail/transit research
 * without using a photo.
 */

type Route = {
  d: string;
  stroke: string;
  stations: [number, number][];
};

const ROUTES: Route[] = [
  {
    d: "M 0 420 H 260 L 380 300 H 620 L 800 120",
    stroke: "var(--claret)",
    stations: [
      [260, 420],
      [380, 300],
      [620, 300],
    ],
  },
  {
    d: "M 140 600 V 480 L 300 320 V 120 L 380 40 H 800",
    stroke: "var(--blue-accent)",
    stations: [
      [140, 480],
      [300, 120],
      [560, 40],
    ],
  },
  {
    d: "M 0 200 H 180 L 420 440 H 800",
    stroke: "color-mix(in srgb, var(--text) 45%, transparent)",
    stations: [
      [180, 200],
      [420, 440],
      [660, 440],
    ],
  },
];

const INTERCHANGE: [number, number] = [300, 320];

export function AmbientSpace() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--bg)]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 60% 45%, black 20%, transparent 75%)",
        }}
      />

      <svg
        className="absolute right-[-18%] top-1/2 h-[min(80vh,640px)] w-auto -translate-y-1/2 opacity-[0.28] sm:right-[-14%] lg:right-[-6%] lg:opacity-[0.5]"
        viewBox="0 0 800 600"
        fill="none"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 40%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 40%, black 85%, transparent 100%)",
        }}
      >
        {ROUTES.map((route, i) => (
          <g key={route.d}>
            <motion.path
              d={route.d}
              stroke={route.stroke}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.6,
                delay: 0.3 + i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {route.stations.map(([cx, cy]) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={7}
                fill="var(--bg)"
                stroke={route.stroke}
                strokeWidth={4}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.25 }}
              />
            ))}
          </g>
        ))}
        <motion.circle
          cx={INTERCHANGE[0]}
          cy={INTERCHANGE[1]}
          r={12}
          fill="var(--bg)"
          stroke="var(--text)"
          strokeWidth={4}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.9 }}
        />
      </svg>

      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />
    </div>
  );
}
