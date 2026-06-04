import { createFileRoute } from "@tanstack/react-router";
import { Navigation, Loader2, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { MapView } from "@/components/MapView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(false);
  const [routeOn, setRouteOn] = useState(false);
  const [origin] = useState("현재 위치 (수원시 팔달구 매산로 12-3)");
  const [destination, setDestination] = useState("");

  const startRoute = () => {
    setOpen(true);
  };

  const confirmRoute = () => {
    setOpen(false);
    setRouteOn(true);
  };

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
          <MapView showRoute={routeOn} />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 px-4 pt-4">
        <div className="rounded-2xl border border-border bg-secondary p-3">
          <div className="text-xs text-muted-foreground">셉테드 안심 폴</div>
          <div className="mt-1 text-xl font-bold text-primary">12개소</div>
        </div>
        <div className="rounded-2xl border border-border bg-destructive/5 p-3">
          <div className="text-xs text-muted-foreground">오늘의 위험 제보</div>
          <div className="mt-1 text-xl font-bold text-destructive">4건</div>
        </div>
        <div className="rounded-2xl border border-border bg-primary/10 p-3">
          <div className="text-xs text-muted-foreground">안심 귀가 완료</div>
          <div className="mt-1 text-xl font-bold text-primary">오늘 23명</div>
        </div>
      </section>

      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={startRoute}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.99]"
        >
          <Navigation className="h-6 w-6" />
          안심 귀가 경로 안내 시작
        </button>
        {routeOn ? (
          <p className="mt-2 text-center text-sm font-bold text-primary">
            ● 안심 동행길 경로 안내 중 · 예상 소요 8분
          </p>
        ) : (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            가장 밝고 안전한 길로 안내합니다
          </p>
        )}
      </section>

      <Dialog open={open} onOpenChange={(o) => (!o ? closeDialog() : null)}>
        <DialogContent className="max-w-[420px]">
          {status === "loading" ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <DialogTitle className="text-lg">안전 경로를 탐색 중입니다...</DialogTitle>
              <DialogDescription>잠시만 기다려 주세요.</DialogDescription>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">매산동 안심 동행길 경로를 찾았습니다</DialogTitle>
                <DialogDescription className="pt-2 text-base">
                  가장 밝고 안전한 길로 안내해 드립니다.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 space-y-2 rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-2 text-base">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-bold">예상 소요 시간 8분</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  셉테드 안심 폴 4기 경유
                </div>
              </div>
              <DialogFooter>
                <button
                  onClick={closeDialog}
                  className="w-full rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
                >
                  안내 시작
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
