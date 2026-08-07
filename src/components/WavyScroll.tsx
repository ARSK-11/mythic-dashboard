import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/utils";

interface Props {
  dream?: boolean;
}

// Big, centred, winding route that starts at the top-middle and snakes down
// to the bottom-middle of the viewport. The curve is thick and rounded.
const wavePath =
  "M 800 -30 C 1250 20, 1550 220, 1100 320 C 650 420, 350 520, 800 620 C 1250 720, 1550 820, 1050 920 C 550 1020, 450 950, 800 930";

const stops = [
  { x: 800, y: -30 },
  { x: 1100, y: 320 },
  { x: 800, y: 620 },
  { x: 1050, y: 920 },
  { x: 800, y: 930 },
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

      // Fade in small stop markers as the journey progresses (no text labels)
      stops.forEach((s, i) => {
        const stop = containerRef.current?.querySelector(
          `[data-stop="${i}"]`,
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
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="bg-wave-shadow" x="-2%" y="-2%" width="104%" height="108%">
            <feDropShadow dx="6" dy="6" stdDeviation="0" floodColor="var(--ink)" />
          </filter>
        </defs>

        {/* Shadow path */}
        <path
          ref={shadowRef}
          d={wavePath}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="34"
          strokeLinecap="round"
          opacity="0.12"
        />
        {/* Main path */}
        <path
          ref={pathRef}
          d={wavePath}
          fill="none"
          stroke={dream ? "var(--brut-pink)" : "var(--brut-yellow)"}
          strokeWidth="26"
          strokeLinecap="round"
          filter="url(#bg-wave-shadow)"
          opacity="0.45"
        />

        {stops.map((s, i) => (
          <g key={i} data-stop={i} className="origin-center">
            <circle cx={s.x} cy={s.y} r="14" fill="var(--ink)" opacity="0.8" />
            <circle cx={s.x} cy={s.y} r="8" fill={dream ? "var(--brut-purple)" : "var(--brut-blue)"} />
          </g>
        ))}
      </svg>

      {/* Ship marker */}
      <div
        ref={shipRef}
        className="pointer-events-none absolute left-0 top-0 opacity-0"
        style={{ width: 48, height: 48, marginLeft: -24, marginTop: -24 }}
      >
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full border-[3px] border-ink shadow-[3px_3px_0_var(--ink)]",
            dream ? "bg-brut-pink" : "bg-brut-white",
          )}
        >
          <span className="text-xl">⛵</span>
        </div>
      </div>
    </div>
  );
}
