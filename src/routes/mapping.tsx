import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Clock, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/mapping")({
  head: () => ({ meta: [{ title: "세대 공존 대리 매핑 — 매산동 안심-링크" }] }),
  component: MappingPage,
});

const pending = [
  { title: "💡 매산로 12번 가로등 고장", who: "김OO 어르신", time: "5분 전" },
  { title: "🗑️ 매산시장 입구 쓰레기 방치", who: "박OO 어르신", time: "18분 전" },
];

function MappingPage() {
  return (
    <AppShell>
      <section className="px-4 pt-4">
        <h1 className="text-2xl font-bold">세대 공존 대리 매핑</h1>
        <p className="mt-1 text-base text-muted-foreground">
          어르신과 청년 봉사단이 함께 만드는 안전 마을.
        </p>
      </section>

      {/* 어르신용 */}
      <section className="px-4 pt-4">
        <div className="rounded-3xl border-2 border-[color:var(--senior)]/40 bg-[color:var(--senior)]/10 p-5">
          <div className="text-sm font-bold text-[color:var(--senior)]">어르신용</div>
          <h2 className="mt-1 text-xl font-bold">스마트폰 사용이 어려우신가요?</h2>
          <p className="mt-2 text-base text-foreground/80">
            아주대 학생 봉사단이 대신 제보해 드립니다.
          </p>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--senior)] px-5 py-4 text-lg font-bold text-white shadow-md active:scale-[0.99]"
          >
            <HandHeart className="h-6 w-6" />
            아주대 학생 봉사단에게 제보 대행 요청
          </button>
        </div>
      </section>

      {/* 청년용 */}
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
              <li
                key={p.title}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="text-base font-bold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">요청: {p.who}</div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> {p.time}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4" /> 접수하기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
