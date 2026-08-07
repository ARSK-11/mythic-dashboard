import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  dream?: boolean;
}

const wavePath =
  "M -60 140 C 80 140, 120 40, 240 40 S 380 200, 520 130 S 680 20, 820 80 S 980 190, 1120 110 S 1280 40, 1400 100";

const stops = [
  { x: 180, y: 50, label: "Troy" },
  { x: 360, y: 170, label: "Cicones" },
  { x: 520, y: 130, label: "Lotus" },
  { x: 700, y: 40, label: "Cyclops" },
  { x: 880, y: 100, label: "Aeolia" },
  { x: 1060, y: 150, label: "Laestrygonia" },
  { x: 1240, y: 70, label: "Ithaca" },
];

export function WavyScroll({ dream = false }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const shadow = shadowRef.current;
      if (!path || !shadow) return;

      const length = path.getTotalLength();
      [path, shadow].forEach((p) => {
        gsap.set(p, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.2,
        },
      });

      tl.to([path, shadow], {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none",
      });

      if (shipRef.current) {
        tl.fromTo(
          shipRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.08 },
          0.02,
        );
        tl.to(
          shipRef.current,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 1,
            ease: "none",
          },
          0,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-label="Animated journey route"
      className={cn(
        "relative my-7 overflow-hidden rounded-[22px] border-[3px] border-ink py-10 shadow-[7px_7px_0_var(--ink)]",
        dream ? "bg-brut-purple" : "bg-brut-blue",
      )}
    >
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0" xmlns="http://www.w3.org/2000/svg">
          <pattern id="wave-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="var(--ink)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-grid)" />
        </svg>
      </div>

      <div className="relative px-6 sm:px-12">
        <p className="brut-eyebrow text-ink/80">Scroll-animated voyage</p>
        <h2 className="mt-2 text-[clamp(1.8rem,4vw,3.6rem)] brut-title text-white">
          The winding route home
        </h2>
      </div>

      <div className="relative mt-8 h-[200px] w-full overflow-hidden sm:h-[240px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="wiggle-shadow" x="-2%" y="-2%" width="104%" height="108%">
              <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="var(--ink)" />
            </filter>
          </defs>

          {/* shadow path */}
          <path
            ref={shadowRef}
            d={wavePath}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* main path */}
          <path
            ref={pathRef}
            d={wavePath}
            fill="none"
            stroke={dream ? "var(--brut-pink)" : "var(--brut-yellow)"}
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#wiggle-shadow)"
          />

          {/* stop markers */}
          {stops.map((s, i) => (
            <motion.g
              key={s.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, type: "spring" }}
            >
              <circle cx={s.x} cy={s.y} r="10" fill="var(--ink)" />
              <circle cx={s.x} cy={s.y} r="5" fill={dream ? "var(--brut-purple)" : "var(--brut-blue)"} />
              <text
                x={s.x}
                y={s.y - 22}
                textAnchor="middle"
                className="font-mono-brut"
                fill="var(--ink)"
                fontSize="13"
                fontWeight="700"
                letterSpacing="0.05em"
                textTransform="uppercase"
              >
                {s.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* ship marker */}
        <div
          ref={shipRef}
          className="pointer-events-none absolute left-0 top-0 opacity-0"
          style={{ width: 44, height: 44, marginLeft: -22, marginTop: -22 }}
        >
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-full border-[3px] border-ink shadow-[3px_3px_0_var(--ink)]",
              dream ? "bg-brut-pink" : "bg-brut-white",
            )}
          >
            <span className="text-xl">⛵</span>
          </div>
        </div>
      </div>

      <p className="relative mt-4 px-6 text-center font-mono-brut text-sm font-medium text-ink/90 sm:px-12">
        Scroll down to trace the ten-year detour from Troy to Ithaca.
      </p>
    </section>
  );
}
