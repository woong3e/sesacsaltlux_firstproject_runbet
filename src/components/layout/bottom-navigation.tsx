import Link from "next/link";
import { Icon } from "@/components/ui/icon";

const upcomingTabs = [
  { label: " 챌린지", icon: "challenge", href: "/challenges/weekend-running" },
  {
    label: "기록",
    icon: "record",
    href: "/challenges/weekend-running/records",
  },
  { label: "프로필", icon: "profile", href: "/challenges/history" },
] as const;

export function BottomNavigation() {
  const tabClassName =
    "flex min-h-11 flex-col items-center justify-center gap-1 text-[13px] leading-5";

  return (
    <nav
      aria-label="주 메뉴"
      className="sticky bottom-0 z-10 grid shrink-0 grid-cols-4 border-t border-[#f0f1f6] bg-white px-1 pt-3 pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      <Link
        href="/"
        aria-current="page"
        className={`${tabClassName} font-semibold text-brand`}
      >
        <Icon name="home" className="size-6" />홈
      </Link>
      {upcomingTabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          className={`${tabClassName} text-[#9096a9]`}
        >
          <Icon name={tab.icon} className="size-6" />
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
