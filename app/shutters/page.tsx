import type { Metadata } from "next";
import ShuttersContent from "./ShuttersContent";

export const metadata: Metadata = {
  title: "Otomatik Kepenk Sistemleri | CEM-AS Alüminyum",
  description: "Poliüretan dolgulu alüminyum ve çelik kepenk sistemleri. Güvenlik ve yalıtım için otomatik kepenk çözümleri.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/shutters",
  },
};

export default function ShuttersPage() {
  return <ShuttersContent />;
}
