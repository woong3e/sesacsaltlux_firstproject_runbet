"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ChallengeCard } from "@/components/home/challenge-card";
import { getChallengeStatus } from "@/lib/challenge-status";
import { getChallenges } from "@/lib/api/challenges";

type ChallengeListProps = {
  showViewAll?: boolean;
};

export function ChallengeList({ showViewAll = true }: ChallengeListProps) {
  const {
    data: challenges = [],
    isPending,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["challenges", "list"],
    queryFn: ({ signal }) => getChallenges(signal),
  });
  const ongoingChallenges = challenges.filter(
    (challenge) => getChallengeStatus(challenge) === "ongoing",
  );

  return (
    <section aria-labelledby="challenges-heading" className="mt-6">
      <div className="mb-4 flex items-center justify-between px-0.5">
        <h2
          id="challenges-heading"
          className="text-[19px] leading-7 font-bold tracking-[-0.8px]"
        >
          진행 중인 챌린지
        </h2>
        {showViewAll && (
          <Link
            href="/challenges/lists"
            className="flex min-h-8 items-center gap-0.5 text-[15px] tracking-[-0.4px] text-muted"
          >
            전체보기
            <Icon name="chevronRight" className="size-4" />
          </Link>
        )}
      </div>
      {isPending && (
        <p
          role="status"
          className="flex min-h-[120px] items-center justify-center rounded-2xl bg-surface px-4 text-sm text-muted"
        >
          챌린지 목록을 불러오는 중입니다.
        </p>
      )}
      {isError && (
        <div
          role="alert"
          className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl bg-surface px-4 text-center text-sm"
        >
          <p className="text-muted"> 챌린지 목록을 불러오지 못했어요.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="min-h-10 px-3 font-semibold text-brand"
          >
            다시 시도
          </button>
        </div>
      )}
      {isSuccess && ongoingChallenges.length === 0 && (
        <p
          role="status"
          className="flex min-h-[120px] items-center justify-center rounded-2xl bg-surface px-4 text-sm text-muted"
        >
          아직 등록된 챌린지가 없어요.
        </p>
      )}
      {isSuccess && ongoingChallenges.length > 0 && (
        <ul className="space-y-3">
          {ongoingChallenges.map((challenge) => (
            <li key={challenge.id}>
              <ChallengeCard challenge={challenge} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
