import type { Metadata } from "next";
import MerdivenlerContent from "./MerdivenlerContent";

export const metadata: Metadata = {
  title: "Merdiven Korkuluğu Hatay | Pleksi ve Cam Merdiven – CEM-AS Alüminyum",
  description:
    "Antakya ve Hatay'da pleksi, camlı ve klasik merdiven korkuluğu sistemleri. Özel ölçü ve tasarım için bize ulaşın.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/merdivenler",
  },
};

export default function MerdivenlerPage() {
  return <MerdivenlerContent />;
}
