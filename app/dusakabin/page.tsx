import type { Metadata } from "next";
import DusakabinContent from "./DusakabinContent";

export const metadata: Metadata = {
  title: "Hatay Duşakabin Sistemleri ve Fiyat Teklifi",
  description:
    "Antakya ve Hatay'da sürgülü, menteşeli ve özel ölçü duşakabin sistemleri. Temperli cam ve su sızdırmazlık garantisi.",
  keywords: ["Hatay duşakabin", "Antakya duşakabin", "Defne duşakabin", "özel ölçü duşakabin Hatay"],
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/dusakabin",
  },
};

export default function DusakabinPage() {
  return <DusakabinContent />;
}
