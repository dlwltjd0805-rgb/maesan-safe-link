import { ShieldCheck, AlertTriangle } from "lucide-react";

type Pin = { x: number; y: number; type: "safe" | "danger"; label: string };

const pins: Pin[] = [
  { x: 22, y: 28, type: "safe", label: "셉테드 폴 A" },
  { x: 58, y: 20, type: "safe", label: "셉테드 폴 B" },
  { x: 74, y: 55, type: "safe", label: "셉테드 폴 C" },
  { x: 35, y: 70, type: "safe", label: "셉테드 폴 D" },
  { x: 48, y: 42, type: "danger", label: "가로등 고장" },
  { x: 68, y: 78, type: "danger", label: "거동 수상자" },
];

export function MapView() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-[oklch(0.97_0.02_168)]">
      {/* faux map grid */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 L0 0 0 10" fill="none" stroke="oklch(0.88 0.02 168)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#g)" />
        {/* roads */}
        <path d="M0 60 Q40 55 100 65" stroke="white" strokeWidth="4" fill="none" />
        <path d="M30 0 Q34 50 28 100" stroke="white" strokeWidth="3.5" fill="none" />
        <path d="M70 0 Q66 40 72 100" stroke="white" strokeWidth="3" fill="none" />
        {/* park */}
        <circle cx="20" cy="80" r="10" fill="oklch(0.88 0.1 150)" opacity="0.6" />
        {/* blocks */}
        <rect x="40" y="15" width="18" height="14" rx="2" fill="oklch(0.93 0.01 200)" />
        <rect x="62" y="32" width="22" height="16" rx="2" fill="oklch(0.93 0.01 200)" />
        <rect x="8" y="40" width="16" height="14" rx="2" fill="oklch(0.93 0.01 200)" />
      </svg>

      {/* "현재 위치" */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "55%" }}
      >
        <div className="relative">
          <div className="absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30" />
          <div className="h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-primary shadow-lg" />
        </div>
      </div>

      {pins.map((p, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-md ${
              p.type === "safe" ? "bg-primary" : "bg-destructive"
            }`}
          >
            {p.type === "safe" ? (
              <ShieldCheck className="h-5 w-5 text-white" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-white" />
            )}
          </div>
          <div className="mx-auto h-2 w-2 -translate-y-1 rotate-45 bg-white" />
        </div>
      ))}

      {/* legend */}
      <div className="absolute left-3 top-3 space-y-1 rounded-xl bg-white/95 px-3 py-2 text-sm shadow-md backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" /> 안심 폴
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-destructive" /> 위험 제보
        </div>
      </div>
    </div>
  );
}
