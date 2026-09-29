import Image from "next/image";

type AvatarProps = {
  index: number;
  className?: string;
};

export function Avatar({ index, className = "size-6" }: AvatarProps) {
  const column = index % 3;
  const row = Math.floor(index / 3);

  return (
    <span
      aria-hidden="true"
      className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-slate-200 ${className}`}
    >
      <Image
        src="/images/runner-avatars.png"
        alt=""
        width={1536}
        height={1024}
        sizes="84px"
        className="absolute h-[200%] w-[300%] max-w-none"
        style={{ left: `${column * -100}%`, top: `${row * -100}%` }}
      />
    </span>
  );
}
