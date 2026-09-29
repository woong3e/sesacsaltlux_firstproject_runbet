import { apiClient } from "@/lib/api/client";
import type { Challenge, CreateChallengeInput } from "@/types/challenge";

export async function getChallenges(
  signal?: AbortSignal,
): Promise<Challenge[]> {
  const response = await apiClient.get<Challenge[]>("/challenges", { signal });
  return response.data;
}

export async function createChallenge(
  input: CreateChallengeInput,
): Promise<Challenge> {
  const response = await apiClient.post<Challenge>("/challenges", {
    ...input,
    status: "upcoming",
    coverImage: "/images/running-sunset.png",
    participantCount: 1,
    participantAvatars: [0],
  });
  return response.data;
}
