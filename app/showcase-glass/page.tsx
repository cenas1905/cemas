import type { Metadata } from "next";
import ShowcaseGlassContent from "./ShowcaseGlassContent";

export const metadata: Metadata = {
  title: "Vitrin ve Mağaza Cam Sistemleri | CEM-AS",
  description: "Mağaza vitrin camı, camekan ve ofis içi cam bölme sistemleri. Ticari alanlarınız için şık cam çözümleri.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/showcase-glass",
  },
};

export default function ShowcaseGlassPage() {
  return <ShowcaseGlassContent />;
}
