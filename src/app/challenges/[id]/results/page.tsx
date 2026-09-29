import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { CelebrationEmblem } from "@/components/challenges/celebration-emblem";
import { ResultRankings } from "@/components/challenges/result-rankings";
import { previewPeriod } from "@/components/challenges/preview-data";

type ResultsPageProps = { params: Promise<{ id: string }> };

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = await params;
  return (
    <MobileScreen>
      <main className="px-5 pt-6 pb-10">
        <CelebrationEmblem variant="results" />
        <h1 className="text-center text-[clamp(19px,5.6vw,22px)] font-bold tracking-[-1px]">
          챌린지 결과가 공개되었습니다!
        </h1>
        <p className="mt-2 text-center text-[14px] text-[#626b81]">
          {previewPeriod}
        </p>
        <ResultRankings challengeId={id} />
        <Link
          href={`/challenges/${id}/settlement`}
          aria-label="상금 정산 내역 보기"
          className="mt-6 block rounded-xl bg-[#f2f3f8] px-6 py-6"
        >
          <dl className="flex items-center justify-between gap-4">
            <div>
              <dt className="text-[15px] text-muted">총 러닝 거리</dt>
              <dd className="mt-1 text-[25px] font-bold">
                84.0 <span className="text-base font-medium">km</span>
              </dd>
            </div>
            <div className="text-right">
              <dt className="text-[15px] text-muted">1km 당 금액</dt>
              <dd className="mt-1 text-[25px] font-bold">
                476<span className="text-base">원</span>
              </dd>
            </div>
          </dl>
        </Link>
      </main>
    </MobileScreen>
  );
}
