"use client";

import { Icon } from "@/components/ui/icon";

type DateRangeFieldProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function DateRangeField({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFieldProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[18px] leading-6 font-bold tracking-[-0.6px]">
        챌린지 기간
      </legend>
      <div className="flex h-[50px] items-center gap-2 rounded-[9px] border border-[#e1e3eb] px-3 shadow-xs">
        <Icon name="calendar" className="size-[19px] shrink-0" />
        <label className="relative flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
          <span className="sr-only">시작 일시</span>
          <span
            aria-hidden="true"
            className={`whitespace-nowrap text-[clamp(10px,3vw,13px)] tracking-[-0.4px] ${startDate ? "text-foreground" : "text-muted"}`}
          >
            {startDate ? formatDateTime(startDate) : "시작 일시 선택"}
          </span>
          <input
            type="datetime-local"
            name="startDate"
            required
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value)}
            onClick={(event) => event.currentTarget.showPicker?.()}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
        <span aria-hidden="true" className="text-sm">
          ~
        </span>
        <label className="relative flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand">
          <span className="sr-only">종료 일시</span>
          <span
            aria-hidden="true"
            className={`whitespace-nowrap text-[clamp(10px,3vw,13px)] tracking-[-0.4px] ${endDate ? "text-foreground" : "text-muted"}`}
          >
            {endDate ? formatDateTime(endDate) : "종료 일시 선택"}
          </span>
          <input
            type="datetime-local"
            name="endDate"
            required
            min={startDate || undefined}
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value)}
            onClick={(event) => event.currentTarget.showPicker?.()}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </fieldset>
  );
}
