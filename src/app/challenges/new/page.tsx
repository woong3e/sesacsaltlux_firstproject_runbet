import type { Metadata } from "next";
import { CreateChallengeForm } from "@/components/challenges/create-challenge-form";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: " 챌린지 만들기 | RunBet",
};

export default function CreateChallengePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-white">
      <PageHeader title="챌린지 만들기" backHref="/" />
      <main className="px-6 pt-6 pb-[max(32px,env(safe-area-inset-bottom))]">
        <CreateChallengeForm />
      </main>
    </div>
  );
}
