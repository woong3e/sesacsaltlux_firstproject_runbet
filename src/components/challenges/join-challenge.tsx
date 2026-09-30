"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { getChallenge, joinChallenge } from "@/lib/api/challenges";
import { getUsers } from "@/lib/api/users";
import { getChallengeStatus } from "@/lib/challenge-status";

type JoinChallengeProps = { challengeId: string };

const demoInviteeId = "demo-user-2";

export function JoinChallenge({ challengeId }: JoinChallengeProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(demoInviteeId);
  const challengeQuery = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
  });
  const challenge = challengeQuery.data;
  const user = usersQuery.data?.find((item) => item.id === userId);
  const participants = challenge?.participants ?? [];
  const isParticipant = participants.some((item) => item.userId === userId);
  const isFull = Boolean(
    challenge && participants.length >= challenge.maxParticipants,
  );
  const status = challenge ? getChallengeStatus(challenge) : undefined;

  const joinMutation = useMutation({
    mutationFn: async () => {
      if (!challenge || !user) throw new Error("참여 정보를 불러오는 중입니다.");
      return joinChallenge({
        challengeId,
        participant: {
          userId: user.id,
          name: user.name,
          avatarIndex: user.avatarIndex,
          joinedAt: new Date().toISOString(),
          paidAmount: challenge.entryFee,
          distance: 0,
          records: [],
        },
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["challenges"] }),
        queryClient.invalidateQueries({ queryKey: ["users"] }),
      ]);
      router.push("/challenges/" + challengeId);
    },
  });

  const canJoin = status === "upcoming" && !isFull && !isParticipant;
  const hasEnoughBalance = Boolean(
    user && challenge && user.balance >= challenge.entryFee,
  );

  return (
    <MobileScreen>
      <header className="flex h-16 items-center px-4">
        <Link
          href={"/challenges/" + challengeId + "/invite"}
          className="text-sm font-medium text-muted"
        >
          ← 초대 화면
        </Link>
      </header>
      <main className="flex-1 px-6 pt-5 pb-10">
        <h1 className="text-[25px] leading-9 font-bold tracking-[-1px]">
          챌린지 참여하기
        </h1>
        {(challengeQuery.isPending || usersQuery.isPending) && (
          <p role="status" className="mt-8 text-muted">
            참여 정보를 불러오는 중입니다.
          </p>
        )}
        {(challengeQuery.isError || usersQuery.isError) && (
          <p role="alert" className="mt-8 text-red-600">
            참여 정보를 불러오지 못했어요.
          </p>
        )}
        {challenge && user && (
          <>
            <section className="mt-7 rounded-2xl bg-surface p-5">
              <h2 className="text-lg font-bold">{challenge.title}</h2>
              <p className="mt-2 text-sm text-muted">
                참여 인원 {participants.length} / {challenge.maxParticipants}명
              </p>
              <p className="mt-1 text-sm text-muted">
                참가비 {challenge.entryFee.toLocaleString("ko-KR")}원
              </p>
            </section>

            <section className="mt-8">
              <label htmlFor="demo-user" className="mb-2 block text-sm font-semibold">
                참여할 데모 계정
              </label>
              <select
                id="demo-user"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#e1e3eb] bg-white px-3"
              >
                {usersQuery.data?.map((demoUser) => (
                  <option key={demoUser.id} value={demoUser.id}>
                    {demoUser.name}
                  </option>
                ))}
              </select>
            </section>

            <section className="mt-6 rounded-2xl border border-[#e6e8ef] p-4">
              <div className="flex items-center gap-3">
                <Avatar index={user.avatarIndex} className="size-11" />
                <div className="flex-1">
                  <p className="text-sm text-muted">보유 머니</p>
                  <p className="text-lg font-bold">
                    {user.balance.toLocaleString("ko-KR")}원
                  </p>
                </div>
              </div>
            </section>

            <p className="mt-5 text-sm leading-6 text-muted">
              참여하면 보유 머니에서 참가비가 차감됩니다.
            </p>

            {(joinMutation.isError || !canJoin || !hasEnoughBalance) && (
              <p role="status" className="mt-4 text-sm leading-5 text-red-600">
                {joinMutation.error?.message ??
                  (isParticipant
                    ? "이미 참여한 챌린지예요."
                    : isFull
                      ? "참여 인원이 모두 찼어요."
                      : !hasEnoughBalance
                        ? "보유 머니가 부족해 참여할 수 없어요."
                        : status === "ongoing"
                          ? "이미 시작한 챌린지는 참여할 수 없어요."
                          : "종료된 챌린지에는 참여할 수 없어요.")}
              </p>
            )}

            <button
              type="button"
              onClick={() => joinMutation.mutate()}
              disabled={!canJoin || !hasEnoughBalance || joinMutation.isPending}
              className="mt-7 flex h-[58px] w-full items-center justify-center rounded-xl bg-[#181c25] text-[17px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {joinMutation.isPending
                ? "참여 처리 중..."
                : challenge.entryFee.toLocaleString("ko-KR") + "원 내고 참여하기"}
            </button>
          </>
        )}
      </main>
    </MobileScreen>
  );
}
