"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { ParticipantList } from "@/components/challenges/participant-list";
import { Icon } from "@/components/ui/icon";
import { getChallenge } from "@/lib/api/challenges";
import { DEMO_OWNER_ID } from "@/lib/api/users";
import { getChallengeStatus } from "@/lib/challenge-status";

type ChallengeDashboardProps = {
  challengeId: string;
};

function parseDate(value: string) {
  return new Date(value.length === 10 ? value + "T00:00:00" : value);
}

function formatDate(value: string) {
  const options: Intl.DateTimeFormatOptions =
    value.length === 10
      ? { year: "numeric", month: "numeric", day: "numeric" }
      : {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };
  return new Intl.DateTimeFormat("ko-KR", options).format(parseDate(value));
}

function getCountdown(startDate: string, endDate: string, status: string) {
  if (status === "done") return "종료";

  const targetDate = parseDate(status === "upcoming" ? startDate : endDate);
  const today = new Date();
  const targetDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  ).getTime();
  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const remainingDays = Math.max(
    0,
    Math.round((targetDay - todayDay) / 86_400_000),
  );
  return remainingDays === 0 ? "D-Day" : "D-" + remainingDays;
}

export function ChallengeDashboard({
  challengeId,
}: ChallengeDashboardProps) {
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  if (isPending) {
    return (
      <MobileScreen>
        <p role="status" className="p-8 text-sm text-muted">
          챌린지를 불러오는 중입니다.
        </p>
      </MobileScreen>
    );
  }

  if (isError || !challenge) {
    return (
      <MobileScreen>
        <p role="alert" className="p-8 text-sm text-red-600">
          챌린지를 불러오지 못했어요.
        </p>
      </MobileScreen>
    );
  }

  const status = getChallengeStatus(challenge);
  const countdown = getCountdown(
    challenge.startDate,
    challenge.endDate,
    status,
  );
  const myDistance =
    challenge.participants.find(
      (participant) => participant.userId === DEMO_OWNER_ID,
    )?.distance ?? 0;

  return (
    <MobileScreen>
      <section className="relative isolate h-[350px] shrink-0 rounded-b-2xl text-white">
        <Image
          src={challenge.coverImage}
          alt=""
          fill
          sizes="390px"
          className="-z-20 rounded-b-2xl object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 rounded-b-2xl bg-linear-to-b from-black/55 via-black/70 to-black/85" />
        <header className="flex h-20 items-center justify-between px-3">
          <Link
            href="/"
            aria-label="홈으로 돌아가기"
            className="flex size-11 items-center justify-center rounded-lg"
          >
            <Icon name="chevronLeft" />
          </Link>
          <Link
            href={"/challenges/" + challengeId + "/invite"}
            aria-label="챌린지 초대 화면"
            className="flex size-11 items-center justify-center rounded-lg"
          >
            <Icon name="settings" />
          </Link>
        </header>
        <div className="mt-4 px-6">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[25px] font-bold tracking-[-1px]">
              {challenge.title}
            </h1>
            {status === "done" ? (
              <Link
                href={"/challenges/" + challengeId + "/waiting"}
                className="shrink-0 rounded-xl bg-[#3862b6] px-3 py-1.5 text-sm"
              >
                {countdown}
              </Link>
            ) : (
              <span className="shrink-0 rounded-xl bg-[#3862b6] px-3 py-1.5 text-sm">
                {countdown}
              </span>
            )}
          </div>
          <Link
            href={"/challenges/" + challengeId + "/calendar"}
            className="mt-2 inline-block text-[16px]"
          >
            {formatDate(challenge.startDate)} ~ {formatDate(challenge.endDate)}
          </Link>
        </div>

        <section
          aria-labelledby="my-record-heading"
          className="absolute top-[205px] right-3.5 left-3.5 rounded-2xl bg-white p-5 text-foreground shadow-[0_8px_24px_#252c5310]"
        >
          <h2 id="my-record-heading" className="text-[17px] font-medium">
            내 기록
          </h2>
          <Link
            href={"/challenges/" + challengeId + "/records"}
            className="mt-3 flex items-center gap-3"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-[#c5d4ff] bg-radial from-white to-[#e4ecff] text-brand">
              <Icon name="runner" className="size-8" />
            </span>
            <span className="flex-1 text-[38px] leading-tight font-bold tracking-[-1.5px]">
              {myDistance.toFixed(2)}
              <span className="ml-1 text-[22px] font-semibold">km</span>
            </span>
            <Icon name="chevronRight" className="size-6 text-[#b7bdcc]" />
          </Link>
          <Link
            href={"/challenges/" + challengeId + "/records/new"}
            className="mt-6 flex h-14 items-center justify-center rounded-xl bg-brand text-[18px] font-semibold text-white shadow-sm"
          >
            러닝 기록 추가하기
          </Link>
        </section>
      </section>

      <main className="px-7 pt-[122px] pb-10">
        <ParticipantList challengeId={challengeId} />
      </main>
    </MobileScreen>
  );
}
