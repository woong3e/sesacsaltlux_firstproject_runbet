import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { previewTitle } from "@/components/challenges/preview-data";

type ChallengeHeaderProps = {
  challengeId: string;
};

export function ChallengeHeader({ challengeId }: ChallengeHeaderProps) {
  return (
    <header className="flex h-20 shrink-0 items-center gap-2 px-3">
      <Link
        href={`/challenges/${challengeId}`}
        aria-label=" 챌린지 대시보드로 돌아가기"
        className="flex size-11 shrink-0 items-center justify-center rounded-lg"
      >
        <Icon name="chevronLeft" className="size-6" />
      </Link>
      <h1 className="min-w-0 flex-1 text-[19px] font-bold tracking-[-0.8px]">
        {previewTitle}
      </h1>
      <Link
        href={`/challenges/${challengeId}/invite`}
        aria-label=" 챌린지 초대 설정"
        className="flex size-11 shrink-0 items-center justify-center rounded-lg"
      >
        <Icon name="settings" className="size-[23px]" />
      </Link>
    </header>
  );
}
