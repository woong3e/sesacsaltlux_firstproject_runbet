"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { addChallengeRecord } from "@/lib/api/records";
import { DEMO_OWNER_ID } from "@/lib/api/users";

type RecordFormPreviewProps = { challengeId: string };

const inputStyle =
  "w-full rounded-[10px] border border-[#e0e3ec] bg-white px-4 text-[17px] outline-none placeholder:text-[#9198aa] focus:border-brand focus:ring-2 focus:ring-brand/15";

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

export function RecordFormPreview({ challengeId }: RecordFormPreviewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(getToday);
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [memo, setMemo] = useState("");
  const [activeTab, setActiveTab] = useState<"manual" | "import">("manual");
  const [validationError, setValidationError] = useState("");

  const mutation = useMutation({
    mutationFn: addChallengeRecord,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["challenges", challengeId],
      });
      await queryClient.invalidateQueries({ queryKey: ["challenges"] });
      router.push("/challenges/" + challengeId + "/records");
    },
  });

  const formattedDate = date
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "short",
      }).format(new Date(date + "T00:00:00"))
    : "날짜 선택";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mutation.isPending) return;

    const distanceValue = Number(distance);
    if (!Number.isFinite(distanceValue) || distanceValue <= 0) {
      setValidationError("0보다 큰 거리를 입력해 주세요.");
      return;
    }

    const hasDuration = Boolean(hours || minutes || seconds);
    const hourValue = Number(hours || 0);
    const minuteValue = Number(minutes || 0);
    const secondValue = Number(seconds || 0);
    const durationValuesAreValid = [hourValue, minuteValue, secondValue].every(
      (value) => Number.isInteger(value) && value >= 0,
    );
    if (
      hasDuration &&
      (!durationValuesAreValid || minuteValue >= 60 || secondValue >= 60)
    ) {
      setValidationError("운동 시간을 올바르게 입력해 주세요.");
      return;
    }

    setValidationError("");
    mutation.mutate({
      challengeId,
      userId: DEMO_OWNER_ID,
      date,
      distance: distanceValue,
      ...(hasDuration
        ? {
            durationSeconds:
              hourValue * 3600 + minuteValue * 60 + secondValue,
          }
        : {}),
      memo: memo.trim(),
    });
  }

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
          className={"h-12 border-b-2 text-[16px] " + (activeTab === "manual" ? "border-brand font-semibold text-brand" : "border-transparent text-muted")}
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
          className={"h-12 border-b-2 text-[16px] " + (activeTab === "import" ? "border-brand font-semibold text-brand" : "border-transparent text-muted")}
        >
          앱에서 가져오기
        </button>
      </div>

      <form
        id="record-input-panel"
        aria-labelledby={activeTab === "manual" ? "manual-record-tab" : "import-record-tab"}
        onSubmit={handleSubmit}
        className="pt-8"
      >
        {activeTab === "import" && (
          <p className="mb-6 rounded-xl bg-surface p-4 text-sm text-muted">
            앱 기록 가져오기는 아직 준비 중이에요. 직접 입력 탭을 이용해 주세요.
          </p>
        )}
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
              required
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
            name="distance"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            placeholder="예: 5.23"
            className={inputStyle + " h-[60px] font-semibold"}
          />
        </div>
        <fieldset className="mt-7">
          <legend className="mb-2 text-[17px] font-semibold">
            운동 시간 <span className="font-normal">(선택)</span>
          </legend>
          <div className="flex items-center gap-2 text-muted">
            <input
              type="number"
              inputMode="numeric"
              aria-label="운동 시간, 시"
              min="0"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              placeholder="00"
              className={inputStyle + " h-[58px] min-w-0 text-center text-foreground"}
            />
            :
            <input
              type="number"
              inputMode="numeric"
              aria-label="운동 시간, 분"
              min="0"
              max="59"
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              placeholder="분"
              className={inputStyle + " h-[58px] min-w-0 text-center text-foreground"}
            />
            :
            <input
              type="number"
              inputMode="numeric"
              aria-label="운동 시간, 초"
              min="0"
              max="59"
              value={seconds}
              onChange={(event) => setSeconds(event.target.value)}
              placeholder="초"
              className={inputStyle + " h-[58px] min-w-0 text-center text-foreground"}
            />
          </div>
        </fieldset>
        <div className="mt-7">
          <label htmlFor="record-memo" className="mb-2 block text-[17px]">
            메모 (선택)
          </label>
          <textarea
            id="record-memo"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            placeholder="오늘도 달렸다! 🏃"
            className={inputStyle + " min-h-[112px] resize-y py-4 text-[15px]"}
          />
        </div>
        {(validationError || mutation.isError) && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {validationError || mutation.error?.message || "기록을 저장하지 못했어요."}
          </p>
        )}
        <button
          type="submit"
          disabled={mutation.isPending || activeTab === "import"}
          className="mt-5 flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#181c25] text-[18px] font-bold text-white disabled:cursor-wait disabled:opacity-50"
        >
          {mutation.isPending ? "저장 중..." : "기록 등록하기"}
        </button>
      </form>
    </>
  );
}
