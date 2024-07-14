import type { Metadata } from "next";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "../component/Header";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "500", "700"] });
const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });
// multi font 적용방법 알아보기

export const metadata: Metadata = {
  title: "Look around - Coin",
  description: "현재 암호화폐 코인 시세를 간략하게 볼 수 있어요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={roboto.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
