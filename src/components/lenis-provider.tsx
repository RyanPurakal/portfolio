"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Snap from "lenis/snap";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

const HEADER_SCROLL_OFFSET = 80;

const SNAP_EASE = (t: number) => 1 - (1 - t) ** 3;

function debounce(fn: () => void, ms: number) {
  let id: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      id = undefined;
      fn();
    }, ms);
  };
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type LenisScrollContextValue = {
  scrollToId: (id: string) => void;
  prefersReducedMotion: boolean;
};

const LenisScrollContext = createContext<LenisScrollContextValue | null>(null);

export function useLenisScroll() {
  const ctx = useContext(LenisScrollContext);
  if (!ctx) {
    throw new Error("useLenisScroll must be used within LenisProvider");
  }
  return ctx;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.056,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.02,
    });
    lenisRef.current = lenis;

    const snap = new Snap(lenis, {
      type: "proximity",
      duration: 1.34,
      easing: SNAP_EASE,
      distanceThreshold: "36%",
      debounce: 320,
    });

    const snapRemovers: (() => void)[] = [];

    const refreshSectionSnaps = () => {
      snapRemovers.forEach((remove) => remove());
      snapRemovers.length = 0;

      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const ys: number[] = [];

      for (const el of sections) {
        const y = Math.round(
          lenis.scroll + el.getBoundingClientRect().top - HEADER_SCROLL_OFFSET,
        );
        if (!Number.isFinite(y)) continue;
        ys.push(Math.max(0, y));
      }

      ys.sort((a, b) => a - b);
      const merged: number[] = [];
      for (const y of ys) {
        const prev = merged[merged.length - 1];
        if (prev === undefined || Math.abs(y - prev) > 12) merged.push(y);
      }

      for (const y of merged) {
        snapRemovers.push(snap.add(y));
      }
    };

    const debouncedRefreshSnaps = debounce(refreshSectionSnaps, 180);
    const resizeObserver = new ResizeObserver(() => debouncedRefreshSnaps());
    resizeObserver.observe(document.body);

    const onLoad = () => refreshSectionSnaps();
    window.addEventListener("load", onLoad);

    const initSnapTimer = window.setTimeout(refreshSectionSnaps, 0);

    return () => {
      window.clearTimeout(initSnapTimer);
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
      snapRemovers.forEach((remove) => remove());
      snap.destroy();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const lenis = lenisRef.current;

      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(el, {
          offset: -HEADER_SCROLL_OFFSET,
          duration: 1.34,
          easing: SNAP_EASE,
        });
        return;
      }

      el.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "start",
      });
    },
    [prefersReducedMotion],
  );

  const value = useMemo(
    () => ({
      scrollToId,
      prefersReducedMotion,
    }),
    [scrollToId, prefersReducedMotion],
  );

  return (
    <LenisScrollContext.Provider value={value}>
      {children}
    </LenisScrollContext.Provider>
  );
}

export { HEADER_SCROLL_OFFSET };
