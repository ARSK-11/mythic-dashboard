import { useCallback, useEffect, useRef, useState } from "react";
import "./volt-robot.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;
const LEVELS = ["NOT LOOKING", "TOO SHORT", "GETTING THERE", "STRONG", "FORT KNOX"];

export function VoltRobotLogin() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const head3dRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const peekRef = useRef<HTMLButtonElement>(null);

  const doneRef = useRef(false);
  const lastSaid = useRef("");
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mood, setMood] = useState("idle");
  const [text, setText] = useState("Hi. I'm Volt. I guard this form.");
  const [turned, setTurned] = useState(false);
  const [hyped, setHyped] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [level, setLevel] = useState(0);
  const [panelLabel, setPanelLabel] = useState("NOT LOOKING");
  const [btnLabel, setBtnLabel] = useState("LOG ME IN");

  const mood_ = (m: string) => {
    if (!doneRef.current) setMood(m);
  };

  const say = useCallback((t: string) => {
    if (t === lastSaid.current) return;
    lastSaid.current = t;
    setText(t);
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
  const followTyping = (input: HTMLInputElement | null) => {
    const ratio = Math.min((input?.value.length ?? 0) / 22, 1);
    look(-6 + 12 * ratio, 5);
    tilt(-5 + 10 * ratio, -8);
  };

  // blink loop + mouse follow
  useEffect(() => {
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (!alive) return;
        const robot = robotRef.current;
        if (robot && robot.dataset["mood"] !== "success" && !robot.classList.contains("is-turned")) {
          eyesRef.current?.classList.add("blink");
          setTimeout(() => eyesRef.current?.classList.remove("blink"), 150);
        }
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();

    let raf = false;
    const onMove = (e: MouseEvent) => {
      const active = document.activeElement;
      if (doneRef.current || (active && active.tagName === "INPUT")) return;
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        raf = false;
        const robot = robotRef.current;
        if (!robot) return;
        const r = robot.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 260));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 260));
        look(dx * 7, dy * 6);
        if (!robot.classList.contains("is-turned")) tilt(dx * 12, -dy * 9);
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => {
      alive = false;
      clearTimeout(t);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  const hype = (on: boolean) => {
    if (doneRef.current) return;
    if (on && pressed) return;
    setHyped(on);
    if (on) {
      setTurned(false);
      mood_("excited");
      say(pick(["Ooh. Do it. Press it.", "This is my favorite part."]));
    } else {
      mood_("idle");
      say("The button misses you already.");
    }
  };

  const releasePress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      setPressed(false);
      setMood((m) => (m === "pressed" ? (doneRef.current ? "success" : "excited") : m));
    }, 340);
  };

  const confetti = () => {
    const host = sceneRef.current;
    const origin = btnRef.current?.getBoundingClientRect();
    if (!host || !origin) return;
    const colors = ["#ff6b4b", "#2ec4b6", "#ffc53d", "#23252d", "#fffdf8"];
    const hostRect = host.getBoundingClientRect();
    const ox = origin.left - hostRect.left + origin.width / 2;
    const oy = origin.top - hostRect.top;

    for (let i = 0; i < 70; i++) {
      const bit = document.createElement("span");
      bit.className = "confetti";
      bit.style.background = pick(colors);
      if (Math.random() > 0.5) bit.style.borderRadius = "50%";
      host.appendChild(bit);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const speed = 240 + Math.random() * 380;
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed;
      bit.animate(
        [
          { transform: `translate(${ox}px, ${oy}px) rotate(0deg) scale(1)`, opacity: 1 },
          {
            transform: `translate(${ox + tx}px, ${oy + ty + 320}px) rotate(${
              540 * (Math.random() > 0.5 ? 1 : -1)
            }deg) scale(.6)`,
            opacity: 0,
          },
        ],
        { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(.15,.6,.35,1)" },
      ).onfinish = () => bit.remove();
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doneRef.current) return;

    let complaint: [string, HTMLInputElement | null] | null = null;
    if (!nameRef.current?.value.trim()) complaint = ["Still don't know your name.", nameRef.current];
    else if (!EMAIL_RE.test(emailRef.current?.value.trim() ?? ""))
      complaint = ["That email isn't a real place.", emailRef.current];
    else if (!passRef.current?.value) complaint = ["A password would help.", passRef.current];

    if (complaint) {
      const [msg, field] = complaint;
      setTimeout(() => {
        say(msg);
        mood_("watching");
      }, 380);
      const f = formRef.current;
      if (f) {
        f.classList.remove("shake");
        void f.offsetWidth;
        f.classList.add("shake");
      }
      field?.focus();
      return;
    }

    doneRef.current = true;
    setTurned(false);
    setHyped(false);

    setTimeout(() => {
      setMood("success");
      say(`Access granted. Welcome, ${nameRef.current?.value.trim()}.`);
      setSuccess(true);
      setBtnLabel("ACCESS GRANTED ✓");
      look(0, 0);
      tilt(0, 0);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 950);
        confetti();
      }
    }, 420);

    setTimeout(() => {
      doneRef.current = false;
      setMood("idle");
      setSuccess(false);
      setBtnLabel("LOG ME IN");
      say("Again? I could do this all day.");
    }, 5600);
  };

  return (
    <div className="volt" ref={sceneRef}>
      <main className="stage">
        {/* robot */}
        <div
          className={[
            "robot",
            turned && "is-turned",
            hyped && "is-hyped",
            pressed && "is-pressed",
            spinning && "is-spinning",
          ]
            .filter(Boolean)
            .join(" ")}
          data-mood={mood}
          ref={robotRef}
        >
          <div className="bubble" ref={bubbleRef} role="status" aria-live="polite">
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
              <div className="face face--back">
                <div className="panel">
                  <span className="panel-lights">
                    <i />
                    <i />
                    <i />
                  </span>
                  <div className="meter" data-lvl={level}>
                    {[0, 1, 2, 3].map((i) => (
                      <i key={i} className={i < level ? "on" : undefined} />
                    ))}
                  </div>
                  <p className="panel-label">{panelLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <form className="card" ref={formRef} onSubmit={onSubmit} noValidate>
          <span className="hand hand--l" aria-hidden="true" />
          <span className="hand hand--r" aria-hidden="true" />
          <h1 className="title">Beep boop. Who goes there?</h1>

          <label className="field">
            <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-3.9 0-8 2-8 5v1.5h16V19c0-3-4.1-5-8-5Z" />
            </svg>
            <input
              ref={nameRef}
              type="text"
              placeholder="Your name"
              autoComplete="name"
              aria-label="Your name"
              onFocus={() => {
                setTurned(false);
                mood_("watching");
                say(pick(["A visitor. State your name.", "Typing detected. Go on, I'm watching."]));
                followTyping(nameRef.current);
              }}
              onChange={() => {
                followTyping(nameRef.current);
                const v = nameRef.current?.value.trim() ?? "";
                if (v.length >= 2) say(`${v}. Solid name. Filed forever.`);
                else if (v.length === 0) say("Deleted. I've already forgotten it. Mostly.");
              }}
            />
          </label>

          <label className="field">
            <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.3L4.4 7h15.2L12 12.3ZM4 9.2V17h16V9.2l-8 5.3-8-5.3Z" />
            </svg>
            <input
              ref={emailRef}
              type="email"
              placeholder="Your email"
              autoComplete="email"
              aria-label="Your email"
              onFocus={() => {
                setTurned(false);
                mood_("watching");
                say("Email next. I don't do spam — I don't even have an inbox.");
                followTyping(emailRef.current);
              }}
              onChange={() => {
                followTyping(emailRef.current);
                const v = emailRef.current?.value.trim() ?? "";
                if (EMAIL_RE.test(v)) {
                  mood_("happy");
                  say(
                    pick([
                      "Now that is a proper email. Respect.",
                      "Valid address detected. Quietly delighted.",
                    ]),
                  );
                } else {
                  mood_("watching");
                  if (v.includes("@")) say("Close. My sensors say: not yet.");
                }
              }}
            />
          </label>

          <label className="field">
            <svg className="field-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3H9Zm3 4a2 2 0 0 1 1 3.7V19h-2v-1.3a2 2 0 0 1 1-3.7Z" />
            </svg>
            <input
              ref={passRef}
              type={showPass ? "text" : "password"}
              placeholder="Super secret password"
              autoComplete="new-password"
              aria-label="Password"
              onFocus={() => {
                mood_("shy");
                setTurned(true);
                look(0, 0);
                tilt(0, 0);
                say("A secret? Say no more. *turns around*");
                setPanelLabel("NOT LOOKING");
              }}
              onBlur={(e) => {
                if (e.relatedTarget === peekRef.current) return;
                setTurned(false);
              }}
              onChange={() => {
                const v = passRef.current?.value ?? "";
                let score = 0;
                if (v.length >= 8) score++;
                if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
                if (/\d/.test(v)) score++;
                if (/[^a-zA-Z0-9]/.test(v)) score++;
                if (v.length > 0 && score === 0) score = 1;
                setLevel(score);
                setPanelLabel(v.length === 0 ? "NOT LOOKING" : LEVELS[score]!);
              }}
            />
            <button
              className="peek"
              ref={peekRef}
              type="button"
              aria-label={showPass ? "Hide password" : "Show password"}
              aria-pressed={showPass}
              onClick={() => {
                const next = !showPass;
                setShowPass(next);
                if (next) say("Revealing it? Good thing I'm facing the wall.");
                passRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5c-5 0-9.3 3.1-11 7.5C2.7 16.9 7 20 12 20s9.3-3.1 11-7.5C21.3 8.1 17 5 12 5Zm0 12.5a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z" />
              </svg>
            </button>
          </label>

          <button
            className={success ? "btn is-success" : "btn"}
            ref={btnRef}
            type="submit"
            onMouseEnter={() => hype(true)}
            onMouseLeave={() => hype(false)}
            onFocus={() => hype(true)}
            onBlur={() => hype(false)}
            onPointerDown={() => {
              if (pressTimer.current) clearTimeout(pressTimer.current);
              setPressed(true);
              setMood("pressed");
              say(pick(["Ahh. That's the stuff.", "Mmm. Satisfying.", "Beep. Do that again."]));
            }}
            onPointerUp={releasePress}
            onPointerCancel={releasePress}
            onPointerLeave={() => pressed && releasePress()}
          >
            <span className="btn-bolt" aria-hidden="true">
              ⚡
            </span>
            <span className="btn-label">{btnLabel}</span>
          </button>

          <span className="foot foot--l" aria-hidden="true" />
          <span className="foot foot--r" aria-hidden="true" />
        </form>
      </main>
    </div>
  );
}
