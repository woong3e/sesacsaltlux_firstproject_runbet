import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ParticipantAvatar } from "@/components/challenges/participant-avatar";
import { previewParticipants } from "@/components/challenges/preview-data";

type ParticipantListProps = {
  challengeId: string;
};

export function ParticipantList({ challengeId }: ParticipantListProps) {
  return (
    <ul className="space-y-6">
      {previewParticipants.map((participant) => (
        <li key={participant.id} className="flex min-h-11 items-center gap-3.5">
          <ParticipantAvatar />
          <span className="flex-1 text-base">{participant.name}</span>
          {participant.isMe ? (
            <Link
              href={`/challenges/${challengeId}/records`}
              className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.5px]"
            >
              18.4 <span className="-ml-1 text-sm">km</span>
              <span aria-hidden="true">🏃</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-[15px] text-[#71768a]">
              <Icon name="lock" className="size-[18px]" />
              기록 비공개
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
