"use client";

import { useQuery } from "@tanstack/react-query";
import { getChallenge } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";

type WeeklyRecordsProps = {
  challengeId: string;
};

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;

  if (hours > 0) {
    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainder).padStart(2, "0")
    );
  }

  return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(date + "T00:00:00"));
}

export function WeeklyRecords({ challengeId }: WeeklyRecordsProps) {
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });
  const participant = challenge?.participants.find(
    (item) => item.userId === DEMO_OWNER_ID,
  );
  const records = [...(participant?.records ?? [])].sort((left, right) =>
    right.date.localeCompare(left.date),
  );
  const totalDistance = records.reduce(
    (total, record) => total + record.distance,
    0,
  );
  const timedRecords = records.filter(
    (record) => record.durationSeconds !== undefined,
  );
  const timedDistance = timedRecords.reduce(
    (total, record) => total + record.distance,
    0,
  );
  const timedSeconds = timedRecords.reduce(
    (total, record) => total + (record.durationSeconds ?? 0),
    0,
  );
  const averagePace =
    timedDistance > 0 ? Math.round(timedSeconds / timedDistance) : undefined;

  if (isPending) {
    return <p role="status" className="text-sm text-muted">기록을 불러오는 중입니다.</p>;
  }

  if (isError || !challenge || !participant) {
    return <p role="alert" className="text-sm text-red-600">기록을 불러오지 못했어요.</p>;
  }

  return (
    <>
      <section aria-labelledby="weekly-records-heading">
        <h2 id="weekly-records-heading" className="text-[18px] font-bold">
          날짜별 기록
        </h2>
      </section>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#f6f6fa] px-5 py-6">
          <dt className="text-[15px] text-muted">누적 거리</dt>
          <dd className="mt-2 whitespace-nowrap text-[28px] font-bold tracking-[-1px] text-brand">
            {totalDistance.toFixed(2)}
            <span className="ml-1 text-sm font-medium">km</span>
          </dd>
        </div>
        <div className="rounded-2xl bg-[#f6f6fa] px-5 py-6">
          <dt className="text-[15px] text-muted">평균 페이스</dt>
          <dd className="mt-2 whitespace-nowrap text-[26px] font-bold tracking-[-1px]">
            {averagePace === undefined
              ? "-"
              : Math.floor(averagePace / 60) +
                "′" +
                String(averagePace % 60).padStart(2, "0") +
                "″"}
            <span className="ml-1 text-[13px] font-medium">/ km</span>
          </dd>
        </div>
      </dl>

      <section aria-label="등록한 러닝 기록" className="mt-8">
        {records.length === 0 ? (
          <p className="rounded-xl bg-[#f6f6fa] px-4 py-8 text-center text-sm text-muted">
            아직 등록한 기록이 없어요.
          </p>
        ) : (
          <ul className="space-y-3">
            {records.map((record) => (
              <li
                key={record.id}
                className="rounded-xl bg-[#f6f6fa] px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <time
                    dateTime={record.date}
                    className="text-sm font-semibold text-muted"
                  >
                    {formatDate(record.date)}
                  </time>
                  <span className="text-lg font-bold text-brand">
                    {record.distance.toFixed(2)} km
                  </span>
                </div>
                {record.durationSeconds !== undefined && (
                  <p className="mt-1 text-sm text-muted">
                    운동 시간 {formatDuration(record.durationSeconds)}
                  </p>
                )}
                {record.memo && (
                  <p className="mt-2 whitespace-pre-wrap text-sm">
                    {record.memo}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="mt-8 flex items-center gap-4 rounded-xl bg-[#f5f5f9] px-5 py-5">
        <span aria-hidden="true" className="text-2xl">🔒</span>
        <p className="text-[12px] leading-[1.8] tracking-[-0.4px] text-muted">
          나만 볼 수 있는 기록이에요.
          <br />
          다른 참가자들은 내 기록을 볼 수 없어요.
        </p>
      </div>
    </>
  );
}
