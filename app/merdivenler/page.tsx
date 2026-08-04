import type { Metadata } from "next";
import MerdivenlerContent from "./MerdivenlerContent";

export const metadata: Metadata = {
  title: "Merdiven Sistemleri | CEM-AS Alüminyum Hatay",
  description: "Modern alüminyum merdiven sistemleri: cam korkuluklu, ahşap ve metal merdiven uygulamaları. CEM-AS Alüminyum güvencesiyle.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/merdivenler",
  },
};

export default function MerdivenlerPage() {
  return <MerdivenlerContent />;
}
