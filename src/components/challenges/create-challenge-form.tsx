"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { DateRangeField } from "@/components/challenges/date-range-field";
import { EntryFeeField } from "@/components/challenges/entry-fee-field";
import { Icon } from "@/components/ui/icon";
import { createChallenge } from "@/lib/api/challenges";

const participantOptions = Array.from({ length: 9 }, (_, index) => index + 2);
const labelClassName =
  "mb-2 block text-[18px] leading-6 font-bold tracking-[-0.6px]";
const inputClassName =
  "w-full rounded-[9px] border border-[#e1e3eb] bg-white px-4 text-[15px] shadow-xs outline-none placeholder:text-[#9398a8] focus:border-brand focus:ring-2 focus:ring-brand/15";

export function CreateChallengeForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [entryFee, setEntryFee] = useState(10_000);
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const mutation = useMutation({
    mutationFn: createChallenge,
    onSuccess: async (challenge) => {
      await queryClient.invalidateQueries({ queryKey: ["challenges"] });
      router.push(`/challenges/${challenge.id}/invite`);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mutation.isPending) return;

    if (!title.trim()) {
      setValidationError(" 챌린지 제목을 입력해 주세요.");
      return;
    }

    if (!startDate || !endDate || endDate < startDate) {
      setValidationError("시작일과 종료일을 올바르게 선택해 주세요.");
      return;
    }

    setValidationError("");
    mutation.mutate({
      title: title.trim(),
      startDate,
      endDate,
      maxParticipants,
      entryFee,
      description: description.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label=" 챌린지 만들기"
      className="w-full"
    >
      <div>
        <label htmlFor="challenge-title" className={labelClassName}>
          챌린지 제목
        </label>
        <input
          id="challenge-title"
          name="title"
          type="text"
          placeholder="이번 주 러닝  챌린지"
          required
          maxLength={50}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={`${inputClassName} h-[50px]`}
        />
      </div>

      <div className="mt-7">
        <DateRangeField
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="mt-7">
        <label htmlFor="max-participants" className={labelClassName}>
          참가 인원
        </label>
        <div className="flex items-center justify-between gap-3">
          <p
            id="participant-description"
            className="pl-3 text-[14px] tracking-[-0.5px] text-muted"
          >
            최소 2명 ~ 최대 10명
          </p>
          <div className="relative w-32 shrink-0">
            <select
              id="max-participants"
              name="maxParticipants"
              aria-describedby="participant-description"
              value={maxParticipants}
              onChange={(event) =>
                setMaxParticipants(Number(event.target.value))
              }
              className={`${inputClassName} h-[50px] cursor-pointer appearance-none pr-10`}
            >
              {participantOptions.map((count) => (
                <option key={count} value={count}>
                  {count}명
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <EntryFeeField value={entryFee} onChange={setEntryFee} />
      </div>

      <div className="mt-9">
        <label htmlFor="challenge-description" className={labelClassName}>
          챌린지 설명 <span className="font-normal">(선택)</span>
        </label>
        <textarea
          id="challenge-description"
          name="description"
          placeholder="함께 열심히 달려봐요! 🏃"
          maxLength={500}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={`${inputClassName} block h-[76px] min-h-[76px] resize-y py-3.5`}
        />
      </div>

      {(validationError || mutation.isError) && (
        <p role="alert" className="mt-4 text-sm leading-5 text-red-600">
          {validationError ||
            " 챌린지을 생성하지 못했어요. 잠시 후 다시 시도해 주세요."}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-8 flex h-[60px] w-full items-center justify-center rounded-[10px] bg-[#181c25] text-[17px] font-bold tracking-[-0.5px] text-white shadow-sm transition-colors hover:bg-[#282e3b] disabled:cursor-wait disabled:opacity-60"
      >
        {mutation.isPending ? " 챌린지 생성 중..." : " 챌린지 생성하기"}
      </button>
    </form>
  );
}
