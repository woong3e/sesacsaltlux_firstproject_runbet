"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { getChallenge } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";

type ParticipantListProps = {
  challengeId: string;
};

export function ParticipantList({ challengeId }: ParticipantListProps) {
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  return (
    <section>
      <h2 className="mb-6 text-[18px] font-bold">
        <Link href={"/challenges/" + challengeId + "/participants"}>
          참여자 ({challenge?.participants.length ?? 0}명)
        </Link>
      </h2>
      {isPending && (
        <p role="status" className="text-sm text-muted">
          참여자를 불러오는 중입니다.
        </p>
      )}
      {(isError || !challenge) && !isPending && (
        <p role="alert" className="text-sm text-red-600">
          참여자를 불러오지 못했어요.
        </p>
      )}
      {challenge && (
        <ul className="space-y-6">
          {challenge.participants.map((participant) => (
            <li
              key={participant.userId}
              className="flex min-h-11 items-center gap-3.5"
            >
              <Avatar index={participant.avatarIndex} className="size-11" />
              <span className="flex-1 text-base">{participant.name}</span>
              {participant.userId === DEMO_OWNER_ID ? (
                <Link
                  href={"/challenges/" + challengeId + "/records"}
                  className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.5px]"
                >
                  {participant.distance.toFixed(2)}{" "}
                  <span className="-ml-1 text-sm">km</span>
                  <span aria-hidden="true">🏃</span>
                </Link>
              ) : (
                <span className="flex items-center gap-2 text-[15px] text-[#71768a]">
                  <span aria-hidden="true">🔒</span>
                  기록 비공개
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
