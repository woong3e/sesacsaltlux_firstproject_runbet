import { getChallengeStatus } from "@/lib/challenge-status";
import { apiClient } from "@/lib/api/client";
import { deductBalance, DEMO_OWNER_ID } from "@/lib/api/users";
import type {
  Challenge,
  ChallengeParticipant,
  CreateChallengeInput,
} from "@/types/challenge";

export async function getChallenges(
  signal?: AbortSignal,
): Promise<Challenge[]> {
  const response = await apiClient.get<Challenge[]>("/challenges", { signal });
  return response.data;
}

export async function getChallenge(
  challengeId: string,
  signal?: AbortSignal,
): Promise<Challenge> {
  const response = await apiClient.get<Challenge>(`/challenges/${challengeId}`, {
    signal,
  });
  return response.data;
}

export async function createChallenge(
  input: CreateChallengeInput,
): Promise<Challenge> {
  const participant: ChallengeParticipant = {
    userId: DEMO_OWNER_ID,
    name: "나",
    avatarIndex: 0,
    joinedAt: new Date().toISOString(),
    paidAmount: input.entryFee,
    distance: 0,
    records: [],
  };
  const response = await apiClient.post<Challenge>("/challenges", {
    ...input,
    coverImage: "/images/running-sunset.png",
    participants: [participant],
  });

  try {
    await deductBalance(DEMO_OWNER_ID, input.entryFee);
  } catch (error) {
    await apiClient.delete(`/challenges/${response.data.id}`);
    throw error;
  }

  return response.data;
}

export type JoinChallengeInput = {
  challengeId: string;
  participant: ChallengeParticipant;
};

export async function joinChallenge({
  challengeId,
  participant,
}: JoinChallengeInput): Promise<Challenge> {
  const challenge = await getChallenge(challengeId);
  const currentParticipants = challenge.participants ?? [];

  if (getChallengeStatus(challenge) !== "upcoming") {
    throw new Error("챌린지 시작 전까지만 참여할 수 있어요.");
  }
  if (currentParticipants.some((item) => item.userId === participant.userId)) {
    throw new Error("이미 참여한 챌린지예요.");
  }
  if (currentParticipants.length >= challenge.maxParticipants) {
    throw new Error("참여 인원이 모두 찼어요.");
  }

  const participants = [...currentParticipants, participant];
  const response = await apiClient.patch<Challenge>(
    `/challenges/${challengeId}`,
    { participants },
  );

  try {
    await deductBalance(participant.userId, challenge.entryFee);
  } catch (error) {
    await apiClient.patch(`/challenges/${challengeId}`, {
      participants: currentParticipants,
    });
    throw error;
  }

  return response.data;
}
