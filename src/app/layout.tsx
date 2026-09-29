import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "RunBet | 끝날 때까지 아무도 모른다",
  description:
    "기록은 비공개, 결과는 마지막에. RunBet에서 함께 달리고 러닝  챌린지에 도전하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
