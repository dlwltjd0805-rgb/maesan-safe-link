import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Map, Megaphone, Users, Siren, User } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const tabs = [
  { to: "/", label: "지도", icon: Map },
  { to: "/report", label: "제보", icon: Megaphone },
  { to: "/mapping", label: "매핑", icon: Users },
  { to: "/sos", label: "SOS", icon: Siren },
  { to: "/me", label: "내정보", icon: User },
] as const;

function formatNow(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const period = h < 12 ? "오전" : "오후";
  h = h % 12 || 12;
  return `${period} ${h}:${m}`;
}

export function AppShell({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => setNow(formatNow(new Date()));
    tick();
    const id = window.setInterval(tick, 1000 * 15);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-background px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            안심
          </div>
          <div>
            <div className="text-lg font-bold leading-tight">매산동 안심-링크</div>
            <div className="text-xs text-muted-foreground">수원시 팔달구 매산동</div>
          </div>
        </div>
        {now && (
          <div className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
            {now} · 매산동
          </div>
        )}
      </header>

      <main className="flex-1 pb-24">{children ?? <Outlet />}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[480px] border-t border-border bg-background">
        <ul className="grid grid-cols-5">
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            const isSos = to === "/sos";
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex flex-col items-center justify-center gap-1 py-3 text-[13px] font-semibold transition-colors ${
                    active
                      ? isSos
                        ? "text-destructive"
                        : "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {isSos ? (
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        active ? "bg-destructive text-white" : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  ) : (
                    <Icon className="h-6 w-6" strokeWidth={active ? 2.4 : 2} />
                  )}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
