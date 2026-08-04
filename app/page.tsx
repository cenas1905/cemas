import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "CEM-AS Alüminyum | Hatay'daki Lider Alüminyum Firması",
  description: "Hatay Antakya ve Defne bölgesinde profesyonel alüminyum doğrama, cam balkon, korkuluk ve duşakabin çözümleri. CEM-AS Alüminyum ile estetik ve güvenliği keşfedin.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
