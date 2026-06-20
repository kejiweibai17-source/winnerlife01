"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.4, 0, 0.2, 1];
const FADE_IN = 0.5;
const HOLD = 2;
const FADE_OUT = 0.5;
const DURATION = FADE_IN + HOLD + FADE_OUT;

const T_FADE_IN = FADE_IN / DURATION;
const T_HOLD_END = (FADE_IN + HOLD) / DURATION;

function normalizePath(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return href.replace(/\/$/, "") || "/";
  }
}

function isInternalLink(href) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return false;
  }

  if (href.startsWith("/")) return true;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const router = useRouter();
  const lenis = useLenis();
  const [transitioning, setTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);
  const navigateTimerRef = useRef(null);
  const endTimerRef = useRef(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const refreshScroll = useCallback(() => {
    requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
  }, [lenis]);

  const finishTransition = useCallback(() => {
    if (!isTransitioningRef.current) return;
    isTransitioningRef.current = false;
    setTransitioning(false);
    refreshScroll();
  }, [refreshScroll]);

  const clearTimers = useCallback(() => {
    if (navigateTimerRef.current) {
      clearTimeout(navigateTimerRef.current);
      navigateTimerRef.current = null;
    }
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
  }, []);

  const startTransition = useCallback(
    (href) => {
      if (isTransitioningRef.current) return;

      clearTimers();
      isTransitioningRef.current = true;
      setTransitioning(true);

      navigateTimerRef.current = setTimeout(() => {
        router.push(href);
      }, FADE_IN * 1000);

      endTimerRef.current = setTimeout(() => {
        finishTransition();
      }, DURATION * 1000);
    },
    [clearTimers, router, finishTransition],
  );

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition === "true") return;

      const href = anchor.getAttribute("href");
      if (!isInternalLink(href)) return;

      const targetPath = normalizePath(href);
      const currentPath = normalizePath(pathnameRef.current);
      if (targetPath === currentPath) return;

      event.preventDefault();
      event.stopPropagation();
      startTransition(href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [startTransition]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <>
      <AnimatePresence onExitComplete={refreshScroll}>
        {transitioning && (
          <motion.div
            key="page-transition-overlay"
            aria-hidden
            className="fixed inset-0 z-[300] flex items-center justify-center bg-white pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DURATION,
              ease: EASE,
              times: [0, T_FADE_IN, T_HOLD_END, 1],
            }}
            onAnimationComplete={() => {
              if (isTransitioningRef.current) {
                finishTransition();
              }
            }}
          >
            <motion.img
              src="/images/company-logo.svg"
              alt=""
              className="h-auto w-[min(55vw,280px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: DURATION,
                ease: EASE,
                times: [0, T_FADE_IN + 0.02, T_HOLD_END, 0.95],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full">{children}</div>
    </>
  );
}
