import { redirect } from "next/navigation";

type WaitingPageProps = { params: Promise<{ id: string }> };

export default async function WaitingPage({ params }: WaitingPageProps) {
  const { id } = await params;
  redirect(`/challenges/${id}/results`);
}
