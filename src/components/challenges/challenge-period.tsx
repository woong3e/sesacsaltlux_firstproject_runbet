"use client";

import { useQuery } from "@tanstack/react-query";
import { getChallenge } from "@/lib/api/challenges";

type ChallengePeriodProps = {
  challengeId: string;
};

function formatDate(value: string) {
  const date = new Date(value.length === 10 ? value + "T00:00:00" : value);
  const options: Intl.DateTimeFormatOptions =
    value.length === 10
      ? { month: "numeric", day: "numeric", weekday: "short" }
      : {
          month: "numeric",
          day: "numeric",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
}

export function ChallengePeriod({ challengeId }: ChallengePeriodProps) {
  const { data: challenge } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  if (!challenge) return null;

  return (
    <>
      {formatDate(challenge.startDate)} ~ {formatDate(challenge.endDate)}
    </>
  );
}
