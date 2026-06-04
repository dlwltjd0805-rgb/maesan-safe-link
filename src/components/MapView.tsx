import { ShieldCheck, AlertTriangle } from "lucide-react";

// 매산동 중심 좌표
const CENTER = { lat: 37.2788, lng: 127.0163 };

// 핀: 중심 기준 작은 오프셋(도 단위). 위/아래/좌/우 분산
type Pin = { kind: "safe" | "danger"; label: string; dLat: number; dLng: number };
const pins: Pin[] = [
  { kind: "safe", label: "셉테드 안심 폴 · 매산로 입구", dLat: 0.0012, dLng: -0.0009 },
  { kind: "safe", label: "셉테드 안심 폴 · 매산초교 앞", dLat: -0.0008, dLng: 0.0014 },
  { kind: "safe", label: "셉테드 안심 폴 · 매산시장", dLat: 0.0005, dLng: 0.0018 },
  { kind: "safe", label: "셉테드 안심 폴 · 매산공원", dLat: -0.0015, dLng: -0.0006 },
  { kind: "danger", label: "위험 제보 · 가로등 고장", dLat: 0.0007, dLng: 0.0006 },
  { kind: "danger", label: "위험 제보 · 거동 수상자", dLat: -0.001, dLng: -0.0014 },
];

// Google Maps Embed (API 키 없이 동작하는 q= 방식)
const mapSrc = `https://www.google.com/maps?q=${CENTER.lat},${CENTER.lng}&z=16&hl=ko&output=embed`;

// 좌표 오프셋 → 픽셀 위치 (대략적 시각화 오버레이)
// 1도 ≈ 100km, 줌16 기준 컨테이너에서 사용할 스케일
function toPercent(d: number, range: number) {
  // d: -range..+range → 0..100%
  return 50 + (d / range) * 50;
}

export function MapView() {
  const range = 0.0025; // 컨테이너에 비춰질 좌표 범위

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-secondary shadow-sm">
      {/* 실제 구글맵 */}
      <iframe
        title="매산동 실시간 안심 지도"
        src={mapSrc}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {/* 핀 오버레이 (지도 인터랙션 방해하지 않도록 pointer-events-none) */}
      <div className="pointer-events-none absolute inset-0">
        {pins.map((p, i) => {
          const left = toPercent(p.dLng, range);
          const top = toPercent(-p.dLat, range); // 위도는 위로 갈수록 +
          const isSafe = p.kind === "safe";
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${left}%`, top: `${top}%` }}
              title={p.label}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg ${
                  isSafe ? "bg-primary text-white" : "bg-destructive text-white"
                }`}
              >
                {isSafe ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
              </div>
              <div className="mx-auto h-2 w-2 -translate-y-1 rotate-45 border-b-2 border-r-2 border-white bg-inherit" />
            </div>
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

      {/* 위치 라벨 */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold shadow-md">
        📍 수원시 팔달구 매산동
      </div>
    </div>
  );
}
