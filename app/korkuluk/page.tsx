import type { Metadata } from "next";
import KorkulukContent from "./KorkulukContent";

export const metadata: Metadata = {
  title: "Hatay Cam ve Alüminyum Korkuluk Sistemleri",
  description:
    "Hatay, Antakya ve Defne'de cam korkuluk, alüminyum korkuluk ve küpeşte uygulamaları. CEM-AS Alüminyum'dan keşif ve fiyat teklifi alın.",
  keywords: ["Hatay korkuluk", "Hatay cam korkuluk", "Antakya alüminyum korkuluk", "Defne korkuluk", "cam küpeşte"],
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/korkuluk",
  },
  openGraph: {
    title: "Hatay Cam ve Alüminyum Korkuluk Sistemleri | CEM-AS",
    description: "Antakya ve Defne'de cam korkuluk, alüminyum korkuluk ve küpeşte uygulamaları.",
    url: "https://www.cemasaluminyum.com.tr/korkuluk",
    images: [{ url: "/images/korkuluk/hatay-cam-korkuluk-uygulamasi.jpg", alt: "Hatay'da cam korkuluk uygulaması" }],
  },
};

export default function KorkulukPage() {
  return <KorkulukContent />;
}
