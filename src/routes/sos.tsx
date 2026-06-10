import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Siren, Check, MapPin, Lightbulb, Timer } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const [countdown, setCountdown] = useState<number | null>(null);
  const [activated, setActivated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setActivated(true);
      setCountdown(null);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown((c) => (c !== null ? c - 1 : null));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown]);

  const cancelCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(null);
  };

  // 카운트다운 중 화면
  if (countdown !== null) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center px-6 pt-20 text-center">
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-destructive shadow-2xl shadow-destructive/40">
            <span className="text-7xl font-black text-white">{countdown}</span>
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 176 176">
              <circle cx="88" cy="88" r="82" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="8" />
              <circle
                cx="88" cy="88" r="82" fill="none" stroke="white" strokeWidth="8"
                strokeDasharray={2 * Math.PI * 82}
                strokeDashoffset={2 * Math.PI * 82 * (1 - countdown / 3)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
          </div>
          <p className="mt-8 text-2xl font-bold text-destructive">SOS 발동까지</p>
          <p className="mt-1 text-base text-muted-foreground">실수라면 아래 버튼을 누르세요</p>
          <button
            type="button"
            onClick={cancelCountdown}
            className="mt-8 w-full rounded-2xl border-2 border-border bg-card px-6 py-4 text-lg font-bold active:scale-[0.99]"
          >
            취소
          </button>
        </div>
      </AppShell>
    );
  }

  // SOS 활성화 후 화면
  if (activated) {
    return (
      <AppShell>
      <div className="-mb-4 flex items-center gap-3 bg-destructive px-5 py-5 text-destructive-foreground">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
          <Siren className="relative h-7 w-7" />
        </span>
        <div className="flex-1">
          <div className="text-xl font-bold">긴급 SOS 활성화</div>
          <div className="mt-0.5 flex items-center gap-2 text-sm opacity-95">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
            신호 전송 중…
          </div>
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

  // 대기 화면 — SOS 버튼
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center px-6 pt-16 text-center">
        <div className="mb-6 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive">
          ⚠️ 긴급 상황에만 사용하세요
        </div>
        <button
          type="button"
          onClick={startCountdown}
          className="relative flex h-52 w-52 flex-col items-center justify-center rounded-full bg-destructive shadow-2xl shadow-destructive/40 active:scale-[0.97] transition-transform"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-destructive/30" />
          <Siren className="relative h-16 w-16 text-white" />
          <span className="relative mt-3 text-2xl font-black text-white">SOS</span>
          <span className="relative mt-1 text-sm font-bold text-white/80">눌러서 신고</span>
        </button>
        <p className="mt-8 text-base text-muted-foreground">
          버튼을 누르면 3초 후 매산동 파출소와<br />자생방범대에 긴급 신호가 전송됩니다.
        </p>
      </div>
    </AppShell>
  );
}
