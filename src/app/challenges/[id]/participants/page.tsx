import { MobileScreen } from "@/components/layout/mobile-screen";
import { ChallengeHeader } from "@/components/challenges/challenge-header";
import { ChallengeTabs } from "@/components/challenges/challenge-tabs";
import { ParticipantList } from "@/components/challenges/participant-list";

type ParticipantsPageProps = { params: Promise<{ id: string }> };

export default async function ParticipantsPage({
  params,
}: ParticipantsPageProps) {
  const { id } = await params;
  return (
    <MobileScreen>
      <ChallengeHeader challengeId={id} />
      <ChallengeTabs challengeId={id} active="participants" />
      <main className="px-6 pt-6 pb-10">
        <p className="mb-8 rounded-xl bg-[#f6f6fa] px-3 py-3 text-center text-[12px] leading-5 tracking-[-0.7px] text-muted">
          챌린지 종료 전까지 모든 참가자의 기록은 비공개입니다.
        </p>
        <ParticipantList challengeId={id} />
      </main>
    </MobileScreen>
  );
}
