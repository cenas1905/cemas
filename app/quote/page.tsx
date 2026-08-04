import type { Metadata } from "next";
import QuoteContent from "./QuoteContent";

export const metadata: Metadata = {
  title: "Fiyat Hesaplayıcı | CEM-AS Alüminyum",
  description: "Cam balkon, korkuluk ve duşakabin için anlık fiyat hesaplayın. Ölçülerinizi girin, maliyetinizi saniyeler içinde öğrenin.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/quote",
  },
};

export default function QuotePage() {
  return <QuoteContent />;
}
