import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative z-10 mt-10 pt-10 pb-10">
      <div
        aria-hidden
        className="h-px w-full mb-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-medium), transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs text-text-muted text-center md:text-left">
          <div>{t("footer.rights")}</div>
          <div className="mt-1 font-mono">{t("footer.built")}</div>
        </div>
        <nav className="flex gap-1 text-xs">
          <a href="#about" className="px-3 py-1.5 text-text-secondary hover:text-text-primary">
            {t("nav.about")}
          </a>
          <a href="#projects" className="px-3 py-1.5 text-text-secondary hover:text-text-primary">
            {t("nav.projects")}
          </a>
          <a href="#contact" className="px-3 py-1.5 text-text-secondary hover:text-text-primary">
            {t("nav.contact")}
          </a>
        </nav>
        <div className="flex gap-2">
          <a href="https://github.com/Brizhelito" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 grid place-items-center rounded-full glass glass-hover text-text-secondary hover:text-text-primary">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/reny-david-mireles-bozo-523147240" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 grid place-items-center rounded-full glass glass-hover text-text-secondary hover:text-text-primary">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:renymireles@outlook.com" aria-label="Email" className="w-9 h-9 grid place-items-center rounded-full glass glass-hover text-text-secondary hover:text-text-primary">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
