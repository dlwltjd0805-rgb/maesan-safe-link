import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Siren, Check, MapPin, Lightbulb, Timer } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/sos")({
  head: () => ({ meta: [{ title: "긴급 SOS — 매산동 안심-링크" }] }),
  component: SosPage,
});

function SosPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppShell>
      <div className="-mb-4 flex items-center gap-3 bg-destructive px-5 py-5 text-destructive-foreground">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
          <Siren className="relative h-7 w-7" />
        </span>
        <div>
          <div className="text-xl font-bold">긴급 SOS 활성화</div>
          <div className="text-sm opacity-90">주변에 도움을 요청하고 있습니다…</div>
        </div>
      </div>

      <section className="space-y-3 px-4 pt-6">
        <article className="rounded-3xl border-2 border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-bold text-destructive">112 · 경찰</div>
              <h2 className="mt-1 text-xl font-bold">매산동 파출소</h2>
              <p className="mt-1 text-sm text-foreground/80">위치 경보 발송 완료</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-white">
              <Check className="h-5 w-5" />
            </span>
          </div>
        </article>

        <article className="rounded-3xl border-2 border-[color:var(--info)]/30 bg-[color:var(--info)]/5 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-bold text-[color:var(--info)]">자생방범대</div>
              <h2 className="mt-1 text-xl font-bold">인근 자생방범대원 3명</h2>
              <p className="mt-1 text-sm text-foreground/80">알림 발송 완료</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--info)] text-white">
              <Check className="h-5 w-5" />
            </span>
          </div>
        </article>

        <article className="rounded-3xl border border-border bg-card p-5">
          <h3 className="text-base font-bold">실시간 상황</h3>
          <ul className="mt-3 space-y-3 text-base">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-bold">현재 위치</div>
                <div className="text-sm text-muted-foreground">
                  수원시 팔달구 매산로 45 부근
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 text-[color:var(--warning)]" />
              <div>
                <div className="font-bold">셉테드 폴 경광등 점등 중</div>
                <div className="text-sm text-muted-foreground">반경 50m 안심 폴 2기 작동</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-bold">예상 도착 2분</div>
                <div className="text-sm text-muted-foreground">매산동 파출소 순찰차 출동</div>
              </div>
            </li>
          </ul>
        </article>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-2 w-full rounded-2xl border-2 border-border bg-card px-6 py-4 text-lg font-bold text-foreground active:scale-[0.99]"
        >
          SOS 취소하기
        </button>
      </section>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-[420px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">SOS를 취소하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              취소하면 파출소와 자생방범대에 보낸 긴급 알림이 종료됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="flex-1 rounded-xl border-2 px-5 py-3 text-base font-bold">
              아니오
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate({ to: "/" })}
              className="flex-1 rounded-xl bg-destructive px-5 py-3 text-base font-bold text-destructive-foreground"
            >
              예, 취소합니다
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
