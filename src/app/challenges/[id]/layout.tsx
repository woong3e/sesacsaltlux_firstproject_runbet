import type { ReactNode } from "react";
import { ChallengeLifecycle } from "@/components/challenges/challenge-lifecycle";

type ChallengeLayoutProps = {
  params: Promise<{ id: string }>;
  children: ReactNode;
};

export default async function ChallengeLayout({
  params,
  children,
}: ChallengeLayoutProps) {
  const { id } = await params;
  return (
    <ChallengeLifecycle key={id} challengeId={id}>
      {children}
    </ChallengeLifecycle>
  );
}
