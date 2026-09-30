"use client";

import { useQuery } from "@tanstack/react-query";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { getChallenge } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";
import { getChallengeResults } from "@/lib/challenge-results";
import { formatChallengePeriod } from "@/lib/format-challenge-period";

type ChallengeSettlementProps = { challengeId: string };

export function ChallengeSettlement({ challengeId }: ChallengeSettlementProps) {
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
        정산 내역을 불러오는 중입니다.
      </p>
    );
  if (isError || !challenge)
    return (
      <p role="alert" className="p-8 text-sm text-red-600">
        정산 내역을 불러오지 못했어요.
      </p>
    );

  const { rankings, totalDistance, totalPrize } =
    getChallengeResults(challenge);
  const myResult = rankings.find(
    (participant) => participant.userId === DEMO_OWNER_ID,
  );
  const myPrize = myResult?.prize ?? 0;
  const myContribution = ((myResult?.contribution ?? 0) * 100).toFixed(1);
  const equalEntryFees = challenge.participants.every(
    (participant) => participant.paidAmount === challenge.entryFee,
  );

  return (
    <MobileScreen>
      <main className="flex-1 px-6 pt-9 pb-10">
        <h1 className="text-[26px] font-bold tracking-[-1px]">상금 정산</h1>
        <p className="mt-2 text-sm text-muted">
          {formatChallengePeriod(challenge.startDate, challenge.endDate)}
        </p>
        <section
          aria-label="내 상금"
          className="mt-8 flex items-center gap-4 rounded-xl bg-[#eaf0ff] px-5 py-7"
        >
          <span
            aria-hidden="true"
            className="relative block h-16 w-16 shrink-0 text-[46px]"
          >
            <span className="absolute -left-1 top-2">🪙</span>
            <span className="absolute top-0 left-4">🪙</span>
          </span>
          <div className="min-w-0">
            <h2 className="text-[18px] text-[#29447f]">내 상금</h2>
            <p className="mt-2 break-all text-[clamp(27px,8.5vw,34px)] leading-10 font-bold tracking-[-1px]">
              {myPrize.toLocaleString("ko-KR")}원
            </p>
            <p className="mt-1 text-[15px] text-[#66728c]">
              (전체의 {myContribution}%)
            </p>
          </div>
        </section>
        <section aria-labelledby="settlement-method-heading" className="mt-7">
          <h2 id="settlement-method-heading" className="text-[18px] font-bold">
            정산 계산 방식
          </h2>
          <dl className="mt-4 space-y-5 text-[17px]">
            <div className="flex items-start justify-between gap-2">
              <dt>총 상금</dt>
              <dd className="text-right">
                {totalPrize.toLocaleString("ko-KR")}원
                <span className="mt-1 block text-[13px] text-muted">
                  {equalEntryFees
                    ? `(참가비 ${challenge.entryFee.toLocaleString("ko-KR")}원 × ${rankings.length}명)`
                    : `(참가자 ${rankings.length}명의 납부 참가비 합계)`}
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>내 기록</dt>
              <dd>{(myResult?.distance ?? 0).toFixed(2)} km</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>총 러닝 거리</dt>
              <dd>{totalDistance.toFixed(2)} km</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>내 기여도</dt>
              <dd>{myContribution}%</dd>
            </div>
            <div className="flex justify-between gap-2 border-t border-[#eef0f5] pt-5 font-bold">
              <dt>정산 금액</dt>
              <dd>{myPrize.toLocaleString("ko-KR")}원</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">
            {totalDistance === 0
              ? "등록된 러닝 기록이 없어 정산 금액은 0원입니다."
              : "총 상금 × 내 거리 ÷ 총 러닝 거리로 계산하며, 원 미만은 버립니다."}
          </p>
        </section>
      </main>
      <BottomNavigation />
    </MobileScreen>
  );
}
