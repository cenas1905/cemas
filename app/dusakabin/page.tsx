import type { Metadata } from "next";
import DusakabinContent from "./DusakabinContent";

export const metadata: Metadata = {
  title: "Duşakabin Hatay | Antakya Duşakabin Fiyatları – CEM-AS Alüminyum",
  description:
    "Antakya ve Hatay'da sürgülü, menteşeli ve özel ölçü duşakabin sistemleri. Temperli cam ve su sızdırmazlık garantisi.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/dusakabin",
  },
};

export default function DusakabinPage() {
  return <DusakabinContent />;
}
