import Image from "next/image";
import type { ReactNode } from "react";

type DeviceShellProps = {
  children: ReactNode;
  className?: string;
};

type TabletMockupProps = DeviceShellProps & {
  /** Tailwind `aspect-*` for the screen (match your photo ratio to avoid letterboxing) */
  screenAspectClass?: string;
  /** When true, shrinks content inside the screen with inset (zoomed-out look) */
  inset?: boolean;
};

export function PhoneMockup({ children, className = "" }: DeviceShellProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[min(100%,300px)] sm:max-w-[min(100%,320px)] ${className}`}
    >
      <div className="rounded-[2.75rem] border border-white/10 bg-zinc-950/90 p-[10px] shadow-[0_28px_90px_-14px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}

export function TabletMockup({
  children,
  className = "",
  screenAspectClass = "aspect-[3/4]",
  inset = true,
}: TabletMockupProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[min(100%,calc(100vw-1.5rem))] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[min(100%,520px)] ${className}`}
    >
      <div className="rounded-[2rem] border border-white/10 bg-zinc-900/95 p-2.5 shadow-[0_36px_110px_-20px_rgba(0,0,0,0.58)] ring-1 ring-white/5 sm:rounded-[2.15rem] sm:p-3">
        <div className="mb-2 flex justify-center sm:mb-2.5" aria-hidden>
          <span className="h-1 w-14 rounded-full bg-zinc-700/90 sm:w-16" />
        </div>
        <div
          className={`relative ${screenAspectClass} overflow-hidden rounded-[1.35rem] bg-zinc-950 sm:rounded-[1.35rem]`}
        >
          {inset ? (
            <div className="absolute inset-[10%] sm:inset-[12%] lg:inset-[14%]">
              <div className="relative h-full w-full">{children}</div>
            </div>
          ) : (
            <div className="relative h-full w-full">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}

type BrowserMockupProps = {
  children: ReactNode;
  className?: string;
  urlBar?: string;
};

export function BrowserMockup({
  children,
  className = "",
  urlBar = "",
}: BrowserMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-[0_24px_60px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="size-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="ml-2 min-h-6 flex-1 truncate rounded-md bg-black/40 px-3 text-[10px] leading-6 text-muted-foreground">
          {urlBar || "localhost"}
        </div>
      </div>
      <div className="relative aspect-video bg-black/50">{children}</div>
    </div>
  );
}

type MockImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  imgClassName?: string;
};

export function MockScreenshot({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  imgClassName = "object-cover object-top",
}: MockImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={imgClassName}
    />
  );
}
