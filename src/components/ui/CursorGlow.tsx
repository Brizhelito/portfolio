import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.22 });
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.22 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();
    media.addEventListener("change", updateEnabled);

    return () => media.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let nextX = -1000;
    let nextY = -1000;

    const handler = (e: MouseEvent) => {
      nextX = e.clientX - 120;
      nextY = e.clientY - 120;

      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        x.set(nextX);
        y.set(nextY);
        frame = 0;
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handler);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1]"
      style={{
        x: sx,
        y: sy,
        width: 240,
        height: 240,
        willChange: "transform",
        background:
          "radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.04) 45%, rgba(124,58,237,0) 72%)",
      }}
    />
  );
}
