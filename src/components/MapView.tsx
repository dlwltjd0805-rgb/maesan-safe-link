import { ShieldCheck, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const CENTER = { lat: 37.2788, lng: 127.0163 };

type Pin = {
  kind: "safe" | "danger";
  id: string;
  title: string;
  body: string;
  // 화면상 고정 위치 (%)
  left: number;
  top: number;
};

const pins: Pin[] = [
  {
    kind: "safe",
    id: "s1",
    title: "셉테드 안심 폴 #1",
    body: "매산로 12번길\nLED 안심등 · 음악 · 향기 작동 중 ✅",
    left: 28,
    top: 32,
  },
  {
    kind: "safe",
    id: "s2",
    title: "셉테드 안심 폴 #2",
    body: "매산로 5번길\nLED 안심등 · 음악 · 향기 작동 중 ✅",
    left: 62,
    top: 44,
  },
  {
    kind: "safe",
    id: "s3",
    title: "셉테드 안심 폴 #3",
    body: "팔달문 근처\nLED 안심등 · 음악 · 향기 작동 중 ✅",
    left: 74,
    top: 70,
  },
  {
    kind: "danger",
    id: "d1",
    title: "위험 제보: 가로등 고장",
    body: "매산로 어두운 골목\n신고 시간: 21:30 · 처리 중",
    left: 38,
    top: 58,
  },
  {
    kind: "danger",
    id: "d2",
    title: "위험 제보: 거동 수상자",
    body: "매산시장 뒷골목\n신고 시간: 20:45 · 처리 중",
    left: 52,
    top: 22,
  },
];

const mapSrc = `https://www.google.com/maps?q=${CENTER.lat},${CENTER.lng}&z=16&hl=ko&output=embed`;

export function MapView({ showRoute = false }: { showRoute?: boolean }) {
  const [active, setActive] = useState<Pin | null>(null);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
      {/* 구글맵 — 핀 정렬을 위해 드래그/줌 고정 */}
      <iframe
        title="매산동 실시간 안심 지도"
        src={mapSrc}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full border-0 select-none"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
      />

      {/* 경로 (민트 점선) */}
      {showRoute && (
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points="28,32 38,58 52,22 62,44 74,70"
            fill="none"
            stroke="#00B48A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* 핀 레이어 */}
      <div className="absolute inset-0">
        {pins.map((p) => {
          const isSafe = p.kind === "safe";
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="absolute -translate-x-1/2 -translate-y-full focus:outline-none"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              aria-label={p.title}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform active:scale-95 ${
                  isSafe ? "bg-primary text-white" : "bg-destructive text-white"
                }`}
              >
                {isSafe ? (
                  <ShieldCheck className="h-4.5 w-4.5" />
                ) : (
                  <AlertTriangle className="h-4.5 w-4.5" />
                )}
              </div>
              <div
                className={`mx-auto h-2 w-2 -translate-y-1 rotate-45 border-b-2 border-r-2 border-white ${
                  isSafe ? "bg-primary" : "bg-destructive"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1 rounded-xl bg-background/95 px-3 py-2 text-xs font-semibold shadow-md backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
            <ShieldCheck className="h-2.5 w-2.5" />
          </span>
          안심 폴
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-white">
            <AlertTriangle className="h-2.5 w-2.5" />
          </span>
          위험 제보
        </div>
      </div>

      {/* 경로 안내 배너 */}
      {showRoute && (
        <div className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg">
          매산동 안심 동행길 경로 안내 중 · 예상 소요 8분
        </div>
      )}

      {/* 위치 라벨 */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold shadow-md">
        📍 수원시 팔달구 매산동
      </div>

      {/* 핀 클릭 팝업 */}
      {active && (
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-black/30 p-4 animate-fade-in">
          <div className="w-full max-w-[360px] rounded-2xl border-2 border-border bg-background p-4 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                    active.kind === "safe" ? "bg-primary" : "bg-destructive"
                  }`}
                >
                  {active.kind === "safe" ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </span>
                <div className="text-base font-bold">{active.title}</div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="rounded-full p-1 text-muted-foreground hover:bg-secondary"
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-foreground/80">
              {active.body}
            </p>
            <button
              onClick={() => setActive(null)}
              className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
