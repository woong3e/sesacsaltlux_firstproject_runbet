import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { DEMO_OWNER_ID } from "@/lib/api/users";
import type { ChallengeParticipantResult } from "@/types/challenge";

type ResultRankingsProps = {
  challengeId: string;
  rankings: ChallengeParticipantResult[];
};

export function ResultRankings({ challengeId, rankings }: ResultRankingsProps) {
  return (
    <ol className="mt-5 space-y-1">
      {rankings.map((participant) => {
        const content = (
          <>
            <span
              className={`relative flex size-8 shrink-0 items-center justify-center rounded-full text-base ${participant.rank === 1 ? "bg-[#ffd557]" : participant.rank === 2 ? "bg-[#cdd3dd]" : participant.rank === 3 ? "bg-[#b47d52]" : "bg-transparent"}`}
            >
              {participant.rank !== null && participant.rank <= 3 && (
                <span
                  aria-hidden="true"
                  className={`absolute -top-1.5 h-2.5 w-3 rounded-b-full border-x-2 border-b-4 ${participant.rank === 1 ? "border-[#ffb900]" : participant.rank === 2 ? "border-[#4a78d7]" : "border-[#756164]"}`}
                />
              )}
              {participant.rank ?? "-"}
            </span>
            <Avatar index={participant.avatarIndex} className="size-10" />
            <span className="flex-1 text-[16px] font-medium">
              {participant.name}{" "}
              {participant.rank === 1 && <span aria-label="1위">👑</span>}
            </span>
            <span className="whitespace-nowrap text-[16px] font-semibold">
              {participant.distance.toFixed(2)}
              <span className="ml-1 text-[13px] font-normal">km</span>
            </span>
          </>
        );
        return (
          <li key={participant.userId}>
            {participant.userId === DEMO_OWNER_ID ? (
              <Link
                href={`/challenges/${challengeId}/settlement`}
                aria-label={`내 기록 ${participant.rank === null ? "기록 없음" : `${participant.rank}등`}, 상금 정산 보기`}
                className="flex min-h-[62px] items-center gap-3 rounded-xl bg-[#edf2ff] px-3"
              >
                {content}
              </Link>
            ) : (
              <div className="flex min-h-[62px] items-center gap-3 px-3">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
