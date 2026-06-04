import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, HelpCircle, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "내정보 — 매산동 안심-링크" }] }),
  component: MePage,
});

function MePage() {
  const [notify, setNotify] = useState(true);
  const [emergency, setEmergency] = useState("010-1234-5678");
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [draft, setDraft] = useState(emergency);
  const [name, setName] = useState("김안심");
  const [nameOpen, setNameOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState(name);

  return (
    <AppShell>
      <section className="px-4 pt-4">
        <div className="rounded-3xl bg-primary/10 p-5">
          <div className="text-sm font-bold text-primary">매산동 주민</div>
          <button
            type="button"
            onClick={() => {
              setNameDraft(name);
              setNameOpen(true);
            }}
            className="mt-1 inline-flex items-center gap-2 text-left text-2xl font-bold active:opacity-70"
          >
            안녕하세요, <span className="underline decoration-primary decoration-2 underline-offset-4">{name}</span> 님
          </button>
          <p className="mt-1 text-sm text-muted-foreground">
            지금까지 안심 활동 12회 · 제보 3건
          </p>
        </div>
      </section>

      <section className="px-4 pt-4">
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {/* 알림 설정 - 토글 */}
          <li className="flex items-center justify-between gap-3 px-5 py-4 text-lg font-semibold">
            <span className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" /> 알림 설정
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${notify ? "text-primary" : "text-muted-foreground"}`}>
                {notify ? "ON" : "OFF"}
              </span>
              <Switch
                checked={notify}
                onCheckedChange={(v) => {
                  setNotify(v);
                  toast.success(`알림이 ${v ? "켜졌" : "꺼졌"}습니다.`);
                }}
              />
            </div>
          </li>

          {/* 비상연락처 */}
          <li>
            <button
              onClick={() => {
                setDraft(emergency);
                setEmergencyOpen(true);
              }}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-lg font-semibold active:bg-secondary"
            >
              <span className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" /> 비상 연락처
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                {emergency}
                <ChevronRight className="h-5 w-5" />
              </span>
            </button>
          </li>

          {/* 도움말 */}
          <li>
            <button
              onClick={() => setHelpOpen(true)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-lg font-semibold active:bg-secondary"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" /> 도움말 · 사용법
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </li>
        </ul>
      </section>

      {/* 비상연락처 입력 */}
      <Dialog open={emergencyOpen} onOpenChange={setEmergencyOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl">비상 연락처</DialogTitle>
            <DialogDescription className="text-base">
              긴급 상황 시 자동으로 연락드릴 보호자 전화번호를 입력해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-card px-3 py-2">
            <Phone className="h-5 w-5 text-primary" />
            <Input
              type="tel"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="010-0000-0000"
              className="border-0 text-lg focus-visible:ring-0"
            />
          </div>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setEmergencyOpen(false)}
              className="flex-1 rounded-xl border-2 border-border bg-card px-5 py-3 text-base font-bold"
            >
              취소
            </button>
            <button
              onClick={() => {
                setEmergency(draft);
                setEmergencyOpen(false);
                toast.success("비상 연락처가 저장되었습니다.");
              }}
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
            >
              저장
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 도움말 */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl">앱 사용법 안내</DialogTitle>
            <DialogDescription className="text-base">
              매산동 안심-링크의 주요 기능을 알려드립니다.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 text-base">
            <li className="flex gap-3 rounded-xl bg-primary/5 p-3">
              <span className="text-2xl">🟢</span>
              <div>
                <div className="font-bold text-primary">안심 폴 (초록 핀)</div>
                <div className="text-sm text-muted-foreground">
                  셉테드 안심 폴이 설치된 위치입니다. 위급 시 경광등이 점등됩니다.
                </div>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-destructive/5 p-3">
              <span className="text-2xl">🔴</span>
              <div>
                <div className="font-bold text-destructive">위험 제보 (빨간 핀)</div>
                <div className="text-sm text-muted-foreground">
                  주민이 제보한 위험 지점입니다. 우회하거나 주의해서 지나가세요.
                </div>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-destructive/10 p-3">
              <span className="text-2xl">🚨</span>
              <div>
                <div className="font-bold text-destructive">SOS 긴급 버튼</div>
                <div className="text-sm text-muted-foreground">
                  하단 SOS 탭을 누르면 매산동 파출소와 자생방범대에 즉시 알림이 전송됩니다.
                </div>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-destructive/10 p-3">
              <span className="text-2xl">🆘</span>
              <div>
                <div className="font-bold text-destructive">SOS 탭</div>
                <div className="text-sm text-muted-foreground">
                  매산동 파출소와 자생방범대에 즉시 긴급 경보를 발송합니다.
                </div>
              </div>
            </li>
            <li className="flex gap-3 rounded-xl bg-[color:var(--senior)]/10 p-3">
              <span className="text-2xl">👥</span>
              <div>
                <div className="font-bold text-[color:var(--senior)]">매핑 탭</div>
                <div className="text-sm text-muted-foreground">
                  세대 공존 대리 제보 — 어르신과 청년 봉사단이 함께 만드는 안전 마을.
                </div>
              </div>
            </li>
          </ul>
          <DialogFooter>
            <button
              onClick={() => setHelpOpen(false)}
              className="w-full rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
            >
              확인
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 닉네임 수정 */}
      <Dialog open={nameOpen} onOpenChange={setNameOpen}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-xl">닉네임 수정</DialogTitle>
            <DialogDescription className="text-base">
              지도와 제보에 표시될 닉네임을 입력해 주세요.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="닉네임"
            className="text-lg"
          />
          <DialogFooter className="gap-2">
            <button
              onClick={() => setNameOpen(false)}
              className="flex-1 rounded-xl border-2 border-border bg-card px-5 py-3 text-base font-bold"
            >
              취소
            </button>
            <button
              onClick={() => {
                const v = nameDraft.trim();
                if (!v) return;
                setName(v);
                setNameOpen(false);
                toast.success("닉네임이 저장되었습니다.");
              }}
              className="flex-1 rounded-xl bg-primary px-5 py-3 text-base font-bold text-primary-foreground"
            >
              저장
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
