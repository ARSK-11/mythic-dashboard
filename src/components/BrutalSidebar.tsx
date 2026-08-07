import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ChevronLeft, Compass, BarChart3, Gauge, ScrollText, Wrench, Moon, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const navItems = [
  { id: "hero", label: "Overview", icon: Compass },
  { id: "stats", label: "Statistik", icon: BarChart3 },
  { id: "skills", label: "Skill stack", icon: Gauge },
  { id: "projects", label: "Projects", icon: ScrollText },
  { id: "services", label: "Layanan", icon: Wrench },
  { id: "contact", label: "Kontak", icon: Mail },
];


interface Props {
  active: string;
  dream: boolean;
  onToggleDream: () => void;
  onNavigate: (id: string) => void;
}

export function BrutalSidebar({ active, dream, onToggleDream, onNavigate }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-nav-item]", {
        x: -34,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.07,
      });
    }, listRef);
    return () => ctx.revert();
  }, [collapsed]);

  useEffect(() => {
    if (!mobileOpen || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, { x: -320, duration: 0.45, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, [mobileOpen]);

  const go = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  const inner = (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center justify-between gap-2">
        {!collapsed && (
          <span className="font-mono-brut text-[0.7rem] font-bold uppercase tracking-[0.2em]">
            ARSK-11
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          className="hidden size-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-brut-yellow transition-transform hover:-translate-y-0.5 lg:grid"
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="grid size-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-brut-pink lg:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      <nav aria-label="Dashboard sections" className="min-h-0 flex-1">
        <ul ref={listRef} className="flex flex-col gap-2.5">
          {navItems.map((item) => (
            <li key={item.id} data-nav-item>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border-[3px] border-ink px-3 py-3 text-left font-semibold transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_var(--ink)]",
                  active === item.id
                    ? "-translate-x-[2px] -translate-y-[2px] bg-brut-blue shadow-[5px_5px_0_var(--ink)]"
                    : "bg-brut-white",
                  collapsed && "justify-center px-0",
                )}
              >
                <item.icon className="size-5 shrink-0" aria-hidden="true" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        variant={dream ? "brutal" : "brutalOutline"}
        size="brut"
        onClick={onToggleDream}
        aria-pressed={dream}
        className={cn("w-full gap-2", collapsed && "px-0")}
      >
        <Moon className="size-4 shrink-0" aria-hidden="true" />
        {!collapsed && <span>Neon {dream ? "ON" : "OFF"}</span>}
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="fixed bottom-5 left-5 z-50 grid size-14 place-items-center rounded-full border-[3px] border-ink bg-brut-yellow shadow-[5px_5px_0_var(--ink)] lg:hidden"
      >
        <Menu className="size-6" />
      </button>

      {/* Desktop rail */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r-[3px] border-ink bg-paper/70 backdrop-blur-sm transition-[width] duration-300 lg:block",
          collapsed ? "w-[86px]" : "w-[248px]",
        )}
      >
        {inner}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside
            ref={panelRef}
            className="absolute inset-y-0 left-0 w-[270px] border-r-[3px] border-ink bg-paper"
          >
            {inner}
          </aside>
        </div>
      )}
    </>
  );
}
