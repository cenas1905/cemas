import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CEMAS Minimalist Glass Systems — Mimari Şıklık, Güçlü Çözümler",
  description:
    "Yüksek mühendislik standartlarıyla üretilmiş alüminyum korkuluk, cam balkon ve duşakabin çözümleri. Estetik ve güvenliği mükemmel bir dengede sunan mimari cam sistemleri.",
  keywords: ["cam balkon", "alüminyum korkuluk", "duşakabin", "cemas", "cam sistemleri", "minimalist cam"],
  authors: [{ name: "CEMAS" }],
  openGraph: {
    title: "CEMAS Minimalist Glass Systems — Mimari Şıklık, Güçlü Çözümler",
    description: "Yüksek mühendislik standartlarıyla üretilmiş alüminyum korkuluk, cam balkon ve duşakabin çözümleri.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#fafafa] text-[#1a1a1a]">{children}</body>
    </html>
  );
}
