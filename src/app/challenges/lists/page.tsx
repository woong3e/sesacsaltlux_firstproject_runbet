"use client";

import { ChallengeList } from "@/components/home/challenge-list";
import { HomeHeader } from "@/components/home/home-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

export default function Lists() {
  return (
    <>
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-white">
        <HomeHeader />
        <main className="flex-1 px-3.5 pb-3">
          <ChallengeList showViewAll={false} />
        </main>
        <BottomNavigation />
      </div>
    </>
  );
}
