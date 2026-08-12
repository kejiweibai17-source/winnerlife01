"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { scrollToElementId } from "@/lib/scroll-to";

export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";

    if (hash) {
      // Wait for page content / transition to mount the target
      const t = window.setTimeout(() => {
        const ok = scrollToElementId(hash, lenis, { duration: 1.15 });
        if (!ok) {
          if (lenis) lenis.scrollTo(0, { immediate: true });
          else window.scrollTo(0, 0);
        }
      }, 80);
      return () => window.clearTimeout(t);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
