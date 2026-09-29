import Link from "next/link";

const tabs = [
  { key: "records", label: "내 기록" },
  { key: "participants", label: "참가자" },
  { key: "calendar", label: "일정" },
] as const;

type ChallengeTabsProps = {
  challengeId: string;
  active: "records" | "participants" | "calendar";
};

export function ChallengeTabs({ challengeId, active }: ChallengeTabsProps) {
  return (
    <nav
      aria-label=" 챌린지 상세 메뉴"
      className="grid grid-cols-3 border-b border-[#f0f1f6] px-5"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={`/challenges/${challengeId}/${tab.key}`}
          aria-current={active === tab.key ? "page" : undefined}
          className={`relative flex h-12 items-center justify-center text-[15px] ${active === tab.key ? "font-bold text-foreground after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-brand" : "text-muted"}`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
