/** Easing / springs inspired by polished marketing sites (e.g. pear.care feel) */

export const EASE_PEAR = [0.16, 1, 0.3, 1] as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
  mass: 0.85,
};

/** Scroll-triggered blocks: fire when 20% of the element is in view */
export const viewportPear = {
  once: true,
  margin: "0px 0px -5% 0px",
  amount: 0.15,
};
