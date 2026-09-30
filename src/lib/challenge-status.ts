import type { Challenge, ChallengeStatus } from "@/types/challenge";

export function getChallengeStatus(
  challenge: Pick<Challenge, "startDate" | "endDate">,
  now = Date.now(),
): ChallengeStatus {
  const startDate =
    challenge.startDate.length === 10
      ? challenge.startDate + "T00:00:00"
      : challenge.startDate;
  const endDate =
    challenge.endDate.length === 10
      ? challenge.endDate + "T23:59:59.999"
      : challenge.endDate;

  if (now < new Date(startDate).getTime()) return "upcoming";
  if (now <= new Date(endDate).getTime()) return "ongoing";
  return "done";
}
