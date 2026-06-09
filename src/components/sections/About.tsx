import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin, Languages, Sparkles } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const { t } = useTranslation();
  const softSkills = t("about.skills", { returnObjects: true }) as string[];
  const focusPoints = t("about.focus_points", { returnObjects: true }) as string[];

  return (
    <section id="about" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel label={t("about.label")} title={t("about.title")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(120px,auto)]">
          {/* Cell A — Bio (large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass glass-hover rounded-2xl p-8 md:p-10 md:col-span-2 lg:row-span-2 relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div className="caption mb-4">bio</div>
            <p
              className="text-text-primary text-lg md:text-xl leading-relaxed relative z-10"
              style={{ letterSpacing: "-0.01em" }}
            >
              {t("about.bio")}
            </p>
          </motion.div>

          {/* Cell B — Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass glass-hover rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="caption">status</div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pulse-dot w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-sm font-medium text-text-primary">
                  {t("about.status")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-text-secondary text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {t("about.location")}
              </div>
            </div>
          </motion.div>

          {/* Cell C — Langs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass glass-hover rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="caption flex items-center gap-1.5">
              <Languages className="w-3 h-3" />
              {t("about.langs_label")}
            </div>
            <div className="text-sm text-text-primary">{t("about.langs")}</div>
          </motion.div>

          {/* Cell D — Soft skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass glass-hover rounded-2xl p-6 md:col-span-2"
          >
            <div className="caption mb-4">{t("about.skills_label")}</div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full text-xs bg-bg-surface-hover border border-border-subtle text-text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cell E — Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="glass glass-hover rounded-2xl p-6 md:col-span-2"
          >
            <div className="caption mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {t("about.focus_label")}
            </div>
            <div className="text-sm text-text-primary mb-4">
              {t("about.focus_title")}
            </div>
            <div className="space-y-2">
              {focusPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-border-subtle bg-bg-surface-hover px-4 py-3 text-sm text-text-secondary"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
