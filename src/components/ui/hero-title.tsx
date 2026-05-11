"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type CipherLetterProps = {
  char: string;
  index: number;
  prefersReducedMotion: boolean;
};

function CipherLetter({ char, index, prefersReducedMotion }: CipherLetterProps) {
  const [current, setCurrent] = useState(char);

  useEffect(() => {
    if (prefersReducedMotion || char === " ") {
      setCurrent(char);
      return;
    }

    setCurrent(CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]);

    const decodeTime = 800 + index * 90;
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

  const rotateDeg = ((index * 13) % 21) - 10;

  return (
    <motion.span
      className="hero-name-char inline-block cursor-default"
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.08,
              y: -4,
              rotate: rotateDeg * 0.35,
            }
      }
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {current}
    </motion.span>
  );
}

export function HeroTitle({
  text,
  prefersReducedMotion,
  className = "justify-center",
}: {
  text: string[];
  prefersReducedMotion: boolean;
  className?: string;
}) {
  let globalIndex = 0;

  return (
    <div
      className={`hero-display-name mb-5 flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
    >
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
    </div>
  );
}
