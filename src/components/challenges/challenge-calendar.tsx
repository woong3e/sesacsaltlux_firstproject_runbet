"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { getChallenge } from "@/lib/api/challenges";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

type ChallengeCalendarProps = {
  challengeId: string;
};

type CalendarProps = {
  startDate: string;
  endDate: string;
};

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(value: string) {
  return new Date(value.length === 10 ? value + "T00:00:00" : value);
}

export function ChallengeCalendar({ challengeId }: ChallengeCalendarProps) {
  const { data: challenge, isPending, isError } = useQuery({
    queryKey: ["challenges", challengeId],
    queryFn: ({ signal }) => getChallenge(challengeId, signal),
  });

  if (isPending) {
    return (
      <p role="status" className="pt-8 text-sm text-muted">
        챌린지 일정을 불러오는 중입니다.
      </p>
    );
  }

  if (isError || !challenge) {
    return (
      <p role="alert" className="pt-8 text-sm text-red-600">
        챌린지 일정을 불러오지 못했어요.
      </p>
    );
  }

  return (
    <Calendar
      key={`${challengeId}-${challenge.startDate}-${challenge.endDate}`}
      startDate={challenge.startDate}
      endDate={challenge.endDate}
    />
  );
}

function Calendar({ startDate, endDate }: CalendarProps) {
  const start = parseDate(startDate);
  const startDateKey = getDateKey(start);
  const endDateKey = getDateKey(parseDate(endDate));
  const [month, setMonth] = useState(
    () => new Date(start.getFullYear(), start.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(startDateKey);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const cells = Array.from(
    { length: cellCount },
    (_, index) => new Date(year, monthIndex, index - firstWeekday + 1),
  );

  return (
    <section aria-label=" 챌린지 일정 달력" className="pt-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="이전 달"
          onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}
          className="flex size-11 items-center justify-center text-[#c3c9d7]"
        >
          <Icon name="chevronLeft" className="size-5" />
        </button>
        <h2 aria-live="polite" className="text-[19px] font-bold">
          {monthIndex + 1}월 {year}
        </h2>
        <button
          type="button"
          aria-label="다음 달"
          onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}
          className="flex size-11 items-center justify-center text-[#c3c9d7]"
        >
          <Icon name="chevronRight" className="size-5" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-7 text-center text-[13px] text-muted">
        {weekdays.map((day) => (
          <span key={day} className="py-3">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2">
        {cells.map((date) => {
          const day = date.getDate();
          const dateKey = getDateKey(date);
          const inMonth = date.getMonth() === monthIndex;
          const inChallenge =
            dateKey >= startDateKey && dateKey <= endDateKey;
          const selected = selectedDate === dateKey;
          return (
            <div
              key={dateKey}
              className={`my-1 flex h-10 items-center justify-center ${inChallenge ? "bg-[#e5edff]" : ""} ${dateKey === startDateKey || date.getDay() === 0 ? "rounded-l-full" : ""} ${dateKey === endDateKey || date.getDay() === 6 ? "rounded-r-full" : ""}`}
            >
              <button
                type="button"
                onClick={() => setSelectedDate(dateKey)}
                aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${day}일${inChallenge ? ",  챌린지 기간" : ""}`}
                aria-pressed={selected}
                className={`flex size-10 items-center justify-center rounded-full text-[15px] ${selected ? "bg-brand text-white" : inMonth ? "text-foreground" : "text-[#d7dbe5]"}`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex items-center gap-6 px-2 text-[14px] text-muted">
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-brand" />
          챌린지 기간
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-[#b4ceff]" />
          오늘
        </span>
      </div>
    </section>
  );
}
