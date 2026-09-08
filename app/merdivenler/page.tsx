import type { Metadata } from "next";
import MerdivenlerContent from "./MerdivenlerContent";

export const metadata: Metadata = {
  title: "Merdiven ve Korkuluk Sistemleri Hatay | CEM-AS Alüminyum",
  description:
    "Antakya ve Hatay'da pleksi, camlı ve klasik merdiven korkuluğu sistemleri. Özel ölçü ve tasarım için bize ulaşın.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/merdivenler",
  },
};

export default function MerdivenlerPage() {
  return <MerdivenlerContent />;
}
