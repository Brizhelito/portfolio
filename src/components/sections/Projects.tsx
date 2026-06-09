import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Github, KeyRound, X, Globe } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const KUMORIYA_TECH = [
  "Flutter 3.32",
  "Go",
  "Fiber",
  "Cloudflare Workers",
  "Durable Objects",
  "WebSocket",
  "Riverpod",
  "Drift/SQLite",
  "PostgreSQL",
  "Redis",
  "Firebase FCM",
  "WebAuthn",
  "Passkeys",
  "CRDT",
  "GitHub Actions",
  "Sentry",
];

const KUMORIYA_STATS = [
  { value: "3", labelKey: "layers" },
  { value: "45+", labelKey: "packages" },
  { value: "28+", labelKey: "plugins" },
  { value: "65+", labelKey: "tests" },
] as const;

type Project = {
  key: "pos" | "finwise" | "mybooktrace" | "matrix";
  image: string;
  imageAlt: string;
  tech: string[];
  repo: string;
  demo?: string;
  credentials?: string[];
};

type DetailKey = "kumoriya" | Project["key"];
type DetailMedia = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

const PROJECTS: Project[] = [
  {
    key: "pos",
    image: "/projects/pos-nextjs.webp",
    imageAlt: "POS System dashboard preview",
    tech: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
    demo: "https://nextjs-pos-xi.vercel.app",
    repo: "https://github.com/Brizhelito/pos-system",
    credentials: [
      "Admin · admin@gmail.com / admin123",
      "Cajero · cajero@gmail.com / cajero123",
    ],
  },
  {
    key: "finwise",
    image: "/projects/finwise_dashboard.webp",
    imageAlt: "Finwise dashboard preview",
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    demo: "https://finwise-nexjs.vercel.app",
    repo: "https://github.com/Brizhelito/finwise-nexjs",
    credentials: ["Demo · demo / Demo123!"],
  },
  {
    key: "mybooktrace",
    image: "/projects/mybooktrace.png",
    imageAlt: "MyBookTrace mobile app preview",
    tech: ["Flutter", "Dart", "Provider", "SQLite"],
    repo: "https://github.com/Brizhelito/my_book_trace",
  },
  {
    key: "matrix",
    image: "/projects/matrixezz/determinant.png",
    imageAlt: "Matrixezz solver preview",
    tech: ["Java", "Spring Boot", "Maven", "Vanilla JS"],
    repo: "https://github.com/angellvsdev/Matrixezz",
  },
] as const;

const DETAIL_MEDIA: Record<DetailKey, DetailMedia[]> = {
  kumoriya: [],
  pos: [
    {
      src: "/projects/pos-nextjs.webp",
      alt: "Vista general del dashboard de POS System",
    },
  ],
  finwise: [
    {
      src: "/projects/finwise_dashboard.webp",
      alt: "Vista principal del dashboard de Finwise",
    },
  ],
  mybooktrace: [
    {
      src: "/projects/mybooktrace/home_screen.jpeg",
      alt: "Pantalla inicial de MyBookTrace",
    },
    {
      src: "/projects/mybooktrace/book_list.jpg",
      alt: "Biblioteca de libros en MyBookTrace",
    },
    {
      src: "/projects/mybooktrace/book_detail.jpg",
      alt: "Detalle de libro en MyBookTrace",
    },
    {
      src: "/projects/mybooktrace/reading_session.jpg",
      alt: "Sesiones de lectura en MyBookTrace",
    },
    {
      src: "/projects/mybooktrace/statistics.jpg",
      alt: "Pantalla de estadísticas en MyBookTrace",
    },
  ],
  matrix: [
    {
      src: "/projects/matrixezz/determinant.png",
      alt: "Cálculo de determinante en Matrixezz",
    },
    {
      src: "/projects/matrixezz/gaus_jordan.png",
      alt: "Resolución por Gauss-Jordan en Matrixezz",
    },
    {
      src: "/projects/matrixezz/gaus_method.png",
      alt: "Resolución por Gauss en Matrixezz",
    },
    {
      src: "/projects/matrixezz/demostration.mp4",
      alt: "Video demostrativo de Matrixezz",
      type: "video",
    },
  ],
};

type ProjectContent = {
  title: string;
  description: string;
  highlight: string;
  badge: string;
};

type ProjectDetailContent = {
  title: string;
  subtitle: string;
  overview: string;
  context: string;
  stack: string;
  delivery: string;
  highlights: string[];
  gallery_note?: string;
};

function TechTag({ children }: { children: React.ReactNode }) {
  return <span className="tech-pill">{children}</span>;
}

