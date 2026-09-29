"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type RecordFormPreviewProps = { challengeId: string };

const inputStyle =
  "w-full rounded-[10px] border border-[#e0e3ec] bg-white px-4 text-[17px] outline-none placeholder:text-[#9198aa] focus:border-brand focus:ring-2 focus:ring-brand/15";

export function RecordFormPreview({ challengeId }: RecordFormPreviewProps) {
  const [date, setDate] = useState("2025-03-21");
  const [activeTab, setActiveTab] = useState("manual");
  const formattedDate = date
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "short",
      }).format(new Date(`${date}T00:00:00`))
    : "날짜 선택";

  return (
    <>
      <div
        role="tablist"
        aria-label="기록 입력 방법"
        className="mt-6 grid grid-cols-2 border-b border-[#f0f1f6]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "manual"}
          aria-controls="record-input-panel"
          id="manual-record-tab"
          onClick={() => setActiveTab("manual")}
          className={`h-12 border-b-2 text-[16px] ${activeTab === "manual" ? "border-brand font-semibold text-brand" : "border-transparent text-muted"}`}
        >
          직접 입력
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "import"}
          aria-controls="record-input-panel"
          id="import-record-tab"
          onClick={() => setActiveTab("import")}
          className={`h-12 border-b-2 text-[16px] ${activeTab === "import" ? "border-brand font-semibold text-brand" : "border-transparent text-muted"}`}
        >
          앱에서 가져오기
        </button>
      </div>

      <div
        role="tabpanel"
        id="record-input-panel"
        aria-labelledby={
          activeTab === "manual" ? "manual-record-tab" : "import-record-tab"
        }
        className="pt-8"
      >
        <div>
          <label htmlFor="record-date" className="mb-2 block text-[17px]">
            날짜
          </label>
          <div className="relative flex h-[54px] items-center gap-3 rounded-[10px] border border-[#e0e3ec] px-4 focus-within:border-brand">
            <Icon name="calendar" className="size-[21px]" />
            <span className="text-[15px]">{formattedDate}</span>
            <input
              id="record-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              onClick={(event) => event.currentTarget.showPicker?.()}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
          </div>
        </div>
        <div className="mt-7">
          <label htmlFor="record-distance" className="mb-2 block text-[17px]">
            거리 (km)
          </label>
          <input
            id="record-distance"
            type="number"
            min="0"
            step="0.01"
            defaultValue="5.23"
            className={`${inputStyle} h-[60px] font-semibold`}
          />
        </div>
        <fieldset className="mt-7">
          <legend className="mb-2 text-[17px] font-semibold">
            운동 시간 <span className="font-normal">(선택)</span>
          </legend>
          <div className="flex items-center gap-2 text-muted">
            <input
              type="text"
              inputMode="numeric"
              aria-label="운동 시간, 시"
              defaultValue="00"
              maxLength={2}
              className={`${inputStyle} h-[58px] min-w-0 text-center text-foreground`}
            />
            :
            <input
              type="text"
              inputMode="numeric"
              aria-label="운동 시간, 분"
              defaultValue="32"
              maxLength={2}
              className={`${inputStyle} h-[58px] min-w-0 text-center text-foreground`}
            />
            :
            <input
              type="text"
              inputMode="numeric"
              aria-label="운동 시간, 초"
              defaultValue="18"
              maxLength={2}
              className={`${inputStyle} h-[58px] min-w-0 text-center text-foreground`}
            />
          </div>
        </fieldset>
        <div className="mt-7">
          <label htmlFor="record-memo" className="mb-2 block text-[17px]">
            메모 (선택)
          </label>
          <textarea
            id="record-memo"
            placeholder="오늘도 달렸다! 🏃"
            className={`${inputStyle} min-h-[112px] resize-y py-4 text-[15px]`}
          />
        </div>
        <Link
          href={`/challenges/${challengeId}/records`}
          className="mt-5 flex h-[60px] items-center justify-center rounded-[10px] bg-[#181c25] text-[18px] font-bold text-white"
        >
          기록 등록하기
        </Link>
      </div>
    </>
  );
}
