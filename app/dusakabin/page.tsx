import type { Metadata } from "next";
import DusakabinContent from "./DusakabinContent";

export const metadata: Metadata = {
  title: "Duşakabin | CEM-AS Alüminyum Hatay",
  description: "Sızdırmaz, dayanıklı ve şık duşakabin modelleri. Lüks duşakabin çözümleri için CEM-AS Alüminyum ile iletişime geçin.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/dusakabin",
  },
};

export default function DusakabinPage() {
  return <DusakabinContent />;
}
