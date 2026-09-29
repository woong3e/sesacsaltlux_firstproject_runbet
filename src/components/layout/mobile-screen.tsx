import type { ReactNode } from "react";

type MobileScreenProps = {
  children: ReactNode;
  className?: string;
};

export function MobileScreen({ children, className = "" }: MobileScreenProps) {
  return (
    <div
      className={`mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-white ${className}`}
    >
      {children}
    </div>
  );
}
