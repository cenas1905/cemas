"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SITE_URL = "https://www.cemasaluminyum.com.tr";

export default function CanonicalTag() {
  const pathname = usePathname();

  useEffect(() => {
    const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [pathname]);

  return null;
}
