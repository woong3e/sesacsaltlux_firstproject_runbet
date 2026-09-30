"use client";

import Image from "next/image";
import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { useCurrentTime } from "@/hooks/use-current-time";
import { getChallenges } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";
import { getChallengeStatus } from "@/lib/challenge-status";
import { getChallengeResults } from "@/lib/challenge-results";
import { formatChallengePeriod } from "@/lib/format-challenge-period";
import { Icon } from "@/components/ui/icon";

export function ChallengeHistory() {
  const now = useCurrentTime();
  const {
    data: challenges = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["challenges", "list"],
    queryFn: ({ signal }) => getChallenges(signal),
    staleTime: 0,
  });
  const history = challenges
    .filter(
      (challenge) =>
        getChallengeStatus(challenge, now) === "done" &&
        challenge.participants.some(
          (participant) => participant.userId === DEMO_OWNER_ID,
        ),
    )
    .sort((left, right) => right.endDate.localeCompare(left.endDate));

  return (
    <MobileScreen>
      <main className="flex-1 px-6 pt-9 pb-10">
        <h1 className="text-[26px] font-bold tracking-[-1px]">
          내 챌린지 기록
        </h1>
        {isPending && (
          <p role="status" className="mt-8 text-sm text-muted">
            챌린지 기록을 불러오는 중입니다.
          </p>
        )}
        {isError && (
          <div role="alert" className="mt-8 text-sm text-red-600">
            <p>챌린지 기록을 불러오지 못했어요.</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-2 min-h-10 font-semibold text-brand"
            >
              다시 시도
            </button>
          </div>
        )}
        {!isPending && !isError && history.length === 0 && (
          <p role="status" className="mt-8 text-sm text-muted">
            아직 종료된 챌린지가 없어요.
          </p>
        )}
        <ul className="mt-8">
          {history.map((challenge) => {
            const myResult = getChallengeResults(challenge).rankings.find(
              (participant) => participant.userId === DEMO_OWNER_ID,
            );
            return (
              <li
                key={challenge.id}
                className="border-b border-[#eceef4] py-5 first:pt-0 last:border-0"
              >
                <Link
                  href={`/challenges/${challenge.id}/results`}
                  className="relative flex items-start gap-4 pr-1"
                >
                  <Image
                    src={challenge.coverImage}
                    alt=""
                    width={74}
                    height={96}
                    sizes="74px"
                    className="h-24 w-[74px] shrink-0 rounded-xl border border-[#eeeeef] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="pt-0.5 text-[17px] leading-6 font-bold tracking-[-0.9px]">
                        {challenge.title}
                      </h2>
                      <span className="shrink-0 rounded-xl bg-[#e7eeff] px-3 py-1 text-[13px] text-brand">
                        종료
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-muted">
                      {formatChallengePeriod(
                        challenge.startDate,
                        challenge.endDate,
                      )}
                    </p>
                    <p className="mt-2 text-[16px] text-[#626a80]">
                      {myResult?.rank ? `${myResult.rank}등` : "기록 없음"} /{" "}
                      {(myResult?.distance ?? 0).toFixed(2)}km
                    </p>
                    <p className="mt-1 text-[17px] font-semibold">
                      {(myResult?.prize ?? 0).toLocaleString("ko-KR")}원 획득
                    </p>
                  </div>
                  <Icon
                    name="chevronRight"
                    className="absolute right-0 bottom-1 size-5 text-[#a9b2c7]"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <BottomNavigation />
    </MobileScreen>
  );
}
