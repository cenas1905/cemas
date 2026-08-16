import type { Metadata } from "next";
import RailingsContent from "./RailingsContent";

export const metadata: Metadata = {
  title: "Cam Korkuluk ve Küpeşte Sistemleri | CEM-AS",
  description: "Baza sistemli cam korkuluklar, noktasal tutuculu ve alüminyum profilli korkuluk modelleri. CEM-AS Alüminyum.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/railings",
  },
};

export default function RailingsPage() {
  return <RailingsContent />;
}
