"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CipherLetterProps = {
  char: string;
  index: number;
  prefersReducedMotion: boolean;
};

function CipherLetter({ char, index, prefersReducedMotion }: CipherLetterProps) {
  const [current, setCurrent] = useState(
    prefersReducedMotion || char === " " 
      ? char 
      : CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
  );

  useEffect(() => {
    if (prefersReducedMotion || char === " ") {
      setCurrent(char);
      return;
    }
    
    // total time to decode depends on index
    const decodeTime = 800 + index * 90; // 800ms to ~2000ms
    const interval = setInterval(() => {
      setCurrent(CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]);
    }, 40);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCurrent(char);
    }, decodeTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [char, index, prefersReducedMotion]);

  if (char === " ") {
    return <span>&nbsp;</span>;
  }

  // Randomize hover effects slightly per letter for organic feel
  const rotateDeg = (Math.random() - 0.5) * 20;

  return (
    <motion.span
      className="inline-block aurora-text-fixed cursor-default"
      whileHover={
        prefersReducedMotion 
          ? undefined 
          : {
              scale: 1.25,
              y: -12,
              rotate: rotateDeg,
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{ position: "relative" }}
    >
      {current}
    </motion.span>
  );
}

export function HeroTitle({ 
  text, 
  prefersReducedMotion,
  className = "justify-center"
}: { 
  text: string[];
  prefersReducedMotion: boolean;
  className?: string;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Smooth springs for 3D parallax
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 60, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 60, damping: 20 });

  let globalIndex = 0;

  return (
    <motion.div
      className={`mb-[1.5rem] flex flex-wrap gap-x-[0.3em] gap-y-1 font-serif text-6xl font-normal tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem] lg:leading-[1.1] ${className}`}
      style={{
        fontFamily: "var(--font-serif)",
        perspective: "1000px",
        // Only apply 3D transform if not reduced motion
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <style>{`
        .aurora-text-fixed {
          background: linear-gradient(
            -45deg,
            #ffffff, #e0f2fe, #c4b5fd, #5eead4, #ffffff
          );
          background-size: 300% 300%;
          background-attachment: fixed;
          animation: aurora-pan 8s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          text-shadow: 0 4px 24px rgba(255,255,255,0.1);
        }
        @keyframes aurora-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      {text.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="flex whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            const index = globalIndex++;
            return (
              <CipherLetter 
                key={`${index}-${char}`} 
                char={char} 
                index={index} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            );
          })}
        </span>
      ))}
    </motion.div>
  );
}
