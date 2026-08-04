import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Hakkımızda | CEM-AS Alüminyum Hatay",
  description: "CEM-AS Alüminyum: Antakya ve Defne'de yılların tecrübesiyle alüminyum doğrama, cam balkon ve korkuluk sistemleri.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
