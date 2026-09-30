import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { CelebrationEmblem } from "@/components/challenges/celebration-emblem";
import { Icon } from "@/components/ui/icon";

type WaitingPageProps = { params: Promise<{ id: string }> };

export default async function WaitingPage({ params }: WaitingPageProps) {
  const { id } = await params;
  return (
    <MobileScreen className="bg-[radial-gradient(ellipse_at_60%_30%,#454b57_0%,#303640_48%,#1b2029_100%)] text-white">
      <main className="flex flex-1 flex-col justify-center px-6 py-12">
        <CelebrationEmblem variant="waiting" />
        <h1 className="mt-5 text-center text-[25px] font-bold tracking-[-1px]">
          챌린지가 종료되었습니다!
        </h1>
        <p className="mt-4 text-center text-[16px] leading-7 text-[#d2d6df]">
          모든 참가자의 기록을 집계하고 있어요.
          <br />
          잠시만 기다려주세요.
        </p>
        <Link
          href={`/challenges/${id}/results`}
          aria-label="집계 현황,  챌린지 결과 화면 보기"
          className="mt-12 rounded-2xl border border-white/5 bg-[#3b4a5c]/75 px-5 py-6 shadow-[0_12px_35px_#0a102440]"
        >
          <div className="flex items-center justify-between text-[16px]">
            <span>집계 중...</span>
            <span className="flex text-[#95a7ba]">
              <Icon name="chevronRight" className="size-4 opacity-40" />
              <Icon name="arrowRight" className="size-4" />
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="기록 집계 진행률"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={3}
            aria-valuetext="4명 중 3명 집계 완료"
            className="mt-4 h-3.5 overflow-hidden rounded-full bg-[#526d85]"
          >
            <div className="h-full w-3/4 rounded-full bg-linear-to-r from-[#3f79ff] via-[#7cafff] to-[#d0e6ff]" />
          </div>
          <p className="mt-3 text-sm text-[#e6eaf2]">3 / 4 완료</p>
        </Link>
      </main>
    </MobileScreen>
  );
}
