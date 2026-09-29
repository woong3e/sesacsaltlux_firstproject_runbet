"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ChallengeCard } from "@/components/home/challenge-card";
import { getChallenges } from "@/lib/api/challenges";

export function ChallengeList() {
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

  return (
    <section aria-labelledby="challenges-heading" className="mt-6">
      <div className="mb-4 flex items-center justify-between px-0.5">
        <h2
          id="challenges-heading"
          className="text-[19px] leading-7 font-bold tracking-[-0.8px]"
        >
          진행 중인 챌린지
        </h2>
        <Link
          href="/challenges/history"
          className="flex min-h-8 items-center gap-0.5 text-[15px] tracking-[-0.4px] text-muted"
        >
          전체보기
          <Icon name="chevronRight" className="size-4" />
        </Link>
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
      {isSuccess && challenges.length === 0 && (
        <p
          role="status"
          className="flex min-h-[120px] items-center justify-center rounded-2xl bg-surface px-4 text-sm text-muted"
        >
          아직 등록된 챌린지이 없어요.
        </p>
      )}
      {isSuccess && challenges.length > 0 && (
        <ul className="space-y-3">
          {challenges.map((challenge) => (
            <li key={challenge.id}>
              <ChallengeCard challenge={challenge} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
