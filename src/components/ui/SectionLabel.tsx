import { motion } from "framer-motion";

export default function SectionLabel({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="caption block mb-3"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
