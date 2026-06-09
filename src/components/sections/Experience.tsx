import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

type Item = {
  year: string;
  company: string;
  place: string;
  role: string;
  description: string;
  tags: string[];
  note?: string;
};

export default function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as Item[];

  return (
    <section id="experience" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel label={t("experience.label")} title={t("experience.title")} />

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent"
          />

          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-10"
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary ring-4 ring-bg-base" />

              {/* Year (left on desktop) */}
              <div className="md:text-right md:pr-8">
                <span className="caption">{item.year}</span>
              </div>

              {/* Card (right on desktop) */}
              <div className="md:pl-8 mt-2 md:mt-0">
                <div className="glass glass-hover rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 grid place-items-center shrink-0">
                      <Briefcase className="w-4 h-4 text-text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {item.company}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <MapPin className="w-3 h-3" />
                        {item.place}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gradient mb-3">
                    {item.role}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tg) => (
                      <span key={tg} className="tech-pill">
                        {tg}
                      </span>
                    ))}
                  </div>
                  {item.note && (
                    <p className="text-xs italic text-text-muted">{item.note}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
