import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projelerimiz ve Referanslar | CEM-AS Alüminyum",
  description: "CEM-AS Alüminyum referans projeleri: Botaş, hastaneler, oteller ve konut projeleri. İşlerimizi keşfedin.",
  alternates: {
    canonical: "https://www.cemasaluminyum.com.tr/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
