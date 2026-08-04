import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "İletişim | CEM-AS Alüminyum Hatay",
  description: "CEM-AS Alüminyum iletişim bilgileri: telefon, WhatsApp ve adres. Antakya Atatürk Bulvarı'ndayız, bize ulaşın.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
