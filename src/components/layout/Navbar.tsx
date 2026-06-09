import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { setLanguage } from "@/i18n/config";

const links = [
  { id: "about", key: "nav.about" },
  { id: "skills", key: "nav.skills" },
  { id: "projects", key: "nav.projects" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const lang = i18n.language?.startsWith("en") ? "en" : "es";
  const toggleLang = () => setLanguage(lang === "es" ? "en" : "es");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass border border-border-subtle py-2.5 backdrop-blur-xl"
            : "py-2"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span
            className="font-mono text-base font-bold text-gradient tracking-tight"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;RM /&gt;
          </span>
        </a>

        {/* Center nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="px-3.5 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="glass glass-hover h-9 px-1 rounded-full flex items-center text-[11px] font-mono"
          >
            <span
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "es"
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                  : "text-text-secondary"
              }`}
            >
              ES
            </span>
            <span
              className={`px-2.5 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                  : "text-text-secondary"
              }`}
            >
              EN
            </span>
          </button>

          {/* CV button */}
          <a
            href="/cv-reny-mireles.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full glass glass-hover text-sm text-text-primary border border-border-medium hover:border-accent-primary/50"
          >
            <Download className="w-3.5 h-3.5" />
            {t("nav.download_cv")}
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden glass h-9 w-9 rounded-full grid place-items-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-auto max-w-7xl px-5 mt-2"
          >
            <div className="glass bg-bg-base/95 backdrop-blur-xl rounded-2xl p-3 border border-border-subtle flex flex-col shadow-xl">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-surface"
                >
                  {t(l.key)}
                </a>
              ))}
              <a
                href="/cv-reny-mireles.pdf"
                download
                className="mt-2 inline-flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-surface text-sm"
              >
                <Download className="w-4 h-4" /> {t("nav.download_cv")}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
