"use client";

import { useEffect, useState } from "react";

/** Tailwind `md` 斷點：767px 以下視為手機版 */
export const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export function getIsMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}
