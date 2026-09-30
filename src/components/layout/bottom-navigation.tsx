"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

const tabs = [
  { label: "홈", icon: "home", href: "/" },
  { label: "챌린지", icon: "challenge", href: "/challenges/lists" },
  {
    label: "기록",
    icon: "record",
    href: "/challenges/history",
  },
  { label: "프로필", icon: "profile", href: "/profile" },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();
  const activeTab =
    pathname === "/profile"
      ? "프로필"
      : pathname === "/challenges/history" ||
          pathname.includes("/records") ||
          pathname.endsWith("/results") ||
          pathname.endsWith("/settlement")
        ? "기록"
        : pathname.startsWith("/challenges")
          ? "챌린지"
          : "홈";
  const tabClassName =
    "flex min-h-11 flex-col items-center justify-center gap-1 text-[13px] leading-5";

  return (
    <nav
      aria-label="주 메뉴"
      className="sticky bottom-0 z-10 grid shrink-0 grid-cols-4 border-t border-[#f0f1f6] bg-white px-1 pt-3 pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          aria-current={activeTab === tab.label ? "page" : undefined}
          className={`${tabClassName} ${activeTab === tab.label ? "font-semibold text-brand" : "text-[#9096a9]"}`}
        >
          <Icon name={tab.icon} className="size-6" />
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
