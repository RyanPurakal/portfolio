"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, type CSSProperties } from "react";

export type ImageAutoSliderItem = {
  src: string;
  alt: string;
};

/** Local assets in `public/images/experience-slider/` */
const DEFAULT_IMAGES: ImageAutoSliderItem[] = [
  {
    src: "/images/experience-slider/01.png",
    alt: "Ryan Purakal — portrait",
  },
  {
    src: "/images/experience-slider/02.png",
    alt: "Presenting a technical session on version control and Git",
  },
  {
    src: "/images/experience-slider/03.png",
    alt: "Classroom workshop with slides on screen",
  },
  {
    src: "/images/experience-slider/04.png",
    alt: "On campus with friends",
  },
  {
    src: "/images/experience-slider/05.png",
    alt: "Health literacy case study presentation to a group",
  },
];

export type ImageAutoSliderProps = {
  images?: ImageAutoSliderItem[];
  /** Full animation loop duration in seconds */
  duration?: number;
  className?: string;
  prefersReducedMotion?: boolean;
};

export function ImageAutoSlider({
  images = DEFAULT_IMAGES,
  duration = 40,
  className,
  prefersReducedMotion = false,
}: ImageAutoSliderProps) {
  const loopItems = useMemo(() => [...images, ...images], [images]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {images.map((item) => (
            <div
              key={item.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden py-1", className)}
      aria-label="Image gallery carousel"
    >
      <div
        className="relative z-10 w-full px-0"
        style={
          {
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)",
          } as CSSProperties
        }
      >
        <div
          className="image-auto-slider-track flex w-max gap-2.5 sm:gap-4 md:gap-5"
          style={
            {
              "--slider-duration": `${duration}s`,
            } as CSSProperties
          }
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="group relative h-44 w-[11rem] shrink-0 overflow-hidden rounded-lg shadow-lg transition-[transform,filter] duration-300 ease-out sm:h-56 sm:w-60 md:h-64 md:w-[17rem] lg:h-72 lg:w-80 xl:h-80 xl:w-[22rem] hover:scale-[1.03] hover:brightness-[1.06]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 272px, 352px"
                className="object-cover"
                loading={index < 6 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ImageAutoSlider as Component };
