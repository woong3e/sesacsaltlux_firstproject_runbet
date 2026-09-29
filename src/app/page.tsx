import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { HomeHeader } from "@/components/home/home-header";
import { RunningHero } from "@/components/home/running-hero";
import { ChallengeList } from "@/components/home/challenge-list";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-white">
      <HomeHeader />
      <main className="flex-1 px-3.5 pb-3">
        <RunningHero />
        <ChallengeList />
      </main>
      <BottomNavigation />
    </div>
  );
}
