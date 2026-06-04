import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Map, Megaphone, Users, Siren, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "지도", icon: Map },
  { to: "/report", label: "제보", icon: Megaphone },
  { to: "/mapping", label: "매핑", icon: Users },
  { to: "/sos", label: "SOS", icon: Siren },
  { to: "/me", label: "내정보", icon: User },
] as const;

export function AppShell({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
