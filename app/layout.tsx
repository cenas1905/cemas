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
  title: {
    default: "Hatay Korkuluk, Cam Balkon ve Duşakabin | CEM-AS Alüminyum",
    template: "%s | CEM-AS Alüminyum",
  },
  description:
    "Hatay Antakya ve Defne'de cam korkuluk, cam balkon ve özel ölçü duşakabin. CEM-AS Alüminyum'dan keşif ve fiyat teklifi alın.",
  keywords: ["Hatay korkuluk", "Hatay cam balkon", "Hatay duşakabin", "Antakya alüminyum", "CEM-AS Alüminyum"],
  authors: [{ name: "CEM-AS Alüminyum" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hatay Korkuluk, Cam Balkon ve Duşakabin | CEM-AS Alüminyum",
    description: "Antakya ve Defne'de cam korkuluk, cam balkon ve özel ölçü duşakabin uygulamaları. CEM-AS Alüminyum ile iletişime geçin.",
    type: "website",
    url: "https://www.cemasaluminyum.com.tr",
    siteName: 'CEM-AS Alüminyum',
    locale: 'tr_TR',
    images: [{ url: "/images/korkuluk/hatay-cam-korkuluk-uygulamasi.jpg", alt: "Hatay'da CEM-AS Alüminyum cam korkuluk uygulaması" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hatay Korkuluk, Cam Balkon ve Duşakabin | CEM-AS Alüminyum",
    description: "Antakya ve Defne'de cam korkuluk, cam balkon ve özel ölçü duşakabin uygulamaları.",
    images: ["/images/korkuluk/hatay-cam-korkuluk-uygulamasi.jpg"],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
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
  image: "https://www.cemasaluminyum.com.tr/images/korkuluk/hatay-cam-korkuluk-uygulamasi.jpg",
  logo: "https://www.cemasaluminyum.com.tr/cemas-logo-round.png",
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Çekmece Mah. Samandağ Yolu Üzeri No:48",
    addressLocality: "Defne",
    addressRegion: "Hatay",
    postalCode: "31141",
    addressCountry: "TR",
  },
  areaServed: [
    "Antakya", "Defne", "Samandağ", "İskenderun", "Arsuz", "Dörtyol",
    "Kırıkhan", "Reyhanlı", "Altınözü", "Yayladağı", "Hatay",
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
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
