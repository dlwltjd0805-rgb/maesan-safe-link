import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Clock, CheckCircle2, MapPin } from "lucide-react";
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

export const Route = createFileRoute("/mapping")({
  head: () => ({ meta: [{ title: "세대 공존 대리 매핑 — 매산동 안심-링크" }] }),
  component: MappingPage,
});

type Report = {
  title: string;
  who: string;
  time: string;
  location: string;
  detail: string;
};

const pending: Report[] = [
  {
    title: "💡 매산로 12번 가로등 고장",
    who: "김OO 어르신",
    time: "5분 전",
    location: "수원시 팔달구 매산로 12 (매산시장 옆 골목)",
    detail: "저녁부터 가로등이 깜빡이다가 꺼져 있어 어둡습니다. 야간 통행이 불안합니다.",
  },
  {
    title: "🗑️ 매산시장 입구 쓰레기 방치",
    who: "박OO 어르신",
    time: "18분 전",
    location: "매산시장 정문 앞 인도",
    detail: "종량제 봉투가 아닌 일반 쓰레기가 며칠째 쌓여있어 악취가 납니다.",
  },
];

function MappingPage() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [active, setActive] = useState<Report | null>(null);

  return (
    <AppShell>
      <section className="px-4 pt-4">
        <h1 className="text-2xl font-bold">세대 공존 대리 매핑</h1>
        <p className="mt-1 text-base text-muted-foreground">
          어르신과 청년 봉사단이 함께 만드는 안전 마을.
        </p>
      </section>

      <section className="px-4 pt-4">
        <div className="rounded-3xl border-2 border-[color:var(--senior)]/40 bg-[color:var(--senior)]/10 p-5">
          <div className="text-sm font-bold text-[color:var(--senior)]">어르신용</div>
          <h2 className="mt-1 text-xl font-bold">스마트폰 사용이 어려우신가요?</h2>
          <p className="mt-2 text-base text-foreground/80">
            아주대 학생 봉사단이 대신 제보해 드립니다.
          </p>
          <button
            type="button"
            onClick={() => setRequestOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--senior)] px-5 py-4 text-lg font-bold text-white shadow-md active:scale-[0.99]"
          >
            <HandHeart className="h-6 w-6" />
            아주대 학생 봉사단에게 제보 대행 요청
          </button>
        </div>
      </section>

      <section className="px-4 pt-4 pb-4">
        <div className="rounded-3xl border-2 border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-primary">청년 · 봉사자용</div>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              대기 {pending.length}건
            </span>
          </div>
          <h2 className="mt-1 text-xl font-bold">대기 중인 제보</h2>

          <ul className="mt-4 space-y-3">
            {pending.map((p) => (
              <li key={p.title}>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="w-full rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition active:scale-[0.99] active:border-primary"
                >
                  <div className="text-base font-bold">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">요청: {p.who}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" /> {p.time}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" /> 자세히
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast.success("매핑 완료! 지도에 반영되었습니다.")
                  }
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground shadow-sm active:scale-[0.99]"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  현장 방문 후 매핑 완료
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 요청 접수 팝업 */}
      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl">요청이 접수되었습니다</DialogTitle>
            <DialogDescription className="pt-2 text-base">
              아주대 학생 봉사단원이 곧 연락드립니다. 잠시만 기다려 주세요.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setRequestOpen(false)}
              className="w-full rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
            >
              확인
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 제보 상세 팝업 */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[420px]">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{active.title}</DialogTitle>
                <DialogDescription className="pt-1 text-sm">
                  요청: {active.who}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 rounded-xl bg-secondary p-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="font-bold">위치</div>
                    <div className="text-muted-foreground">{active.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <div className="font-bold">접수 시간</div>
                    <div className="text-muted-foreground">{active.time}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">내용</div>
                  <div className="mt-1 text-muted-foreground">{active.detail}</div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <button
                  onClick={() => setActive(null)}
                  className="flex-1 rounded-xl border-2 border-border bg-card px-5 py-3 text-base font-bold"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    setActive(null);
                    toast.success("매핑이 완료되었습니다.", {
                      description: "지도에 반영됩니다.",
                    });
                  }}
                  className="flex-1 rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
                >
                  현장 방문 후 직접 매핑 완료
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
