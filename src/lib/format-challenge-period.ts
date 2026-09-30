export function formatChallengeDate(value: string) {
  const date = new Date(value.length === 10 ? value + "T00:00:00" : value);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...(value.length > 10
      ? ({ hour: "2-digit", minute: "2-digit", hour12: false } as const)
      : {}),
  }).format(date);
}

export function formatChallengePeriod(startDate: string, endDate: string) {
  return `${formatChallengeDate(startDate)} ~ ${formatChallengeDate(endDate)}`;
}
