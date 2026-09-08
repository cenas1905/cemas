import type { Metadata } from "next";
import CamBalkonContent from "./CamBalkonContent";

export const metadata: Metadata = {
  title: "Cam Balkon Hatay | Antakya Cam Balkon Fiyatları – CEM-AS Alüminyum",
  description:
    "Antakya ve Hatay'da katlanır, sürgülü ve ısıcamlı cam balkon sistemleri. Ücretsiz keşif ve fiyat teklifi için hemen arayın.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/cambalkon",
  },
};

export default function CamBalkonPage() {
  return <CamBalkonContent />;
}
