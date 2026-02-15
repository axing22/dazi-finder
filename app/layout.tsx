import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "找搭子 - 快速找到活动伙伴",
  description: "春节期间找搭子平台,快速找到打麻将、打篮球、看电影等活动伙伴",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
