"use client";

const entryFees = [5_000, 10_000, 20_000];

type EntryFeeFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export function EntryFeeField({ value, onChange }: EntryFeeFieldProps) {
  return (
    <fieldset aria-describedby="prize-description" className="min-w-0">
      <legend className="mb-2 text-[18px] leading-6 font-bold tracking-[-0.6px]">
        참가비 (1인당)
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {entryFees.map((fee) => (
          <label key={fee} className="relative cursor-pointer">
            <input
              type="radio"
              name="entryFee"
              value={fee}
              checked={value === fee}
              onChange={() => onChange(fee)}
              className="peer sr-only"
            />
            <span className="flex h-[50px] items-center justify-center rounded-[9px] border border-[#e1e3eb] text-[15px] text-[#454b5e] shadow-xs peer-checked:border-brand peer-checked:bg-[#f8faff] peer-checked:font-bold peer-checked:text-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {fee.toLocaleString("ko-KR")}원
            </span>
          </label>
        ))}
      </div>
      <p
        id="prize-description"
        className="mt-2.5 text-[13px] leading-5 tracking-[-0.5px] text-muted"
      >
        * 총 상금은 참가비 × 참가 인원으로 자동 계산됩니다.
      </p>
    </fieldset>
  );
}
