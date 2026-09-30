"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { getChallenge } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";

type InviteChallengeProps = { challengeId: string };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function InviteChallenge({ challengeId }: InviteChallengeProps) {
  const [copied, setCopied] = useState(false);
  const invitePath = `/challenges/${challengeId}/join`;
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  async function copyInviteLink() {
    const absoluteUrl = new URL(invitePath, window.location.origin).toString();
    await navigator.clipboard.writeText(absoluteUrl);
    setCopied(true);
  }

  return (
    <MobileScreen>
      <header className="flex h-14 justify-end px-3 pt-3">
        <Link
          href="/"
          aria-label="홈으로 이동"
          className="flex size-11 items-center justify-center rounded-lg"
        >
          <Icon name="home" className="size-5" />
        </Link>
      </header>
      <main className="flex flex-1 flex-col px-7 pt-3 pb-10">
        <h1 className="text-[25px] leading-9 font-bold tracking-[-1px]">
          친구 초대하기
        </h1>
        <p className="mt-1 text-[14px] leading-6 text-[#555b6e]">
          초대 링크를 공유하고 함께 챌린지에 참여해 보세요.
        </p>

        {isPending && <p role="status" className="mt-8 text-muted">챌린지를 불러오는 중입니다.</p>}
        {isError && <p role="alert" className="mt-8 text-red-600">챌린지를 불러오지 못했어요.</p>}
        {challenge && (
          <>
            <section className="mt-8 rounded-2xl bg-surface p-4">
              <h2 className="text-lg font-bold">{challenge.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {formatDate(challenge.startDate)} ~ {formatDate(challenge.endDate)}
              </p>
              <p className="mt-1 text-sm text-muted">
                참가비 {challenge.entryFee.toLocaleString("ko-KR")}원 · 정원 {challenge.maxParticipants}명
              </p>
            </section>

            <div className="mt-6 flex gap-2">
              <input
                readOnly
                aria-label="초대 링크"
                value={invitePath}
                className="h-[54px] min-w-0 flex-1 rounded-xl border border-[#e6e8ef] bg-white px-3 text-xs shadow-xs"
              />
              <button
                type="button"
                onClick={() => void copyInviteLink()}
                className="flex h-[54px] shrink-0 items-center gap-1.5 rounded-xl bg-[#181c25] px-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                <Icon name="copy" className="size-4" />
                {copied ? "복사됨" : "링크 복사"}
              </button>
            </div>

            <Link
              href={`/challenges/${challengeId}/join`}
              className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-[#e6e8ef] text-sm font-semibold"
            >
              초대 화면 미리보기
            </Link>

            <section aria-labelledby="invite-participants-heading" className="mt-10">
              <h2 id="invite-participants-heading" className="mb-5 text-[17px] font-semibold">
                참여자 ({challenge.participants.length} / {challenge.maxParticipants})
              </h2>
              <ul className="space-y-4">
                {challenge.participants.map((participant) => (
                  <li key={participant.userId} className="flex items-center gap-3">
                    <Avatar index={participant.avatarIndex} className="size-10" />
                    <span className="flex-1 text-base">
                      {participant.name}{participant.userId === DEMO_OWNER_ID ? " (방장)" : ""}
                    </span>
                    <span className="text-sm font-medium text-[#15a16b]">참여 완료</span>
                  </li>
                ))}
                {Array.from(
                  { length: Math.max(0, challenge.maxParticipants - challenge.participants.length) },
                  (_, index) => (
                    <li key={`empty-${index}`} className="flex items-center gap-3 text-muted">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[#c9cedc">
                        <Icon name="plus" className="size-4" />
                      </span>
                      <span className="text-[15px]">친구를 초대해 보세요!</span>
                    </li>
                  ),
                )}
              </ul>
            </section>

            <div className="mt-auto pt-12">
              <Link
                href={`/challenges/${challengeId}`}
                className="flex min-h-[60px] items-center justify-center rounded-xl bg-[#181c25] px-2 text-center font-semibold text-white"
              >
                챌린지 확인하기
              </Link>
            </div>
          </>
        )}
      </main>
    </MobileScreen>
  );
}
