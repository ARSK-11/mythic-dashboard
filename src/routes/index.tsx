import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ShipSymbol } from "@/components/ShipSymbol";
import { BrutalSidebar, navItems } from "@/components/BrutalSidebar";
import { filters, incidents, remediations, stats, type IncidentCategory } from "@/lib/incidents";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Return to Ithaca · Odysseus Project Postmortem Dashboard" },
      {
        name: "description",
        content:
          "A mythological project postmortem dashboard: audit the distractions, blockers, and communication failures that turned Odysseus' trip home into a ten-year delay.",
      },
      { property: "og:title", content: "Return to Ithaca · Project Postmortem Dashboard" },
      {
        property: "og:description",
        content:
          "Incident registry, delivery health audit, and remediation plan for the most famous ten-year delivery delay in history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const spring = { type: "spring" as const, stiffness: 220, damping: 24 };

function Dashboard() {
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState<"all" | IncidentCategory>("all");
  const [dream, setDream] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditing, setAuditing] = useState(false);
  const [grade, setGrade] = useState("?");
  const [status, setStatus] = useState(
    "Audit not started. Heroic reputation is currently protecting the project lead from scrutiny.",
  );
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
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
    () => incidents.filter((i) => filter === "all" || i.category === filter),
    [filter],
  );
  const selected = (incidents.find((i) => i.id === selectedId) ?? incidents[0])!;

  const runAudit = () => {
    if (timer.current) clearInterval(timer.current);
    setAuditing(true);
    setGrade("…");
    setProgress(0);
    setStatus(
      "Reviewing detours, blockers, crew permissions, divine dependencies, and mast-based automation.",
    );
    let p = 0;
    timer.current = setInterval(() => {
      p += Math.floor(Math.random() * 8) + 3;
      if (p >= 100) {
        p = 100;
        if (timer.current) clearInterval(timer.current);
        setGrade("D−");
        setAuditing(false);
        setStatus(
          "Audit complete: approximately 86% of the journey delay could have been reduced through delegation, access control, deadlines, and earlier escalation.",
        );
        toast("Audit complete. The gods have been notified.");
      }
      setProgress(p);
    }, 90);
  };

  const nextIncident = () => {
    if (!visible.length) return;
    const idx = visible.findIndex((i) => i.id === selectedId);
    setSelectedId(visible[idx === -1 ? 0 : (idx + 1) % visible.length]!.id);
  };

  const changeFilter = (key: "all" | IncidentCategory) => {
    setFilter(key);
    const next = incidents.filter((i) => key === "all" || i.category === key);
    if (next.length && !next.some((i) => i.id === selectedId)) setSelectedId(next[0]!.id);
  };

  const copyReport = async () => {
    const report = [
      "ODYSSEUS PROJECT POSTMORTEM",
      "",
      `Incident: ${selected.title}`,
      `Category: ${selected.categoryLabel}`,
      `Duration: ${selected.duration}`,
      "",
      `What happened: ${selected.issue}`,
      "",
      `Recommended response: ${selected.action}`,
      "",
      `System required: ${selected.system}`,
      "",
      "Final assessment: Legendary hero. Questionable project manager.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(report);
    } catch {
      /* clipboard unavailable */
    }
    toast("Postmortem copied.");
  };

  return (
    <div
      ref={shellRef}
      className={cn(
        "flex min-h-screen font-display text-ink transition-colors duration-500",
        dream ? "brut-surface-dream" : "brut-surface",
      )}
    >
      <BrutalSidebar
        active={activeSection}
        dream={dream}
        onToggleDream={() => setDream((d) => !d)}
        onNavigate={scrollTo}
      />
      <main className="mx-auto w-[min(1440px,calc(100%-32px))] min-w-0 pb-16 pt-7">
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

              {dream
                ? "Unreliable Narrative Mode · Dream Hypothesis"
                : "Olympus Operations · Project Postmortem"}
            </p>
            <h1 className="max-w-[760px] text-[clamp(3.2rem,9vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              {dream ? "Was Ithaca " : "Return to "}
              <motion.span
                key={dream ? "dream" : "real"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
                className="block brut-stroke-title"
              >
                {dream ? "Ever Real?" : "Ithaca"}
              </motion.span>
            </h1>
            <p className="mt-7 max-w-[680px] text-[clamp(1rem,1.7vw,1.24rem)] leading-relaxed">
              {dream
                ? "Perhaps the monsters, goddesses, storms, and ten-year detour were not project failures at all—but symbols inside one extremely elaborate dream."
                : "A routine trip home became a ten-year delivery delay involving monsters, divine interference, poor delegation, and one extremely manual automation."}
            </p>
            <div className="mt-8 flex w-full flex-wrap gap-3.5">
              <Button
                variant="brutal"
                size="brut"
                onClick={runAudit}
                disabled={auditing}
                className="w-full justify-between gap-6 sm:w-auto"
              >
                <span>{auditing ? "Auditing mythology…" : progress === 100 ? "Run audit again" : "Run project audit"}</span>
                <span aria-hidden="true">↗</span>
              </Button>
              <Button
                variant="brutalOutline"
                size="brut"
                aria-pressed={dream}
                onClick={() => setDream((d) => !d)}
                className="w-full sm:w-auto"
              >
                Dream theory: {dream ? "ON" : "OFF"}
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
              {dream ? "Reality status unknown" : "Destination overdue"}
            </p>
          </div>
        </header>

        {/* Stats */}
        <section aria-label="Project statistics" className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                {s.value}
              </strong>
              <span className="mt-3 font-semibold leading-snug">{s.caption}</span>
            </motion.article>
          ))}
        </section>

        {/* Audit */}
        <section className="mt-7 p-7 bento-card sm:p-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2.5 brut-eyebrow">Delivery health</p>
              <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] brut-title">Journey efficiency audit</h2>
            </div>
            <motion.strong
              key={grade}
              initial={{ scale: 0.8, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={spring}
              className="grid aspect-square w-[72px] shrink-0 place-items-center rounded-full border-[3px] border-ink bg-brut-pink text-4xl shadow-[4px_4px_0_var(--ink)] sm:w-[90px]"
            >
              {grade}
            </motion.strong>
          </div>
          <div
            role="progressbar"
            aria-label="Audit progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-8 h-[34px] overflow-hidden rounded-full border-[3px] border-ink brut-meter-track"
          >
            <motion.span
              className="block h-full border-r-[3px] border-ink bg-brut-green"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="m-0 max-w-[820px] leading-relaxed">{status}</p>
            <span className="shrink-0 font-mono-brut text-xl font-bold">{progress}%</span>
          </div>
        </section>

        {/* Incidents */}
        <section className="mt-16">
          <div className="mb-6 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-2.5 brut-eyebrow">Incident registry</p>
              <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] brut-title">
                Where the journey went wrong
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5" aria-label="Incident filters">
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
                {visible.map((incident) => (
                  <motion.button
                    key={incident.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={spring}
                    whileHover={{ x: -3, y: -3, boxShadow: "8px 8px 0 var(--ink)" }}
                    type="button"
                    onClick={() => setSelectedId(incident.id)}
                    aria-label={`View ${incident.title} incident`}
                    style={
                      selected.id === incident.id && !dream
                        ? { background: incident.color }
                        : {}
                    }
                    className={cn(
                      "relative min-h-[250px] overflow-hidden p-6 text-left bento-card-sm",
                      dream && "brut-dream-card",
                      selected.id === incident.id && "-translate-x-[3px] -translate-y-[3px] shadow-[8px_8px_0_var(--ink)]",
                    )}
                  >
                    <span
                      className="absolute -bottom-6 -right-6 size-[90px] rounded-full border-[3px] border-ink"
                      style={{ background: incident.color }}
                    />
                    <div className="flex justify-between gap-4">
                      <span className="brut-mono">
                        Incident {String(incident.id).padStart(2, "0")}
                      </span>
                      <span className="brut-mono">{incident.duration}</span>
                    </div>
                    <h3 className="mb-3 mt-10 max-w-[85%] text-[clamp(1.5rem,3vw,2.4rem)] leading-none tracking-[-0.045em]">
                      {incident.title}
                    </h3>
                    <p className="max-w-[86%] leading-relaxed">{incident.summary}</p>
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
                  {selected.severity}
                </span>
                <span className="brut-mono">
                  Incident {String(selected.id).padStart(2, "0")}
                </span>
              </div>
              <motion.div key={selected.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
                <p className="mb-2.5 mt-11 brut-mono text-brut-yellow">{selected.categoryLabel}</p>
                <h3 className="text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-[-0.055em]">
                  {selected.title}
                </h3>
                <div className="mt-8">
                  <span className="brut-mono">What happened</span>
                  <p className="mt-2.5 leading-relaxed opacity-80">
                    {dream ? `Possible dream symbol: ${selected.issue}` : selected.issue}
                  </p>
                </div>
                <div className="mt-8">
                  <span className="brut-mono">What should have been done</span>
                  <p className="mt-2.5 leading-relaxed opacity-80">{selected.action}</p>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border-2 border-brut-white bg-brut-purple p-4 text-ink">
                  <div>
                    <span className="brut-mono">Recommended system</span>
                    <strong className="mt-1.5 block leading-snug">{selected.system}</strong>
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
                <Button variant="brutalDark" size="brut" onClick={nextIncident}>
                  Next incident
                </Button>
                <Button variant="brutalText" size="brutText" onClick={copyReport}>
                  Copy postmortem
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {/* Remediation */}
        <section className="mt-16 grid gap-5 lg:grid-cols-3">
          {remediations.map((r, i) => (
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

        <footer
          className={cn(
            "mt-7 flex flex-col items-start justify-between gap-5 p-8 bento-card sm:flex-row sm:items-center sm:p-12",
            dream ? "bg-brut-purple" : "bg-brut-green",
          )}
        >
          <div>
            <p className="mb-2.5 brut-eyebrow">Final assessment</p>
            <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] brut-title">
              Legendary hero. {dream ? "Possibly unconscious" : "Questionable"} project manager.
            </h2>
          </div>
          <p className="font-mono-brut text-[0.78rem] uppercase leading-relaxed sm:text-right">
            Project: Return to Ithaca
            <br />
            Status: Eventually delivered
          </p>
        </footer>
      </main>
    </div>
  );
}
