import { useCallback, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMagneticHover(strength = 0.24) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const enabledRef = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 360, damping: 26, mass: 0.18 });
  const sy = useSpring(y, { stiffness: 360, damping: 26, mass: 0.18 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const updateEnabled = () => {
      enabledRef.current = media.matches;

      if (!media.matches) {
        rectRef.current = null;
        x.set(0);
        y.set(0);
      }
    };

    updateEnabled();
    media.addEventListener("change", updateEnabled);

    return () => media.removeEventListener("change", updateEnabled);
  }, [x, y]);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || !enabledRef.current) return null;

    const rect = el.getBoundingClientRect();
    rectRef.current = rect;
    return rect;
  }, []);

  const onMouseEnter = useCallback(() => {
    measure();
  }, [measure]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabledRef.current) return;

      const rect = rectRef.current ?? measure();
      if (!rect) return;

      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    },
    [measure, strength, x, y],
  );

  const onMouseLeave = useCallback(() => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: sx, y: sy, onMouseEnter, onMouseMove, onMouseLeave };
}
