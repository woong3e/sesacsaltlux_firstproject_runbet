import { ChallengeResults } from "@/components/challenges/challenge-results";

type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ChallengeResults challengeId={id} />;
}
