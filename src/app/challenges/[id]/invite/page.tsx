import Link from "next/link";
import { MobileScreen } from "@/components/layout/mobile-screen";
import { ParticipantAvatar } from "@/components/challenges/participant-avatar";
import { previewParticipants } from "@/components/challenges/preview-data";
import { Icon } from "@/components/ui/icon";

type InvitePageProps = { params: Promise<{ id: string }> };

export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params;

  return (
    <MobileScreen>
      <header className="flex h-14 justify-end px-3 pt-3">
        <Link
          href="/challenges/new"
          aria-label=" 챌린지 설정"
          className="flex size-11 items-center justify-center rounded-lg"
        >
          <Icon name="settings" className="size-6" />
        </Link>
      </header>
      <main className="flex flex-1 flex-col px-7 pt-3 pb-10">
        <h1 className="text-[25px] leading-9 font-bold tracking-[-1px]">
          친구 초대하기
        </h1>
        <p className="mt-1 text-[14px] leading-6 text-[#555b6e]">
          링크를 공유해서 친구들을 초대하세요.
        </p>

        <div className="relative mt-10">
          <input
            readOnly
            aria-label="초대 링크"
            value="https://runbet.com/invite/abc123"
            className="h-[54px] w-full rounded-xl border border-[#e6e8ef] bg-white pr-12 pl-4 text-[13px] shadow-xs"
          />
          <button
            type="button"
            aria-label="초대 링크 복사"
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center"
          >
            <Icon name="copy" className="size-6" />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-4 gap-2 text-center">
          <button
            type="button"
            className="flex flex-col items-center gap-2 text-[12px]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#ffdc44]">
              <Icon
                name="message"
                className="size-6 fill-[#352b16] text-[#352b16]"
              />
            </span>
            카카오톡
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-2 text-[12px]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#f0f1f5]">
              <Icon name="link" className="size-6" />
            </span>
            링크 복사
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-2 text-[12px]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#3db586]">
              <Icon name="message" className="size-6 fill-white text-white" />
            </span>
            문자
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-2 text-[12px]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#f0f1f5]">
              <Icon name="more" className="size-6" />
            </span>
            더보기
          </button>
        </div>

        <section
          aria-labelledby="invite-participants-heading"
          className="mt-12"
        >
          <h2
            id="invite-participants-heading"
            className="mb-5 text-[17px] font-medium"
          >
            참여자 (3 / 4)
          </h2>
          <ul className="space-y-4">
            {previewParticipants.slice(0, 3).map((participant) => (
              <li key={participant.id} className="flex items-center gap-3">
                <ParticipantAvatar className="size-10" />
                <span className="flex-1 text-[16px]">
                  {participant.isMe ? "나 (방장)" : participant.name}{" "}
                  {participant.isMe && <span aria-label="방장">👑</span>}
                </span>
                <span className="text-[14px] font-medium text-[#15a16b]">
                  참가 완료
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 text-muted">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[#c9cedc]">
                <Icon name="plus" className="size-4" />
              </span>
              <span className="text-[15px]">한 명을 더 초대해보세요!</span>
            </li>
          </ul>
        </section>

        <div className="mt-auto pt-12">
          <Link
            href={`/challenges/${id}`}
            className="flex min-h-[80px] flex-col items-center justify-center gap-1 rounded-xl bg-[#ededf2] px-2 text-center text-[#8a91a3]"
          >
            <span className="text-[18px] font-medium"> 챌린지 시작하기</span>
            <span className="text-[12px]">
              (4명이 모두 참가하면 시작할 수 있어요)
            </span>
          </Link>
        </div>
      </main>
    </MobileScreen>
  );
}
