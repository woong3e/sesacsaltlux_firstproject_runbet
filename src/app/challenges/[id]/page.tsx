import Image from "next/image";
import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { ParticipantList } from "@/components/challenges/participant-list";
import {
  previewImage,
  previewPeriod,
  previewTitle,
} from "@/components/challenges/preview-data";
import { Icon } from "@/components/ui/icon";

type DashboardPageProps = { params: Promise<{ id: string }> };

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { id } = await params;

  return (
    <MobileScreen>
      <section className="relative isolate h-[350px] shrink-0 rounded-b-2xl text-white">
        <Image
          src={previewImage}
          alt=" 챌린지 배경"
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
            href={`/challenges/${id}/invite`}
            aria-label=" 챌린지 초대 설정"
            className="flex size-11 items-center justify-center rounded-lg"
          >
            <Icon name="settings" />
          </Link>
        </header>
        <div className="mt-4 px-6">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[25px] font-bold tracking-[-1px]">
              {previewTitle}
            </h1>
            <Link
              href={`/challenges/${id}/waiting`}
              aria-label=" 챌린지 종료 대기 화면 보기"
              className="rounded-xl bg-[#3862b6] px-3 py-1.5 text-sm"
            >
              D-3
            </Link>
          </div>
          <Link
            href={`/challenges/${id}/calendar`}
            className="mt-2 inline-block text-[16px]"
          >
            {previewPeriod}
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
            href={`/challenges/${id}/records`}
            className="mt-3 flex items-center gap-3"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-[#c5d4ff] bg-radial from-white to-[#e4ecff] text-brand">
              <Icon name="runner" className="size-8" />
            </span>
            <span className="flex-1 text-[38px] leading-tight font-bold tracking-[-1.5px]">
              18.4<span className="ml-1 text-[22px] font-semibold">km</span>
            </span>
            <Icon name="chevronRight" className="size-6 text-[#b7bdcc]" />
          </Link>
          <Link
            href={`/challenges/${id}/records/new`}
            className="mt-6 flex h-14 items-center justify-center rounded-xl bg-brand text-[18px] font-semibold text-white shadow-sm"
          >
            러닝 기록 추가하기
          </Link>
        </section>
      </section>

      <main className="px-7 pt-[122px] pb-10">
        <h2 className="mb-6 text-[18px] font-bold">
          <Link href={`/challenges/${id}/participants`}>참가자 (4명)</Link>
        </h2>
        <ParticipantList challengeId={id} />
      </main>
    </MobileScreen>
  );
}
