import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import "./volt-robot.css";

const IDLE = [
  "Hi. I'm Volt. I watch this dashboard.",
  "Hover a journey card. I'll gossip.",
  "Ten years late. Rough delivery.",
];
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

export function VoltCompanion() {
  const robotRef = useRef<HTMLDivElement>(null);
  const head3dRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const lastSaid = useRef("");
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mood, setMood] = useState("idle");
  const [text, setText] = useState(IDLE[0]!);
  const [visible, setVisible] = useState(true);

  const say = useCallback((t: string) => {
    if (t === lastSaid.current) return;
    lastSaid.current = t;
    setText(t);
    setVisible(true);
    const b = bubbleRef.current;
    if (b) {
      b.classList.remove("pop");
      void b.offsetWidth;
      b.classList.add("pop");
    }
  }, []);

  const look = (x: number, y: number) => {
    eyesRef.current?.style.setProperty("--lx", `${x}px`);
    eyesRef.current?.style.setProperty("--ly", `${y}px`);
  };
  const tilt = (ry: number, rx: number) => {
    head3dRef.current?.style.setProperty("--ry", `${ry}deg`);
    head3dRef.current?.style.setProperty("--rx", `${rx}deg`);
  };

  // blink + cursor follow
  useEffect(() => {
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (!alive) return;
        eyesRef.current?.classList.add("blink");
        setTimeout(() => eyesRef.current?.classList.remove("blink"), 150);
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();

    let raf = false;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        raf = false;
        const robot = robotRef.current;
        if (!robot) return;
        const r = robot.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 420));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 420));
        look(dx * 7, dy * 6);
        tilt(dx * 12, -dy * 9);
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => {
      alive = false;
      clearTimeout(t);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  // react to hovering any [data-volt-say] element (journey cards)
  useEffect(() => {
    const scheduleIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setMood("idle");
        say(pick(IDLE));
      }, 4200);
    };

    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-volt-say]");
      if (!target) return;
      const line = target.getAttribute("data-volt-say");
      if (!line) return;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      setMood("watching");
      say(line);
    };
    const onOut = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-volt-say]");
      if (target) scheduleIdle();
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("focusin", onOver);
    scheduleIdle();
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("focusin", onOver);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [say]);

  return (
    <div className="volt volt--corner" aria-hidden={false}>
      <div className="robot" data-mood={mood} ref={robotRef}>
        <div
          className={visible ? "bubble" : "bubble is-hidden"}
          ref={bubbleRef}
          role="status"
          aria-live="polite"
        >
          <span>{text}</span>
        </div>
        <div className="antenna" aria-hidden="true">
          <span className="antenna-rod" />
          <span className="antenna-tip" />
        </div>
        <div className="head3d" ref={head3dRef} aria-hidden="true">
          <div className="head">
            <span className="ear ear--l" />
            <span className="ear ear--r" />
            <div className="face face--front">
              <div className="visor">
                <div className="eyes" ref={eyesRef}>
                  <span className="eye eye--l" />
                  <span className="eye eye--r" />
                </div>
                <span className="cheek cheek--l" />
                <span className="cheek cheek--r" />
                <span className="mouth" />
              </div>
            </div>
            <div className="face face--back" />
          </div>
        </div>
      </div>
    </div>
  );
}