function LinkBtn({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm transition-all ${
        primary
          ? "bg-white/10 hover:bg-white/15 text-text-primary border border-border-medium"
          : "glass glass-hover border border-border-subtle text-text-secondary hover:text-text-primary"
      }`}
    >
      {children}
    </a>
  );
}

function KumoriyaCard({
  onOpenDetail,
}: {
  onOpenDetail: (key: DetailKey) => void;
}) {
  const { t } = useTranslation();
  const points = t("projects.kumoriya.points", {
    returnObjects: true,
  }) as string[];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="animated-border glass rounded-[32px] p-8 md:p-12 mb-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(37,99,235,0.05) 50%, rgba(13,148,136,0.06))",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 grid xl:grid-cols-[1.15fr_0.85fr] gap-8 xl:gap-10 items-start">
        <div>
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-gradient-to-r from-accent-primary to-accent-secondary text-white mb-5">
            {t("projects.featured_badge")}
          </span>

          <h3
            className="text-4xl md:text-6xl font-bold mb-3 text-text-primary"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Kumoriya <span className="text-gradient">☁</span>
          </h3>
          <p className="text-text-secondary italic mb-4 text-base md:text-lg">
            {t("projects.kumoriya.subtitle")}
          </p>
          <p className="text-text-secondary leading-relaxed max-w-3xl mb-6">
            {t("projects.kumoriya.description")}
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {points.map((point) => (
              <div
                key={point}
                className="glass border border-border-subtle rounded-2xl p-4 text-sm text-text-primary"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {KUMORIYA_TECH.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <DetailButton onClick={() => onOpenDetail("kumoriya")}>
              {t("projects.view_details")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </DetailButton>
            <LinkBtn href="https://github.com/Brizhelito/kumoriya" primary>
              <Github className="w-4 h-4" /> {t("projects.view_repo")}
            </LinkBtn>
            <LinkBtn href="https://kumoriya.online" primary={false}>
              <Globe className="w-4 h-4" /> {t("projects.visit_website")}
            </LinkBtn>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass border border-border-subtle rounded-2xl p-6 overflow-x-auto">
            <div className="caption mb-4">{t("projects.kumoriya.architecture")}</div>
            <ArchDiagram />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {KUMORIYA_STATS.map((stat) => (
              <div
                key={stat.labelKey}
                className="glass border border-border-subtle rounded-2xl p-4"
              >
                <div className="text-2xl font-bold text-gradient tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] text-text-muted uppercase tracking-wider mt-1">
                  {t(`projects.kumoriya.stats.${stat.labelKey}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function DetailButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs glass glass-hover border border-border-subtle text-text-secondary hover:text-text-primary"
    >
      {children}
    </button>
  );
}

