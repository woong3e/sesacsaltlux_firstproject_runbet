import { apiClient } from "@/lib/api/client";
import { getChallengeStatus } from "@/lib/challenge-status";
import type { Challenge, ChallengeRecord } from "@/types/challenge";

export type AddChallengeRecordInput = {
  challengeId: string;
  userId: string;
  date: string;
  distance: number;
  durationSeconds?: number;
  memo?: string;
};

export async function addChallengeRecord({
  challengeId,
  userId,
  date,
  distance,
  durationSeconds,
  memo,
}: AddChallengeRecordInput): Promise<Challenge> {
  if (!Number.isFinite(distance) || distance <= 0) {
    throw new Error("거리는 0보다 큰 숫자로 입력해 주세요.");
  }

  const response = await apiClient.get<Challenge>(
    "/challenges/" + challengeId,
  );
  const challenge = response.data;
  if (getChallengeStatus(challenge) === "done") {
    throw new Error("종료된 챌린지에는 기록을 등록할 수 없어요.");
  }
  const participant = challenge.participants.find(
    (item) => item.userId === userId,
  );

  if (!participant) {
    throw new Error("이 챌린지의 참가자만 기록을 등록할 수 있어요.");
  }

  const startDate = challenge.startDate.slice(0, 10);
  const endDate = challenge.endDate.slice(0, 10);
  if (date < startDate || date > endDate) {
    throw new Error("챌린지 기간 안의 날짜를 선택해 주세요.");
  }

  const record: ChallengeRecord = {
    id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2),
    date,
    distance,
    ...(durationSeconds === undefined ? {} : { durationSeconds }),
    ...(memo ? { memo } : {}),
  };
  const records = [...participant.records, record];
  const totalDistance = Number(
    records.reduce((total, item) => total + item.distance, 0).toFixed(2),
  );
  const participants = challenge.participants.map((item) =>
    item.userId === userId ? { ...item, records, distance: totalDistance } : item,
  );

  const updated = await apiClient.patch<Challenge>(
    "/challenges/" + challengeId,
    { participants },
  );
  return updated.data;
}
