export type ChallengeStatus = "upcoming" | "ongoing" | "done";

export interface ChallengeRecord {
  id: string;
  date: string;
  distance: number;
  durationSeconds?: number;
  memo?: string;
}

export interface ChallengeParticipant {
  userId: string;
  name: string;
  avatarIndex: number;
  joinedAt: string;
  paidAmount: number;
  distance: number;
  records: ChallengeRecord[];
}

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
  coverImage: string;
  participants: ChallengeParticipant[];
}

export interface User {
  id: string;
  name: string;
  avatarIndex: number;
  balance: number;
}
