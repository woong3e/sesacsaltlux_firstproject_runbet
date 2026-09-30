import type { Challenge, ChallengeResult } from "@/types/challenge";

export function getChallengeResults(challenge: Challenge): ChallengeResult {
  const participants = challenge.participants
    .map((participant) => ({
      ...participant,
      distance: Number(
        participant.records
          .reduce((sum, record) => sum + record.distance, 0)
          .toFixed(2),
      ),
    }))
    .sort((left, right) => right.distance - left.distance);
  // 0.01km 단위로 합산해 소수점 연산 오차를 줄입니다.
  const totalDistanceUnits = participants.reduce(
    (sum, participant) => sum + Math.round(participant.distance * 100),
    0,
  );
  const totalDistance = totalDistanceUnits / 100;
  const totalPrize = participants.reduce(
    (sum, participant) => sum + participant.paidAmount,
    0,
  );
  const rankings = participants.map((participant) => {
    const distanceUnits = Math.round(participant.distance * 100);
    const contribution =
      totalDistanceUnits > 0 ? distanceUnits / totalDistanceUnits : 0;

    return {
      ...participant,
      rank:
        participant.distance > 0
          ? participants.findIndex(
              (item) => item.distance === participant.distance,
            ) + 1
          : null,
      contribution,
      // 표시용 1km당 금액을 반올림하기 전에 계산하고 원 미만은 버립니다.
      prize:
        totalDistanceUnits > 0
          ? Math.floor((totalPrize * distanceUnits) / totalDistanceUnits)
          : 0,
    };
  });

  return {
    rankings,
    totalDistance,
    totalPrize,
    amountPerKm: totalDistance > 0 ? totalPrize / totalDistance : 0,
  };
}
