import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { useMagneticHover } from "@/hooks/useMagneticHover";

type Social = {
  key: keyof Socials;
  href: string;
  icon: React.ReactNode;
};
type Socials = { github: string; linkedin: string; email: string; whatsapp: string };

const SOCIALS: Social[] = [
  { key: "github", href: "https://github.com/Brizhelito", icon: <Github className="w-5 h-5" /> },
  { key: "linkedin", href: "https://www.linkedin.com/in/reny-david-mireles-bozo-523147240", icon: <Linkedin className="w-5 h-5" /> },
  { key: "email", href: "mailto:renymireles@outlook.com", icon: <Mail className="w-5 h-5" /> },
  { key: "whatsapp", href: "https://wa.me/584246091499", icon: <MessageCircle className="w-5 h-5" /> },
];

function SocialBtn({ s }: { s: Social }) {
  const { t } = useTranslation();
  const m = useMagneticHover(0.2);
  return (
    <motion.div
      ref={m.ref}
      style={{ x: m.x, y: m.y }}
      onMouseEnter={m.onMouseEnter}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
    >
      <a
        href={s.href}
        target="_blank"
        rel="noreferrer"
        className="glass glass-hover rounded-2xl p-4 flex items-center gap-3 border border-border-subtle hover:border-accent-primary/40 group"
      >
        <span className="w-10 h-10 rounded-xl bg-bg-surface-hover grid place-items-center text-text-primary group-hover:text-accent-primary transition-colors">
          {s.icon}
        </span>
        <span className="flex-1 text-sm font-medium text-text-primary">
          {t(`contact.social.${s.key}`)}
        </span>
        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </a>
    </motion.div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      // Open mail client (mailto fallback)
      window.location.href = `mailto:renymireles@outlook.com?subject=${subject}&body=${body}`;
      setTimeout(() => setStatus("success"), 600);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel label={t("contact.label")} title={t("contact.title")} />

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
          {/* Left */}
          <div>
            <h3
              className="text-2xl md:text-3xl font-semibold mb-4 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("contact.headline")}
            </h3>
            <p className="text-text-secondary mb-8 max-w-md">{t("contact.note")}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SOCIALS.map((s) => (
                <SocialBtn key={s.key} s={s} />
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            onSubmit={submit}
            className="glass rounded-2xl p-6 md:p-8 border border-border-subtle space-y-5"
          >
            <div>
              <label className="caption block mb-2" htmlFor="name">
                {t("contact.form.name")}
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("contact.form.name_ph")}
                className="w-full h-11 px-4 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent-primary text-text-primary text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="caption block mb-2" htmlFor="email">
                {t("contact.form.email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t("contact.form.email_ph")}
                className="w-full h-11 px-4 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent-primary text-text-primary text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="caption block mb-2" htmlFor="message">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("contact.form.message_ph")}
                className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent-primary text-text-primary text-sm outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-teal text-white font-medium text-sm inline-flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-60"
            >
              {status === "sending" && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {status === "success" && <Check className="w-4 h-4" />}
              {status === "idle" && <Send className="w-4 h-4" />}
              {status === "error" && <Send className="w-4 h-4" />}
              {status === "sending"
                ? t("contact.form.sending")
                : status === "success"
                  ? t("contact.form.success")
                  : status === "error"
                    ? t("contact.form.error")
                    : t("contact.form.submit")}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
