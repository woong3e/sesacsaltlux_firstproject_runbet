import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import type { Challenge, ChallengeStatus } from "@/types/challenge";

const statusLabels: Record<ChallengeStatus, string> = {
  ongoing: "진행중",
  upcoming: "대기중",
};

const statusStyles: Record<ChallengeStatus, string> = {
  ongoing: "bg-[#e2eaff] text-brand",
  upcoming: "bg-[#ececf2] text-[#73788b]",
};

function formatShortDate(date: string) {
  const [, month, day] = date.split("-");
  return `${Number(month)}.${Number(day)}`;
}

type ChallengeCardProps = {
  challenge: Challenge;
};

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <article aria-labelledby={`challenge-${challenge.id}`}>
      <Link
        href={`/challenges/${challenge.id}`}
        className="flex min-h-[120px] items-center gap-3.5 rounded-2xl bg-surface px-[18px] py-4"
      >
        <Image
          src={challenge.coverImage}
          alt=""
          width={68}
          height={78}
          sizes="68px"
          className="h-[78px] w-[68px] shrink-0 rounded-[10px] object-cover object-[65%_center]"
        />
        <div className="min-w-0 flex-1">
          <h3
            id={`challenge-${challenge.id}`}
            className="text-[18px] leading-6 font-bold tracking-[-0.8px] max-[359px]:text-base"
          >
            {challenge.title}
          </h3>
          <div className="mt-0.5 flex items-center justify-between gap-1">
            <p className="whitespace-nowrap text-[15px] leading-7 tracking-[-0.4px] text-[#646b80] max-[359px]:text-[13px]">
              <time dateTime={challenge.startDate}>
                {formatShortDate(challenge.startDate)}
              </time>
              {" - "}
              <time dateTime={challenge.endDate}>
                {formatShortDate(challenge.endDate)}
              </time>
            </p>
            <span
              className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] leading-5 font-semibold ${statusStyles[challenge.status]}`}
            >
              {statusLabels[challenge.status]}
            </span>
          </div>
          <div
            className="mt-0.5 flex items-center gap-1.5"
            aria-label={`참여자 ${challenge.participantCount}명`}
          >
            <div className="flex -space-x-[5px]">
              {challenge.participantAvatars.slice(0, 4).map((avatarIndex) => (
                <Avatar
                  key={avatarIndex}
                  index={avatarIndex}
                  className="size-[23px] border border-surface"
                />
              ))}
            </div>
            <span className="text-[13px] leading-5 text-[#73798d]">
              {challenge.participantCount}명
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
