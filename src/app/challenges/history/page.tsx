import Image from "next/image";
import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import {
  previewHistory,
  previewImage,
} from "@/components/challenges/preview-data";
import { Icon } from "@/components/ui/icon";

export default function ChallengeHistoryPage() {
  return (
    <MobileScreen>
      <main className="px-6 pt-9 pb-10">
        <h1 className="text-[26px] font-bold tracking-[-1px]">
          내 챌린지 기록
        </h1>
        <ul className="mt-8">
          {previewHistory.map((challenge) => (
            <li
              key={challenge.id}
              className="border-b border-[#eceef4] py-5 first:pt-0 last:border-0"
            >
              <Link
                href={`/challenges/${challenge.id}/results`}
                className="relative flex items-start gap-4 pr-1"
              >
                <Image
                  src={previewImage}
                  alt=""
                  width={74}
                  height={96}
                  sizes="74px"
                  className="h-24 w-[74px] shrink-0 rounded-xl border border-[#eeeeef] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="pt-0.5 text-[17px] leading-6 font-bold tracking-[-0.9px]">
                      {challenge.title}
                    </h2>
                    <span className="shrink-0 rounded-xl bg-[#e7eeff] px-3 py-1 text-[13px] text-brand">
                      종료
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted">
                    {challenge.period}
                  </p>
                  <p className="mt-2 text-[16px] text-[#626a80]">
                    {challenge.rank}등 / {challenge.distance}km
                  </p>
                  <p className="mt-1 text-[17px] font-semibold">
                    {challenge.prize}원 획득
                  </p>
                </div>
                <Icon
                  name="chevronRight"
                  className="absolute right-0 bottom-1 size-5 text-[#a9b2c7]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </MobileScreen>
  );
}
