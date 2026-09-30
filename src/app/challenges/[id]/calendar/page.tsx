import { MobileScreen } from "@/components/layout/mobile-screen";
import { ChallengeHeader } from "@/components/challenges/challenge-header";
import { ChallengeTabs } from "@/components/challenges/challenge-tabs";
import { ChallengeCalendar } from "@/components/challenges/challenge-calendar";

type CalendarPageProps = { params: Promise<{ id: string }> };

export default async function CalendarPage({ params }: CalendarPageProps) {
  const { id } = await params;
  return (
    <MobileScreen>
      <ChallengeHeader challengeId={id} />
      <ChallengeTabs challengeId={id} active="calendar" />
      <main className="px-6 pb-10">
        <ChallengeCalendar challengeId={id} />
      </main>
    </MobileScreen>
  );
}
