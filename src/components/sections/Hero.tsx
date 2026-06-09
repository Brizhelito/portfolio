import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { useMagneticHover } from "@/hooks/useMagneticHover";

function MagneticButton({
  children,
  href,
  variant = "primary",
  download,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  download?: boolean;
}) {
  const m = useMagneticHover(0.25);
  const base =
    "relative inline-flex items-center gap-2 px-6 h-12 rounded-full text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "text-white bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-teal shadow-lg shadow-black/30"
      : "glass glass-hover border border-border-medium text-text-primary";
  return (
    <motion.div
      ref={m.ref}
      style={{ x: m.x, y: m.y }}
      onMouseEnter={m.onMouseEnter}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      <a href={href} download={download} className={`${base} ${styles}`}>
        {children}
      </a>
    </motion.div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const m = useMagneticHover(0.22);
  return (
    <motion.div
      ref={m.ref}
      style={{ x: m.x, y: m.y }}
      onMouseEnter={m.onMouseEnter}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="glass glass-hover w-11 h-11 grid place-items-center rounded-full text-text-secondary hover:text-text-primary border border-border-subtle hover:border-accent-primary/40"
      >
        {children}
      </a>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const badges = t("hero.badges", { returnObjects: true }) as Record<string, string>;

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden"
    >
      {/* Aurora orbs */}
      <div
        className="aurora-orb"
        style={{
          top: "-20%",
          left: "-10%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          animation: "aurora-float 8s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-orb"
        style={{
          top: "10%",
          right: "-15%",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          animation: "aurora-float 10s ease-in-out infinite reverse",
          animationDelay: "-3s",
        }}
      />
      <div
        className="aurora-orb"
        style={{
          bottom: "-10%",
          left: "30%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)",
          animation: "aurora-float 12s ease-in-out infinite",
          animationDelay: "-6s",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-4 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border-subtle text-xs font-medium text-text-secondary">
              <span className="pulse-dot w-2 h-2 rounded-full bg-emerald-400" />
              {badges.available}
            </div>
            <div className="caption inline-flex items-center gap-1.5">
              {t("hero.caption")}
              <span className="cursor-blink inline-block w-[7px] h-3.5 bg-accent-primary align-middle ml-1" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient italic leading-[1.1] mb-6 pb-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              fontWeight: 400,
            }}
          >
            {t("hero.name")}
          </motion.h1>

          <div className="h-8 mb-6 overflow-hidden relative">
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-2xl font-medium text-text-primary"
            >
              {roles[idx]}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <MagneticButton href="#projects" variant="primary">
              {t("hero.cta_primary")} <ArrowDown className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/cv-reny-mireles.pdf" variant="ghost" download>
              <Download className="w-4 h-4" /> {t("hero.cta_secondary")}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <SocialIcon href="https://github.com/Brizhelito" label="GitHub">
              <Github className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/in/reny-david-mireles-bozo-523147240"
              label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </SocialIcon>
            <SocialIcon href="mailto:renymireles@outlook.com" label="Email">
              <Mail className="w-4 h-4" />
            </SocialIcon>
          </motion.div>
        </div>

        {/* RIGHT — Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative w-[260px] md:w-[300px] aspect-square">
            {/* Rotating gradient ring */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #2563eb, #0d9488, #7c3aed)",
                animation: "ring-rotate 8s linear infinite",
                filter: "blur(1px)",
              }}
            />
            <div className="absolute inset-[3px] rounded-full bg-bg-base" />
            {/* Avatar */}
            <div
              className="absolute inset-[8px] rounded-full overflow-hidden grid place-items-center"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(124,58,237,0.55), rgba(37,99,235,0.4) 40%, rgba(13,148,136,0.3) 80%)",
              }}
            >
              <img
                src="/avatar.webp"
                alt={t("hero.avatar_alt")}
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 caption flex flex-col items-center gap-2"
      >
        <span>scroll</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </motion.div>
    </section>
  );
}
