import Image from "next/image";

type ParticipantAvatarProps = {
  className?: string;
};

export function ParticipantAvatar({
  className = "size-11",
}: ParticipantAvatarProps) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-surface ${className}`}
    >
      <Image
        src="/images/9.PNG"
        alt=""
        fill
        sizes="64px"
        className="object-cover"
      />
    </span>
  );
}
