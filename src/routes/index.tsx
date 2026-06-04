import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MapView } from "@/components/MapView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "매산동 안심-링크 — 실시간 안심 지도" },
      { name: "description", content: "수원시 매산동 주민을 위한 안전 안심 귀가 앱" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <section className="px-4 pt-4">
        <h1 className="text-2xl font-bold">실시간 안심 지도</h1>
        <p className="mt-1 text-base text-muted-foreground">
          내 주변 안심 폴과 위험 제보를 한눈에 확인하세요.
        </p>
      </section>

      <section className="px-4 pt-3">
        <div className="h-[420px]">
          <MapView />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 pt-4">
        <div className="rounded-2xl border border-border bg-secondary p-4">
          <div className="text-sm text-muted-foreground">셉테드 안심 폴</div>
          <div className="mt-1 text-2xl font-bold text-primary">12개소</div>
        </div>
        <div className="rounded-2xl border border-border bg-destructive/5 p-4">
          <div className="text-sm text-muted-foreground">오늘의 위험 제보</div>
          <div className="mt-1 text-2xl font-bold text-destructive">4건</div>
        </div>
      </section>

      <section className="px-4 pt-5">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.99]"
        >
          <Navigation className="h-6 w-6" />
          안심 귀가 경로 안내 시작
        </button>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          가장 밝고 안전한 길로 안내합니다
        </p>
      </section>
    </AppShell>
  );
}
