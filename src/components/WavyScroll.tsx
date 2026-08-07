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

export function WavyScroll({ dream = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      tl.to(path, {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={wavePath}
          fill="none"
          stroke={dream ? "var(--brut-pink)" : "var(--brut-orange)"}
          strokeWidth="54"
          strokeLinecap="round"
          opacity="1"
        />
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
