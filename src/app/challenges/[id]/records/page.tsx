import { MobileScreen } from "@/components/layout/mobile-screen";
import { ChallengeHeader } from "@/components/challenges/challenge-header";
import { ChallengeTabs } from "@/components/challenges/challenge-tabs";
import { WeeklyRecords } from "@/components/challenges/weekly-records";

type RecordsPageProps = { params: Promise<{ id: string }> };

export default async function RecordsPage({ params }: RecordsPageProps) {
  const { id } = await params;
  return (
    <MobileScreen>
      <ChallengeHeader challengeId={id} />
      <ChallengeTabs challengeId={id} active="records" />
      <main className="px-6 pt-9 pb-10">
        <WeeklyRecords />
      </main>
    </MobileScreen>
  );
}
