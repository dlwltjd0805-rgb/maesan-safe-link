import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "내정보 — 매산동 안심-링크" }] }),
  component: MePage,
});

function MePage() {
  const items = [
    { icon: Bell, label: "알림 설정" },
    { icon: Shield, label: "비상 연락처" },
    { icon: HelpCircle, label: "도움말 · 사용법" },
  ];
  return (
    <AppShell>
      <section className="px-4 pt-4">
        <div className="rounded-3xl bg-primary/10 p-5">
          <div className="text-sm font-bold text-primary">매산동 주민</div>
          <h1 className="mt-1 text-2xl font-bold">안녕하세요, 김안심 님</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            지금까지 안심 활동 12회 · 제보 3건
          </p>
        </div>
      </section>
      <section className="px-4 pt-4">
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {items.map(({ icon: Icon, label }) => (
            <li key={label}>
              <button className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-lg font-semibold active:bg-secondary">
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" /> {label}
                </span>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
