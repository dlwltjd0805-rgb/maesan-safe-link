import { createFileRoute } from "@tanstack/react-router";
import { Camera, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "원터치 주민 제보 — 매산동 안심-링크" }] }),
  component: ReportPage,
});

const items = [
  { emoji: "💡", label: "가로등 고장" },
  { emoji: "🗑️", label: "쓰레기 방치" },
  { emoji: "⚠️", label: "거동 수상자" },
  { emoji: "❓", label: "기타 위험" },
];

function ReportPage() {
  return (
    <AppShell>
      <section className="px-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--senior)]/20 px-4 py-2 text-base font-bold text-[color:var(--senior)]">
          🔍 큰 글씨 모드 · 어르신 배려
        </div>
        <h1 className="mt-3 text-2xl font-bold">무엇을 제보하시겠어요?</h1>
        <p className="mt-1 text-base text-muted-foreground">아래 항목을 눌러주세요.</p>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 pt-4">
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border-2 border-border bg-card p-4 text-center shadow-sm transition active:scale-[0.98] active:border-primary active:bg-secondary"
          >
            <span className="text-5xl">{it.emoji}</span>
            <span className="text-lg font-bold leading-tight">{it.label}</span>
          </button>
        ))}
      </section>

      <section className="space-y-3 px-4 pt-5">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-border bg-card px-6 py-5 text-lg font-bold active:scale-[0.99]"
        >
          <Camera className="h-6 w-6" /> 사진 촬영
        </button>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.99]"
        >
          <MapPin className="h-6 w-6" /> 현재 위치로 제보하기
        </button>
      </section>
    </AppShell>
  );
}
