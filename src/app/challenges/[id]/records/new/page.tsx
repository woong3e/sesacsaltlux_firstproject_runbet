import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { RecordFormPreview } from "@/components/challenges/record-form-preview";
import { Icon } from "@/components/ui/icon";

type NewRecordPageProps = { params: Promise<{ id: string }> };

export default async function NewRecordPage({ params }: NewRecordPageProps) {
  const { id } = await params;
  return (
    <MobileScreen>
      <main className="relative px-7 pt-12 pb-10">
        <Link
          href={`/challenges/${id}`}
          aria-label="기록 추가 닫기"
          className="absolute top-4 right-3 flex size-11 items-center justify-center rounded-lg"
        >
          <Icon name="close" className="size-6" />
        </Link>
        <h1 className="mt-2 text-[26px] leading-9 font-bold tracking-[-1px]">
          러닝 기록 추가
        </h1>
        <RecordFormPreview challengeId={id} />
      </main>
    </MobileScreen>
  );
}
