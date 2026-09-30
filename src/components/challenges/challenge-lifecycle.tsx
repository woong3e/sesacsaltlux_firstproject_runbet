"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { useCurrentTime } from "@/hooks/use-current-time";
import { getChallenge } from "@/lib/api/challenges";
import { getChallengeStatus } from "@/lib/challenge-status";
import type { ChallengeStatus } from "@/types/challenge";

type ChallengeLifecycleProps = {
  challengeId: string;
  children: ReactNode;
};

export function ChallengeLifecycle({
  challengeId,
  children,
}: ChallengeLifecycleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const now = useCurrentTime();
  const previousStatus = useRef<ChallengeStatus | undefined>(undefined);
  const {
    data: challenge,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
    staleTime: 0,
  });
  const status = challenge ? getChallengeStatus(challenge, now) : undefined;
  const basePath = `/challenges/${challengeId}`;
  const isResultPage =
    pathname === `${basePath}/results` || pathname === `${basePath}/settlement`;
  const destination =
    status === "done" && !isResultPage
      ? `${basePath}/results`
      : status && status !== "done" && isResultPage
        ? basePath
        : null;

  useEffect(() => {
    if (
      status === "done" &&
      previousStatus.current &&
      previousStatus.current !== "done"
    ) {
      void queryClient.invalidateQueries({ queryKey: ["challenges"] });
    }
    previousStatus.current = status;
  }, [status, queryClient]);

  useEffect(() => {
    if (destination) router.replace(destination);
  }, [destination, router]);

  if (isError) {
    return (
      <MobileScreen>
        <p role="alert" className="p-8 text-sm text-red-600">
          챌린지를 불러오지 못했어요.
        </p>
      </MobileScreen>
    );
  }

  if (isPending || destination) {
    return (
      <MobileScreen>
        <p role="status" className="p-8 text-sm text-muted">
          {destination
            ? "챌린지 화면으로 이동 중입니다."
            : "챌린지를 불러오는 중입니다."}
        </p>
      </MobileScreen>
    );
  }

  return children;
}
