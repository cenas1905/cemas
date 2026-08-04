import type { Metadata } from "next";
import CambalkonContent from "./CambalkonContent";

export const metadata: Metadata = {
  title: "Cam Balkon | CEM-AS Alüminyum Hatay",
  description: "Hatay'da cam balkon sistemleri: katlanır, sürgülü ve ısıcamlı modeller. Dört mevsim manzara keyfi için CEM-AS Alüminyum.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/cambalkon",
  },
};

export default function CambalkonPage() {
  return <CambalkonContent />;
}
