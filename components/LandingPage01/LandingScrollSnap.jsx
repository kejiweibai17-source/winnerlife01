"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const CHARGE_TOTAL = 920;
const CHARGE_GAP_MS = 580;
const SNAP_DELAY = 0.16;
const SNAP_DURATION = 1.35;
const LOCK_TOLERANCE = 14;
const ENTRY_COOLDOWN_MS = 950;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

function getSectionMetrics() {
  const viewportHeight = window.innerHeight;

  return Array.from(document.querySelectorAll(".lp-snap-section")).map((el) => {
    const tail = el.querySelector(".lp-snap-section__tail");
    const tailHeight = tail?.offsetHeight ?? 0;
    const top = el.offsetTop;
    const scrollSpan = el.offsetHeight - tailHeight;

    return {
      top,
      lockDown: Math.max(top, top + scrollSpan - viewportHeight),
      bottom: top + el.offsetHeight,
    };
  });
}

export default function LandingScrollSnap() {
  const lenis = useLenis();
  const snappingRef = useRef(false);
  const landedRef = useRef({ at: 0, position: -1 });
  const holdRef = useRef({
    key: "",
    armed: false,
    charge: 0,
    lastWheelAt: 0,
    targetScroll: 0,
  });

  useEffect(() => {
    if (!lenis) return;

    const resetHold = () => {
      holdRef.current = {
        key: "",
        armed: false,
        charge: 0,
        lastWheelAt: 0,
        targetScroll: 0,
      };
    };

    const snapToPosition = (position) => {
      if (snappingRef.current) return;

      snappingRef.current = true;
      resetHold();
      landedRef.current = { at: Date.now(), position };

      gsap.delayedCall(SNAP_DELAY, () => {
        lenis.scrollTo(position, {
          duration: SNAP_DURATION,
          lock: true,
          easing: easeOutExpo,
          onComplete: () => {
            snappingRef.current = false;
            ScrollTrigger.refresh();
          },
        });
      });
    };

    const near = (value, target) => Math.abs(value - target) <= LOCK_TOLERANCE;

    const isEntryCooldown = (position) =>
      Date.now() - landedRef.current.at < ENTRY_COOLDOWN_MS &&
      Math.abs(landedRef.current.position - position) < LOCK_TOLERANCE * 2;

    const handleCharge = (key, targetScroll, delta) => {
      const hold = holdRef.current;
      const now = Date.now();

      if (hold.key !== key) {
        holdRef.current = {
          key,
          armed: false,
          charge: delta,
          lastWheelAt: now,
          targetScroll,
        };
        return;
      }

      if (now - hold.lastWheelAt > CHARGE_GAP_MS) {
        holdRef.current = {
          key,
          armed: false,
          charge: delta,
          lastWheelAt: now,
          targetScroll,
        };
        return;
      }

      if (hold.armed) {
        snapToPosition(targetScroll);
        return;
      }

      const charge = hold.charge + delta;
      holdRef.current = {
        key,
        armed: charge >= CHARGE_TOTAL,
        charge,
        lastWheelAt: now,
        targetScroll,
      };
    };

    const onScroll = () => {
      if (snappingRef.current) return;

      const hold = holdRef.current;
      if (!hold.key) return;

      const metrics = getSectionMetrics();
      const scroll = lenis.scroll;

      if (hold.key.startsWith("down-")) {
        const i = Number(hold.key.split("-")[1]);
        const section = metrics[i];
        if (section && scroll > section.lockDown + LOCK_TOLERANCE) {
          lenis.scrollTo(section.lockDown, { immediate: true });
        }
        return;
      }

      if (hold.key.startsWith("up-")) {
        const j = Number(hold.key.split("-")[1]);
        const section = metrics[j];
        if (section && scroll < section.top - LOCK_TOLERANCE) {
          lenis.scrollTo(section.top, { immediate: true });
        }
      }
    };

    const onWheel = (event) => {
      if (snappingRef.current) {
        event.preventDefault();
        return;
      }

      const metrics = getSectionMetrics();
      if (!metrics.length) return;

      const scroll = lenis.scroll;
      const delta = Math.abs(event.deltaY);

      if (event.deltaY > 0) {
        for (let i = 0; i < metrics.length - 1; i += 1) {
          const section = metrics[i];
          const next = metrics[i + 1];

          if (scroll >= next.top - LOCK_TOLERANCE) continue;
          if (!near(scroll, section.lockDown)) continue;

          event.preventDefault();
          event.stopPropagation();
          handleCharge(`down-${i}`, next.top, delta);
          return;
        }

        resetHold();
        return;
      }

      if (event.deltaY < 0) {
        for (let j = 1; j < metrics.length; j += 1) {
          const section = metrics[j];
          const prev = metrics[j - 1];

          if (isEntryCooldown(section.top)) continue;
          if (!near(scroll, section.top)) continue;
          if (scroll <= prev.lockDown + LOCK_TOLERANCE) continue;

          event.preventDefault();
          event.stopPropagation();
          handleCharge(`up-${j}`, prev.lockDown, delta);
          return;
        }

        resetHold();
      }
    };

    lenis.on("scroll", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      lenis.off("scroll", onScroll);
      window.removeEventListener("wheel", onWheel, { capture: true });
      resetHold();
    };
  }, [lenis]);

  return null;
}
