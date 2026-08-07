import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/utils";

interface Props {
  dream?: boolean;
}

// Vertical winding route that sits behind the dashboard as a fixed background layer.
const wavePath =
  "M 980 70 C 720 110, 580 260, 880 350 S 1180 500, 920 610 S 600 760, 980 860";

const stops = [
  { x: 980, y: 70, label: "Troy" },
  { x: 660, y: 180, label: "Cicones" },
  { x: 880, y: 350, label: "Lotus" },
  { x: 1160, y: 500, label: "Cyclops" },
  { x: 920, y: 610, label: "Aeolia" },
  { x: 660, y: 740, label: "Laestrygonia" },
  { x: 980, y: 860, label: "Ithaca" },
];

export function WavyScroll({ dream = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
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

      // Stagger in stop markers as the journey progresses
      stops.forEach((s, i) => {
        const stop = containerRef.current?.querySelector(
          `[data-stop="${s.label}"]`,
        );
        if (!stop) return;
        gsap.set(stop, { opacity: 0, scale: 0.6 });
        tl.to(
          stop,
          {
            opacity: 1,
            scale: 1,
            duration: 0.04,
            ease: "back.out(1.7)",
          },
          0.05 + i * 0.12,
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    >
      {/* Very subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern id="bg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="var(--ink)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="bg-wave-shadow" x="-2%" y="-2%" width="104%" height="108%">
            <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="var(--ink)" />
          </filter>
        </defs>

        {/* Shadow path */}
        <path
          ref={shadowRef}
          d={wavePath}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.1"
        />
        {/* Main path */}
        <path
          ref={pathRef}
          d={wavePath}
          fill="none"
          stroke={dream ? "var(--brut-pink)" : "var(--brut-yellow)"}
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#bg-wave-shadow)"
          opacity="0.35"
        />

        {stops.map((s) => (
          <g key={s.label} data-stop={s.label} className="origin-center">
            <circle cx={s.x} cy={s.y} r="10" fill="var(--ink)" opacity="0.8" />
            <circle cx={s.x} cy={s.y} r="5" fill={dream ? "var(--brut-purple)" : "var(--brut-blue)"} />
            <text
              x={s.x}
              y={s.y - 22}
              textAnchor="middle"
              className="font-mono-brut uppercase"
              fill="var(--ink)"
              fontSize="13"
              fontWeight="700"
              letterSpacing="0.05em"
              opacity="0.55"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Ship marker */}
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
  );
}
