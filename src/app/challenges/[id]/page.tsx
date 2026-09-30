import { ChallengeDashboard } from "@/components/challenges/challenge-dashboard";

type DashboardPageProps = { params: Promise<{ id: string }> };

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;
  return <ChallengeDashboard challengeId={id} />;
}
