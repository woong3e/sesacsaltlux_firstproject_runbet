export type ChallengeStatus = "ongoing" | "upcoming";

export interface CreateChallengeInput {
  title: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  entryFee: number;
  description: string;
}

export interface Challenge extends CreateChallengeInput {
  id: string;
  status: ChallengeStatus;
  coverImage: string;
  participantCount: number;
  participantAvatars: number[];
}
