import { MobileScreen } from "@/components/layout/mobile-screen";

export default function SettlementPage() {
  return (
    <MobileScreen>
      <main className="px-6 pt-9 pb-10">
        <h1 className="text-[26px] font-bold tracking-[-1px]">상금 정산</h1>
        <section
          aria-label="내 상금"
          className="mt-8 flex items-center gap-4 rounded-xl bg-[#eaf0ff] px-5 py-7"
        >
          <span
            aria-hidden="true"
            className="relative block h-16 w-16 shrink-0 text-[46px]"
          >
            <span className="absolute -left-1 top-2">🪙</span>
            <span className="absolute top-0 left-4">🪙</span>
          </span>
          <div className="min-w-0">
            <h2 className="text-[18px] text-[#29447f]">내 상금</h2>
            <p className="mt-2 whitespace-nowrap text-[clamp(27px,8.5vw,34px)] leading-10 font-bold tracking-[-1px]">
              13,905원
            </p>
            <p className="mt-1 text-[15px] text-[#66728c]">(전체의 28.9%)</p>
          </div>
        </section>

        <section aria-labelledby="settlement-method-heading" className="mt-7">
          <h2 id="settlement-method-heading" className="text-[18px] font-bold">
            정산 계산 방식
          </h2>
          <dl className="mt-4 space-y-5 text-[17px]">
            <div className="flex items-start justify-between gap-2">
              <dt>총 상금</dt>
              <dd className="text-right">
                40,000원
                <span className="mt-1 block text-[13px] text-muted">
                  (참가비 10,000원 × 4명)
                </span>
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>내 기록</dt>
              <dd>24.3 km</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>총 러닝 거리</dt>
              <dd>84.0 km</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt>내 기여도</dt>
              <dd>28.9%</dd>
            </div>
            <div className="flex justify-between gap-2 border-t border-[#eef0f5] pt-5 font-bold">
              <dt>정산 금액</dt>
              <dd>13,905원</dd>
            </div>
          </dl>
        </section>
      </main>
    </MobileScreen>
  );
}
