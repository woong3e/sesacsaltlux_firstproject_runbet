import Link from "next/link";
import { Icon } from "@/components/ui/icon";

type PageHeaderProps = {
  title: string;
  backHref: string;
};

export function PageHeader({ title, backHref }: PageHeaderProps) {
  return (
    <header className="flex h-20 shrink-0 items-center gap-3.5 px-3.5">
      <Link
        href={backHref}
        aria-label="뒤로 가기"
        className="flex size-11 shrink-0 items-center justify-center rounded-lg"
      >
        <Icon name="chevronLeft" className="size-6" />
      </Link>
      <h1 className="text-[22px] leading-8 font-bold tracking-[-0.8px]">
        {title}
      </h1>
    </header>
  );
}
