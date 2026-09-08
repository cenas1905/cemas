import type { Metadata } from "next";
import KorkulukContent from "./KorkulukContent";

export const metadata: Metadata = {
  title: "Alüminyum ve Cam Korkuluk Hatay | CEM-AS Alüminyum",
  description:
    "Antakya ve Hatay'da alüminyum korkuluk, cam korkuluk ve küpeşte sistemleri. Dayanıklı ve şık çözümler için bize ulaşın.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/korkuluk",
  },
};

export default function KorkulukPage() {
  return <KorkulukContent />;
}
