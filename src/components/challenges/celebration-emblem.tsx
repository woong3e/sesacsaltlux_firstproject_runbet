const confetti = [
  { left: "9%", top: "39%", color: "#ffb54a" },
  { left: "20%", top: "17%", color: "#c5d4ff" },
  { left: "29%", top: "49%", color: "#438dff" },
  { left: "75%", top: "20%", color: "#d9c9ff" },
  { left: "86%", top: "44%", color: "#c1e4dd" },
  { left: "68%", top: "60%", color: "#72baf4" },
  { left: "17%", top: "64%", color: "#e8c1d8" },
];

type CelebrationEmblemProps = { variant: "waiting" | "results" };

export function CelebrationEmblem({ variant }: CelebrationEmblemProps) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-40 w-full max-w-[300px] items-center justify-center"
    >
      {variant === "waiting" && (
        <span className="absolute size-32 rounded-full bg-[#516476]/25" />
      )}
      {confetti.map((piece, index) => (
        <span
          key={index}
          className="absolute h-2 w-1.5 rotate-45 rounded-[1px]"
          style={{
            left: piece.left,
            top: piece.top,
            backgroundColor: piece.color,
            opacity: variant === "waiting" ? 0.65 : 1,
          }}
        />
      ))}
      <span className="relative text-[76px] leading-none drop-shadow-sm">
        {variant === "waiting" ? "⏳" : "🏆"}
      </span>
    </div>
  );
}