function ArchDiagram() {
  const boxes = [
    {
      label: "Flutter App",
      sub: "Android · Windows",
      color: "rgba(124,58,237,0.6)",
    },
    {
      label: "Go API",
      sub: "Fiber",
      color: "rgba(37,99,235,0.6)",
    },
    {
      label: "CF Workers",
      sub: "Durable Objects",
      color: "rgba(13,148,136,0.6)",
    },
  ];

  return (
    <motion.svg
      viewBox="0 0 600 110"
      className="w-full h-auto max-w-[640px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.line
        x1="170"
        y1="55"
        x2="230"
        y2="55"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.line
        x1="370"
        y1="55"
        x2="430"
        y2="55"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      {boxes.map((box, index) => {
        const x = 30 + index * 200;
        return (
          <motion.g
            key={box.label}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, delay: index * 0.25 }}
          >
            <rect
              x={x}
              y="25"
              width="140"
              height="60"
              rx="10"
              fill="rgba(255,255,255,0.04)"
              stroke={box.color}
              strokeWidth="1"
            />
            <text
              x={x + 70}
              y="52"
              textAnchor="middle"
              fill="#fafafa"
              fontSize="13"
              fontWeight="600"
            >
              {box.label}
            </text>
            <text
              x={x + 70}
              y="70"
              textAnchor="middle"
              fill="#a1a1aa"
              fontSize="10"
              fontFamily="monospace"
            >
              {box.sub}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}

function ProjectCard({
  project,
  index,
  onOpenDetail,
  onImageClick,
}: {
  project: Project;
  index: number;
  onOpenDetail: (key: Project["key"]) => void;
  onImageClick: (src: string) => void;
}) {
  const { t } = useTranslation();
  const item = t(`projects.items.${project.key}`, {
    returnObjects: true,
  }) as ProjectContent;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="glass glass-hover rounded-[28px] overflow-hidden flex flex-col group"
    >
      <button
        type="button"
        onClick={() => onImageClick(project.image)}
        className="relative aspect-[16/10] overflow-hidden w-full text-left cursor-pointer"
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 top-0 p-4 flex items-start justify-between gap-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-black/60 backdrop-blur text-white border border-white/15">
            {item.badge}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/45 text-white/85 border border-white/10">
            {project.tech.length} tech
          </span>
        </div>
      </button>

      <div className="p-6 flex-1 flex flex-col">
        <div className="caption mb-3">{item.highlight}</div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </div>

        {project.credentials && (
          <div className="mb-5 glass border border-border-subtle rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono uppercase tracking-wider">
                {t("projects.credentials")}
              </span>
            </div>
            <div className="space-y-1 text-xs text-text-primary font-mono">
              {project.credentials.map((credential) => (
                <div key={credential}>{credential}</div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          <DetailButton onClick={() => onOpenDetail(project.key)}>
            {t("projects.view_details")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </DetailButton>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs bg-bg-surface-hover border border-border-subtle hover:border-border-medium text-text-primary transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            {t("projects.view_repo")}
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs bg-gradient-to-r from-accent-primary/80 to-accent-secondary/80 text-white hover:from-accent-primary hover:to-accent-secondary transition-all"
            >
              {t("projects.view_demo")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetailDialog({
  activeKey,
  onClose,
  onImageClick,
}: {
  activeKey: DetailKey | null;
  onClose: () => void;
  onImageClick: (src: string) => void;
}) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!activeKey || !mounted) return null;

  const detail = t(`projects.details.${activeKey}`, {
    returnObjects: true,
  }) as ProjectDetailContent;
  const media = DETAIL_MEDIA[activeKey];

  const content = (
    <AnimatePresence>
      <motion.div
        key={activeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md px-4 py-6 md:px-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="mx-auto max-w-5xl h-full overflow-y-auto rounded-[32px] border border-border-medium bg-[#0b0b10]/95 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border-subtle bg-[#0b0b10]/90 px-6 py-5 backdrop-blur-xl md:px-8">
            <div>
              <div className="caption mb-2">{t("projects.detail_eyebrow")}</div>
              <h3
                className="text-2xl md:text-3xl text-text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {detail.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-text-secondary">
                {detail.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-surface text-text-secondary transition-colors hover:text-text-primary"
              aria-label={t("projects.close_details")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="glass rounded-3xl border border-border-subtle p-6">
                  <div className="caption mb-3">
                    {t("projects.detail_labels.overview")}
                  </div>
                  <p className="leading-relaxed text-text-secondary">
                    {detail.overview}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="glass rounded-2xl border border-border-subtle p-4">
                    <div className="caption mb-2">
                      {t("projects.detail_labels.context")}
                    </div>
                    <p className="text-sm text-text-secondary">{detail.context}</p>
                  </div>
                  <div className="glass rounded-2xl border border-border-subtle p-4">
                    <div className="caption mb-2">
                      {t("projects.detail_labels.stack")}
                    </div>
                    <p className="text-sm text-text-secondary">{detail.stack}</p>
                  </div>
                  <div className="glass rounded-2xl border border-border-subtle p-4">
                    <div className="caption mb-2">
                      {t("projects.detail_labels.delivery")}
                    </div>
                    <p className="text-sm text-text-secondary">{detail.delivery}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-3xl border border-border-subtle p-6">
                <div className="caption mb-4">
                  {t("projects.detail_labels.highlights")}
                </div>
                <div className="space-y-3">
                  {detail.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-border-subtle bg-bg-surface-hover px-4 py-3 text-sm text-text-secondary"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="caption mb-4">
                {t("projects.detail_labels.gallery")}
              </div>
              {media.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {media.map((item) =>
                    item.type === "video" ? (
                      <video
                        key={item.src}
                        src={item.src}
                        controls
                        className="w-full rounded-3xl border border-border-subtle bg-black/40"
                      />
                    ) : (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => onImageClick(item.src)}
                        className="block overflow-hidden rounded-3xl border border-border-subtle bg-bg-surface cursor-pointer w-full text-left"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </button>
                    ),
                  )}
                </div>
              ) : (
                <div className="glass rounded-3xl border border-border-subtle p-5 text-sm text-text-secondary">
                  {detail.gallery_note ?? t("projects.empty_gallery")}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

function Lightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            className="absolute top-6 right-6 z-[110] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-6 w-6 pointer-events-none" />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={src}
            alt="Vista ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default function Projects() {
  const { t } = useTranslation();
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel label={t("projects.label")} title={t("projects.title")} />
        <div className="flex flex-col gap-3 -mt-8 mb-12 md:mb-16 max-w-3xl">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {t("projects.subtitle")}
          </p>
          <p className="caption">{t("projects.selection_note")}</p>
        </div>

        <div className="mb-8">
          <KumoriyaCard onOpenDetail={setActiveDetail} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.key}
              project={project}
              index={index}
              onOpenDetail={setActiveDetail}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>
      <ProjectDetailDialog
        activeKey={activeDetail}
        onClose={() => setActiveDetail(null)}
        onImageClick={setSelectedImage}
      />

      <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
