import type { Metadata } from "next";
import AutomaticDoorsContent from "./AutomaticDoorsContent";

export const metadata: Metadata = {
  title: "Otomatik Kapı ve Fotoselli Kapı Sistemleri | CEM-AS",
  description: "Fotoselli otomatik kapı, sensörlü ve kayar kapı sistemleri. Ticari alanlar için güvenilir otomatik kapı çözümleri.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/automatic-doors",
  },
};

export default function AutomaticDoorsPage() {
  return <AutomaticDoorsContent />;
}
