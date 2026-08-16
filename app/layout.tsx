import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CanonicalTag from "@/components/CanonicalTag";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

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
  metadataBase: new URL("https://www.cemasaluminyum.com.tr"),
  title: "Hatay Alüminyum | CEM-AS Cam Balkon, Korkuluk & Duşakabin",
  description:
    "Hatay Antakya ve Defne'de alüminyum doğrama, cam balkon, korkuluk ve duşakabin sistemleri. CEM-AS Alüminyum ile estetik ve güvenli çözümler.",
  keywords: ["cemas", "cemas alüminyum", "cem-as alüminyum", "hatay alüminyum", "cam balkon hatay", "alüminyum korkuluk", "duşakabin", "merdiven hatay", "pvc pencere hatay"],
  authors: [{ name: "CEM-AS Alüminyum" }],
  openGraph: {
    title: "CEM-AS Alüminyum & Cam Sistemleri",
    description: "Hatay'ın lider alüminyum ve cam sistemleri firması. Profesyonel çözümler için bize ulaşın.",
    type: "website",
    url: "https://www.cemasaluminyum.com.tr",
    siteName: 'CEM-AS Alüminyum',
    locale: 'tr_TR',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder",
  },
};

// Google'ın okuyacağı işletme künyesi (yerel arama sonuçları için kritik)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "CEM-AS Alüminyum",
  description:
    "Hatay Antakya ve Defne'de alüminyum doğrama, cam balkon, korkuluk, duşakabin ve merdiven sistemleri.",
  url: "https://www.cemasaluminyum.com.tr",
  telephone: "+905337747684",
  image: "https://www.cemasaluminyum.com.tr/cemas-logo-round.png",
  logo: "https://www.cemasaluminyum.com.tr/cemas-logo-round.png",
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atatürk Bulvarı No: 124",
    addressLocality: "Antakya",
    addressRegion: "Hatay",
    addressCountry: "TR",
  },
  areaServed: ["Antakya", "Defne", "Hatay"],
  sameAs: [
    "https://tr-tr.facebook.com/cemasaluminyumkorkuluksistemleri/",
    "https://www.instagram.com/cemashatay",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Alüminyum ve Cam Sistemleri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cam Balkon Sistemleri", url: "https://www.cemasaluminyum.com.tr/cambalkon" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Alüminyum Korkuluk", url: "https://www.cemasaluminyum.com.tr/korkuluk" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Duşakabin", url: "https://www.cemasaluminyum.com.tr/dusakabin" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Merdiven Sistemleri", url: "https://www.cemasaluminyum.com.tr/merdivenler" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Otomatik Kapı Sistemleri", url: "https://www.cemasaluminyum.com.tr/automatic-doors" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Otomatik Kepenk Sistemleri", url: "https://www.cemasaluminyum.com.tr/shutters" } },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#fafafa] text-[#1a1a1a]">
        <CanonicalTag />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
