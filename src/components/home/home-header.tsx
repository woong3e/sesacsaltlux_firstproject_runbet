import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";

export function HomeHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-5">
      <Link
        href="/"
        aria-label="RunBet 홈"
        className="flex items-center gap-1.5"
      >
        <Icon name="brand" className="size-6 text-[#185798]" />
        <span className="text-[19px] font-extrabold tracking-[-0.8px]">
          RunBet
        </span>
      </Link>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="알림 (준비 중)"
          title="알림 화면은 준비 중입니다."
          className="flex size-10 items-center justify-center text-[#a2a8b9]"
        >
          <Icon name="bell" className="size-[21px]" />
        </button>
        <Link
          href="/challenges/history"
          aria-label="내  챌린지 기록"
          className="flex size-10 items-center justify-center"
        >
          <Avatar index={0} className="size-7" />
        </Link>
      </div>
    </header>
  );
}
