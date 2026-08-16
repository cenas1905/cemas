import type { Metadata } from "next";
import ShowersContent from "./ShowersContent";

export const metadata: Metadata = {
  title: "Duşakabin Kabin Serileri | CEM-AS Alüminyum",
  description: "Pivot, sürgülü ve loft seri duşakabin modelleri. Banyonuz için lüks ve dayanıklı duşakabin çözümleri.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/showers",
  },
};

export default function ShowersPage() {
  return <ShowersContent />;
}
