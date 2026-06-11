import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CVio — AI Destekli CV Oluşturucu & Kariyer Koçu",
  description:
    "LinkedIn profilinizi 60 saniyede profesyonel CV'ye dönüştürün. ATS uyumlu şablonlar, AI kariyer koçu ve paylaşılabilir link özelliği.",
  keywords: ["cv oluşturucu", "özgeçmiş", "ai cv", "linkedin import", "kariyer"],
  authors: [{ name: "CVio" }],
  openGraph: {
    title: "CVio — AI Destekli CV Oluşturucu",
    description: "60 saniyede yapay zeka destekli profesyonel CV oluşturun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#03060b] text-white">{children}</body>
    </html>
  );
}
