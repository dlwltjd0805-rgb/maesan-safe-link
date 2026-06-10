import { createFileRoute } from "@tanstack/react-router";
import { Camera, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { addReport, getReports } from "@/lib/reportStore";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "원터치 주민 제보 — 매산동 안심-링크" }] }),
  component: ReportPage,
});

const items = [
  { emoji: "💡", label: "가로등 고장" },
  { emoji: "🗑️", label: "쓰레기 방치" },
  { emoji: "⚠️", label: "거동 수상자" },
  { emoji: "❓", label: "기타 위험" },
  { emoji: "📷", label: "CCTV 사각지대" },
  { emoji: "🔦", label: "보안등 없음" },
];

function ReportPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleSelect = (label: string) => {
    setSelected(label);
  };

  const handleLocation = () => {
    if (!selected) {
      toast.error("제보 유형을 먼저 선택해 주세요.");
      return;
    }
    const who = (() => {
      try {
        const stored = localStorage.getItem("safelink_name");
        return stored ? (JSON.parse(stored) as string) : "익명 주민";
      } catch {
        return "익명 주민";
      }
    })();
    addReport(selected as Parameters<typeof addReport>[0], who);
    toast.success("제보가 완료되었습니다.", {
      description: `${selected} · 매핑 탭에 반영됩니다.`,
    });
    setSelected(null);
  };

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
        {items.map((it) => {
          const active = selected === it.label;
          return (
            <button
              key={it.label}
              type="button"
              onClick={() => handleSelect(it.label)}
              className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border-2 p-4 text-center shadow-sm transition active:scale-[0.98] ${
                active
                  ? "border-primary border-[3px] bg-primary/10 ring-4 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              <span className="text-5xl">{it.emoji}</span>
              <span className="text-lg font-bold leading-tight">{it.label}</span>
              {active && (
                <span className="text-xs font-bold text-primary">✓ 선택됨</span>
              )}
            </button>
          );
        })}
      </section>

      <section className="space-y-3 px-4 pt-5">
        <button
          type="button"
          onClick={() => setCameraOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-border bg-card px-6 py-5 text-lg font-bold active:scale-[0.99]"
        >
          <Camera className="h-6 w-6" /> 사진 촬영
        </button>
        <button
          type="button"
          onClick={handleLocation}
          disabled={!selected}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.99] disabled:opacity-40 disabled:shadow-none"
        >
          <MapPin className="h-6 w-6" />
          {selected ? `'${selected}' 제보하기` : "유형을 먼저 선택하세요"}
        </button>
      </section>

      <Dialog open={cameraOpen} onOpenChange={setCameraOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl">📷 카메라 권한이 필요합니다</DialogTitle>
            <DialogDescription className="pt-2 text-base">
              제보 현장의 사진을 촬영하려면 카메라 접근 권한을 허용해 주세요.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setCameraOpen(false)}
              className="flex-1 rounded-xl border-2 border-border bg-card px-5 py-3 text-base font-bold"
            >
              취소
            </button>
            <button
              onClick={() => {
                setCameraOpen(false);
                toast.success("카메라 권한이 허용되었습니다.");
              }}
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
            >
              허용
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
