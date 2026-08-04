import type { Metadata } from "next";
import KorkulukContent from "./KorkulukContent";

export const metadata: Metadata = {
  title: "Alüminyum Korkuluk | CEM-AS Alüminyum Hatay",
  description: "Paslanmaz alüminyum korkuluk sistemleri: merdiven, balkon, teras ve havuz kenarı korkulukları. Estetik ve güvenli çözümler için CEM-AS.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/korkuluk",
  },
};

export default function KorkulukPage() {
  return <KorkulukContent />;
}
