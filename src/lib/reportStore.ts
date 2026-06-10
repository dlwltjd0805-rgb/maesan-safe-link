// 제보 전역 스토어 — report 탭에서 추가 → mapping 탭에서 표시
type ReportKind = "가로등 고장" | "쓰레기 방치" | "거동 수상자" | "기타 위험" | "CCTV 사각지대" | "보안등 없음";

export type UserReport = {
  id: string;
  kind: ReportKind;
  location: string;
  time: string;
  who: string;
  done: boolean;
};

// 초기 더미 데이터 (기존 mapping.tsx 하드코딩 데이터)
const initial: UserReport[] = [
  {
    id: "init-1",
    kind: "가로등 고장",
    location: "수원시 팔달구 매산로 12 (매산시장 옆 골목)",
    time: "5분 전",
    who: "김OO 어르신",
    done: false,
  },
  {
    id: "init-2",
    kind: "쓰레기 방치",
    location: "매산시장 정문 앞 인도",
    time: "18분 전",
    who: "박OO 어르신",
    done: false,
  },
];

let reports: UserReport[] = (() => {
  try {
    const stored = localStorage.getItem("safelink_reports");
    return stored ? (JSON.parse(stored) as UserReport[]) : initial;
  } catch {
    return initial;
  }
})();

type Listener = () => void;
const listeners = new Set<Listener>();

function save() {
  try {
    localStorage.setItem("safelink_reports", JSON.stringify(reports));
  } catch {}
  listeners.forEach((fn) => fn());
}

export function getReports() {
  return reports;
}

export function addReport(kind: ReportKind, who: string) {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  reports = [
    {
      id: `r-${Date.now()}`,
      kind,
      location: "수원시 팔달구 매산동 (현재 위치)",
      time: `${hh}:${mm}`,
      who,
      done: false,
    },
    ...reports,
  ];
  save();
}

export function markDone(id: string) {
  reports = reports.map((r) => (r.id === id ? { ...r, done: true } : r));
  save();
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
