import type { Metadata } from "next";
import CamBalkonContent from "./CamBalkonContent";

export const metadata: Metadata = {
  title: "Hatay Cam Balkon Sistemleri ve Fiyat Teklifi",
  description:
    "Antakya ve Hatay'da katlanır, sürgülü ve ısıcamlı cam balkon sistemleri. Ücretsiz keşif ve fiyat teklifi için hemen arayın.",
  keywords: ["Hatay cam balkon", "Antakya cam balkon", "Defne cam balkon", "Hatay katlanır cam balkon"],
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/cambalkon",
  },
};

export default function CamBalkonPage() {
  return <CamBalkonContent />;
}
