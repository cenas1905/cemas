import type { Metadata } from "next";
import BalconiesContent from "./BalconiesContent";

export const metadata: Metadata = {
  title: "Cam Balkon Modelleri | Katlanır ve Sürgülü | CEM-AS",
  description: "Katlanır, sürgülü ve ısıcamlı cam balkon modelleri. Hatay'da cam balkon montajı için CEM-AS Alüminyum.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/balconies",
  },
};

export default function BalconiesPage() {
  return <BalconiesContent />;
}
