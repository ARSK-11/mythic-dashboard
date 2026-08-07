import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { Github, Linkedin, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShipSymbol } from "@/components/ShipSymbol";
import { WavyScroll } from "@/components/WavyScroll";
import { VoltCompanion } from "@/components/VoltCompanion";
import { BrutalSidebar, navItems } from "@/components/BrutalSidebar";
import {
  filters,
  profile,
  projects,
  services,
  skills,
  stats,
  type ProjectCategory,
} from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aris Krisnanto · Fullstack & Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio Aris Krisnanto (ARSK-11): fullstack & frontend developer. React, TypeScript, Node.js, PHP, dan Python — dashboard, web app, API, dan tooling.",
      },
      { property: "og:title", content: "Aris Krisnanto · Fullstack & Frontend Developer" },
      {
        property: "og:description",
        content:
          "Proyek pilihan, skill stack, dan cara menghubungi saya. Dibangun dengan React, TypeScript, GSAP, dan Motion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://mythic-dashboard.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          url: "https://mythic-dashboard.lovable.app/",
          sameAs: [profile.github, profile.linkedin],
        }),
      },
    ],
  }),
  component: Portfolio,
});

const spring = { type: "spring" as const, stiffness: 220, damping: 24 };

function Portfolio() {
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [dream, setDream] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  // GSAP: scroll reveals, number counters, parallax, active-section tracking
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context((self) => {
      const root = self.selector!;

      gsap.from(root("[data-gsap-hero] > *"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
      });

      root("[data-count]").forEach((el: HTMLElement) => {
        const target = Number(el.dataset["count"] ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      root("[data-skill-bar]").forEach((el: HTMLElement) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      root("[data-gsap-reveal]").forEach((el: HTMLElement) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      root("[data-gsap-parallax]").forEach((el: HTMLElement) => {
        gsap.to(el, {
          y: -110,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (s) => s.isActive && setActiveSection(item.id),
        });
      });
    }, shellRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter],
  );
  const selected = (projects.find((p) => p.id === selectedId) ?? projects[0])!;

  const changeFilter = (key: "all" | ProjectCategory) => {
    setFilter(key);
    const next = projects.filter((p) => key === "all" || p.category === key);
    if (next.length && !next.some((p) => p.id === selectedId)) setSelectedId(next[0]!.id);
  };

  const nextProject = () => {
    if (!visible.length) return;
    const idx = visible.findIndex((p) => p.id === selectedId);
    setSelectedId(visible[idx === -1 ? 0 : (idx + 1) % visible.length]!.id);
  };

  const copyContact = async () => {
    const card = [
      profile.name.toUpperCase(),
      profile.role,
      "",
      `GitHub: ${profile.github}`,
      `LinkedIn: ${profile.linkedin}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(card);
    } catch {
      /* clipboard unavailable */
    }
    toast("Kontak disalin.");
  };

  return (
    <div
      ref={shellRef}
      className={cn(
        "flex min-h-screen font-display text-ink transition-colors duration-500",
        dream ? "brut-surface-dream" : "brut-surface",
      )}
    >
      <WavyScroll dream={dream} />
      <BrutalSidebar
        active={activeSection}
        dream={dream}
        onToggleDream={() => setDream((d) => !d)}
        onNavigate={scrollTo}
      />
      <main className="relative z-10 mx-auto w-[min(1440px,calc(100%-32px))] min-w-0 pb-16 pt-7">
        {/* Hero */}
        <header
          id="hero"
          className={cn(
            "relative grid overflow-hidden bento-card lg:min-h-[510px] lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.7fr)]",
            dream && "brut-dream-hero",
          )}
        >
          <div
            data-gsap-parallax
            className="pointer-events-none absolute -bottom-[130px] right-[30%] hidden size-[260px] rounded-full border-[3px] border-ink bg-brut-pink md:block"
          />
          <div
            data-gsap-hero
            className="relative z-[2] flex min-w-0 flex-col items-start justify-center p-8 sm:p-12 lg:p-20"
          >
            <p className="mb-2.5 brut-eyebrow">
              {profile.role} · Available for work
            </p>
            <h1 className="max-w-[760px] text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              Aris
              <motion.span
                key={dream ? "dream" : "real"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
                className="block brut-stroke-title"
              >
                Krisnanto
              </motion.span>
            </h1>
            <p className="mt-7 max-w-[680px] text-[clamp(1rem,1.7vw,1.24rem)] leading-relaxed">
              {profile.tagline}
            </p>
            <div className="mt-8 flex w-full flex-wrap gap-3.5">
              <Button
                variant="brutal"
                size="brut"
                onClick={() => scrollTo("projects")}
                className="w-full justify-between gap-6 sm:w-auto"
              >
                <span>Lihat projects</span>
                <span aria-hidden="true">↗</span>
              </Button>
              <Button variant="brutalOutline" size="brut" asChild className="w-full sm:w-auto">
                <a href={profile.github} target="_blank" rel="noreferrer noopener">
                  <Github className="size-4" aria-hidden="true" /> GitHub
                </a>
              </Button>
              <Button variant="brutalOutline" size="brut" asChild className="w-full sm:w-auto">
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "relative z-[1] grid min-h-[300px] place-items-center border-t-[3px] border-ink p-8 lg:border-l-[3px] lg:border-t-0",
              dream ? "bg-brut-purple" : "bg-brut-blue",
            )}
          >
            <ShipSymbol dream={dream} />
            <p className="absolute inset-x-5 bottom-4 text-center brut-eyebrow">
              @{profile.handle}
            </p>
          </div>
        </header>

        {/* Stats */}
        <section
          id="stats"
          aria-label="Statistik"
          className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.article
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.06 }}
              className={cn("flex min-h-[220px] flex-col p-6 bento-card", s.bg)}
            >
              <p className="brut-mono">{s.label}</p>
              <strong className="mt-auto text-[clamp(4rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.08em]">
                <span data-count={s.value}>0</span>
              </strong>
              <span className="mt-3 font-semibold leading-snug">{s.caption}</span>
            </motion.article>
          ))}
        </section>

        {/* Skills */}
        <section id="skills" data-gsap-reveal className="mt-7 p-7 bento-card sm:p-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2.5 brut-eyebrow">Tech stack</p>
              <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] brut-title">Skill yang saya pakai</h2>
            </div>
            <p className="max-w-[420px] leading-relaxed">
              Kombinasi frontend, backend, dan tooling. Sebagian dipakai harian, sebagian untuk
              eksperimen dan otomasi.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-semibold">{s.name}</span>
                  <span className="font-mono-brut text-sm font-bold">{s.level}%</span>
                </div>
                <div className="h-[26px] overflow-hidden rounded-full border-[3px] border-ink brut-meter-track">
                  <span
                    data-skill-bar
                    className={cn("block h-full border-r-[3px] border-ink", s.bg)}
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-gsap-reveal className="mt-16">
          <div className="mb-6 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2.5 brut-eyebrow">Selected work</p>
              <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] brut-title">
                Projects pilihan dari GitHub
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5" aria-label="Filter project">
              {filters.map((f) => (
                <Button
                  key={f.key}
                  variant={filter === f.key ? "brutalPillActive" : "brutalPill"}
                  size="brutPill"
                  onClick={() => changeFilter(f.key)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visible.map((project) => (
                  <motion.button
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={spring}
                    whileHover={{ x: -3, y: -3, boxShadow: "8px 8px 0 var(--ink)" }}
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    data-volt-say={`${project.title} — ${project.stack}. ${project.summary}`}
                    aria-label={`Lihat detail ${project.title}`}
                    style={
                      selected.id === project.id && !dream ? { background: project.color } : {}
                    }
                    className={cn(
                      "relative min-h-[250px] overflow-hidden p-6 text-left bento-card-sm",
                      dream && "brut-dream-card",
                      selected.id === project.id &&
                        "-translate-x-[3px] -translate-y-[3px] shadow-[8px_8px_0_var(--ink)]",
                    )}
                  >
                    <span
                      className="absolute -bottom-6 -right-6 size-[90px] rounded-full border-[3px] border-ink"
                      style={{ background: project.color }}
                    />
                    <div className="flex justify-between gap-4">
                      <span className="brut-mono">{project.categoryLabel}</span>
                      <span className="brut-mono">{project.year}</span>
                    </div>
                    <h3 className="mb-3 mt-10 max-w-[85%] text-[clamp(1.4rem,2.6vw,2.1rem)] leading-none tracking-[-0.045em]">
                      {project.title}
                    </h3>
                    <p className="max-w-[86%] leading-relaxed">{project.summary}</p>
                    <p className="mt-4 brut-mono">{project.stack}</p>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <aside
              aria-live="polite"
              className="min-w-0 bg-ink p-7 text-brut-white bento-card lg:sticky lg:top-5"
              style={{ background: "var(--ink)", color: "var(--white)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="rounded-full border-2 border-brut-white px-2.5 py-2 font-mono-brut text-[0.68rem] font-bold uppercase tracking-wider text-ink"
                  style={{ background: selected.color }}
                >
                  {selected.role}
                </span>
                <span className="brut-mono">{selected.year}</span>
              </div>
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                <p className="mb-2.5 mt-11 brut-mono text-brut-yellow">{selected.categoryLabel}</p>
                <h3 className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[0.95] tracking-[-0.055em]">
                  {selected.title}
                </h3>
                <div className="mt-8">
                  <span className="brut-mono">Tentang project</span>
                  <p className="mt-2.5 leading-relaxed opacity-80">{selected.detail}</p>
                </div>
                <div className="mt-8">
                  <span className="brut-mono">Stack</span>
                  <p className="mt-2.5 leading-relaxed opacity-80">{selected.stack}</p>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border-2 border-brut-white bg-brut-purple p-4 text-ink">
                  <div>
                    <span className="brut-mono">Highlight</span>
                    <strong className="mt-1.5 block leading-snug">{selected.highlight}</strong>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid aspect-square w-[50px] shrink-0 place-items-center rounded-full border-2 border-ink bg-brut-white text-xl"
                  >
                    {selected.icon}
                  </span>
                </div>
              </motion.div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="brutalDark" size="brut" asChild>
                  <a href={selected.github} target="_blank" rel="noreferrer noopener">
                    <Github className="size-4" aria-hidden="true" /> Source
                  </a>
                </Button>
                {selected.live && (
                  <Button variant="brutalDark" size="brut" asChild>
                    <a href={selected.live} target="_blank" rel="noreferrer noopener">
                      <ExternalLink className="size-4" aria-hidden="true" /> Live
                    </a>
                  </Button>
                )}
                <Button variant="brutalText" size="brutText" onClick={nextProject}>
                  Project berikutnya
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mt-16 grid gap-5 lg:grid-cols-3">
          {services.map((r, i) => (
            <motion.article
              key={r.number}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className={cn("relative min-h-[340px] overflow-hidden p-8 bento-card", r.bg)}
            >
              <span className="absolute right-6 top-4 text-[5rem] font-bold tracking-[-0.08em] text-ink/15">
                {r.number}
              </span>
              <p className="brut-eyebrow">{r.eyebrow}</p>
              <h3 className="mb-5 mt-[90px] text-[clamp(1.7rem,3.3vw,3rem)] leading-none tracking-[-0.05em]">
                {r.title}
              </h3>
              <p className="leading-relaxed">{r.body}</p>
            </motion.article>
          ))}
        </section>

        {/* Contact */}
        <footer
          id="contact"
          data-gsap-reveal
          className={cn(
            "mt-7 flex flex-col items-start justify-between gap-6 p-8 bento-card sm:p-12 lg:flex-row lg:items-center",
            dream ? "bg-brut-purple" : "bg-brut-green",
          )}
        >
          <div>
            <p className="mb-2.5 brut-eyebrow">Mari bekerja sama</p>
            <h2 className="max-w-[620px] text-[clamp(1.8rem,4vw,3.6rem)] brut-title">
              Punya project? Saya siap bantu bangun.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="brutal" size="brut" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="size-4" aria-hidden="true" /> Hubungi via LinkedIn
                </a>
              </Button>
              <Button variant="brutalOutline" size="brut" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer noopener">
                  <Github className="size-4" aria-hidden="true" /> github.com/{profile.handle}
                </a>
              </Button>
              <Button variant="brutalText" size="brutText" onClick={copyContact}>
                Salin kontak
              </Button>
            </div>
          </div>
          <p className="font-mono-brut text-[0.78rem] uppercase leading-relaxed lg:text-right">
            {profile.name}
            <br />
            {profile.role}
            <br />
            <a href={profile.oldSite} target="_blank" rel="noreferrer noopener" className="underline">
              portfolio v1
            </a>
          </p>
        </footer>
      </main>
      <VoltCompanion />
    </div>
  );
}
