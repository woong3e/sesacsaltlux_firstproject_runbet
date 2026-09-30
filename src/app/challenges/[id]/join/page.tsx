import { JoinChallenge } from "@/components/challenges/join-challenge";

type JoinPageProps = { params: Promise<{ id: string }> };

export default async function JoinPage({ params }: JoinPageProps) {
  const { id } = await params;
  return <JoinChallenge challengeId={id} />;
}
