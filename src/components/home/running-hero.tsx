import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function RunningHero() {
  return (
    <section
      aria-labelledby="home-heading"
      className="relative isolate aspect-square overflow-hidden rounded-[14px] bg-[#44413e] text-white"
    >
      <Image
        src="/images/running-sunset.png"
        alt="노을 지는 길을 달리는 러너의 뒷모습"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(max-width: 390px) calc(100vw - 28px), 362px"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/20 via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
      <div className="absolute top-[27%] right-4 left-5">
        <h1
          id="home-heading"
          className="text-[clamp(26px,8.2vw,32px)] leading-[1.35] font-extrabold tracking-[-1.4px]"
        >
          끝날 때까지
          <br />
          아무도 모른다.
        </h1>
        <p className="mt-3 text-[clamp(15px,4.6vw,18px)] leading-[1.45] font-semibold tracking-[-0.6px]">
          기록은 비공개,
          <br />
          결과는 마지막에.
        </p>
      </div>
      <Link
        href="/challenges/new"
        className="absolute bottom-6 left-5 flex h-[50px] items-center gap-3 rounded-[14px] bg-white px-5 text-base font-bold tracking-[-0.5px] text-foreground shadow-sm"
      >
        챌린지 만들기
        <Icon name="arrowRight" className="size-5" />
      </Link>
    </section>
  );
}
