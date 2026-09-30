"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { CelebrationEmblem } from "@/components/challenges/celebration-emblem";
import { ResultRankings } from "@/components/challenges/result-rankings";
import { getChallenge } from "@/lib/api/challenges";
import { getChallengeResults } from "@/lib/challenge-results";
import { formatChallengePeriod } from "@/lib/format-challenge-period";

type ChallengeResultsProps = { challengeId: string };

export function ChallengeResults({ challengeId }: ChallengeResultsProps) {
  const {
    data: challenge,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  if (isPending)
    return (
      <p role="status" className="p-8 text-sm text-muted">
        결과를 불러오는 중입니다.
      </p>
    );
  if (isError || !challenge)
    return (
      <p role="alert" className="p-8 text-sm text-red-600">
        결과를 불러오지 못했어요.
      </p>
    );

  const { rankings, totalDistance, amountPerKm } =
    getChallengeResults(challenge);

  return (
    <MobileScreen>
      <main className="flex-1 px-5 pt-6 pb-10">
        <CelebrationEmblem variant="results" />
        <h1 className="text-center text-[clamp(19px,5.6vw,22px)] font-bold tracking-[-1px]">
          챌린지 결과가 공개되었습니다!
        </h1>
        <p className="mt-2 text-center text-[14px] text-[#626b81]">
          {formatChallengePeriod(challenge.startDate, challenge.endDate)}
        </p>
        <ResultRankings challengeId={challengeId} rankings={rankings} />
        <Link
          href={`/challenges/${challengeId}/settlement`}
          aria-label="상금 정산 내역 보기"
          className="mt-6 block rounded-xl bg-[#f2f3f8] px-6 py-6"
        >
          <dl className="flex items-center justify-between gap-4">
            <div>
              <dt className="text-[15px] text-muted">총 러닝 거리</dt>
              <dd className="mt-1 text-[25px] font-bold">
                {totalDistance.toFixed(2)}{" "}
                <span className="text-base font-medium">km</span>
              </dd>
            </div>
            <div className="text-right">
              <dt className="text-[15px] text-muted">1km 당 금액</dt>
              <dd className="mt-1 break-all text-[25px] font-bold">
                {amountPerKm.toLocaleString("ko-KR", {
                  maximumFractionDigits: 2,
                })}
                <span className="text-base">원</span>
              </dd>
            </div>
          </dl>
        </Link>
      </main>
      <BottomNavigation />
    </MobileScreen>
  );
}
