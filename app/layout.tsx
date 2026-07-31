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
  title: "CEM-AS Alüminyum | Hatay'daki Lider Alüminyum Firması",
  description:
    "Hatay Antakya ve Defne bölgesinde profesyonel alüminyum doğrama, cam balkon, korkuluk ve duşakabin çözümleri. CEM-AS Alüminyum ile estetik ve güvenliği keşfedin.",
  keywords: ["cemas", "cemas alüminyum", "cem-as alüminyum", "hatay alüminyum", "cam balkon hatay", "alüminyum korkuluk", "duşakabin"],
  authors: [{ name: "CEM-AS Alüminyum" }],
  openGraph: {
    title: "CEM-AS Alüminyum & Cam Sistemleri",
    description: "Hatay'ın lider alüminyum ve cam sistemleri firması. Profesyonel çözümler için bize ulaşın.",
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
