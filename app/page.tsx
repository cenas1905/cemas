import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Hatay Alüminyum | CEM-AS Cam Balkon, Korkuluk & Duşakabin",
  description: "Hatay Antakya ve Defne'de alüminyum doğrama, cam balkon, korkuluk ve duşakabin sistemleri. CEM-AS Alüminyum ile estetik ve güvenli çözümler.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
