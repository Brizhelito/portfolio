import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Skills() {
  const { t } = useTranslation();
  const categories = t("skills.categories", { returnObjects: true }) as Record<
    string,
    string[]
  >;

  return (
    <section id="skills" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel label={t("skills.label")} title={t("skills.title")} />
        <p className="text-text-secondary -mt-8 mb-5 max-w-2xl">
          {t("skills.subtitle")}
        </p>
        <p className="caption mb-12 md:mb-16">{t("skills.note")}</p>

        {/* Categories */}
        <div className="space-y-8">
          {Object.entries(categories).map(([cat, items], catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.05 }}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-6 items-start"
            >
              <div className="caption pt-1">{cat}</div>
              <div className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <span
                    key={tech}
                    className="glass glass-hover px-3.5 py-2 rounded-lg text-sm text-text-primary cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
