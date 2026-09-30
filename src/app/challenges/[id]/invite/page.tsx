import { InviteChallenge } from "@/components/challenges/invite-challenge";

type InvitePageProps = { params: Promise<{ id: string }> };

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params;
  return <InviteChallenge challengeId={id} />;
}
