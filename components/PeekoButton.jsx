"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

/**
 * Peeko-style eye-tracking CTA button.
 * Recreated from the Framer Marketplace preview look + interaction
 * (not the paid source — that cannot be scraped).
 */
export default function PeekoButton({
  children = "Button",
  href,
  onClick,
  className,
  type = "button",
  color = "#2dd4bf",
  textColor = "#0f172a",
}) {
  const rootRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);

  const spring = { stiffness: 280, damping: 22, mass: 0.4 };
  const sLeftX = useSpring(leftX, spring);
  const sLeftY = useSpring(leftY, spring);
  const sRightX = useSpring(rightX, spring);
  const sRightY = useSpring(rightY, spring);

  useEffect(() => {
    const max = 4.5;

    const onMove = (e) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const scale = Math.min(max, dist / 40);
      const nx = (dx / dist) * scale;
      const ny = (dy / dist) * scale;
      leftX.set(nx);
      leftY.set(ny);
      rightX.set(nx);
      rightY.set(ny);
    };

    const onLeave = () => {
      leftX.set(0);
      leftY.set(0);
      rightX.set(0);
      rightY.set(0);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [leftX, leftY, rightX, rightY]);

  const eyes = (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5" aria-hidden>
      <Eye pupilX={sLeftX} pupilY={sLeftY} active={hovered} />
      <Eye pupilX={sRightX} pupilY={sRightY} active={hovered} />
    </span>
  );

  const label = (
    <span
      className={clsx(
        "relative z-10 font-semibold tracking-tight transition-opacity duration-200",
        hovered ? "opacity-0" : "opacity-100",
      )}
    >
      {children}
    </span>
  );

  const cls = clsx(
    "relative inline-flex h-12 min-w-[148px] items-center justify-center overflow-hidden rounded-full px-8",
    "select-none text-[15px] leading-none shadow-[inset_0_0_0_1.5px_rgba(0,0,0,0.12)]",
    "transition-transform duration-200 ease-out will-change-transform",
    "hover:scale-[1.03] active:scale-[0.98]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300",
    className,
  );

  const style = { backgroundColor: color, color: textColor };

  const handlers = {
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a
        ref={rootRef}
        href={href}
        className={cls}
        style={style}
        {...handlers}
      >
        {label}
        {eyes}
      </a>
    );
  }

  return (
    <button
      ref={rootRef}
      type={type}
      onClick={onClick}
      className={cls}
      style={style}
      {...handlers}
    >
      {label}
      {eyes}
    </button>
  );
}

function Eye({ pupilX, pupilY, active }) {
  return (
    <span
      className={clsx(
        "relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]",
        "transition-all duration-200",
        active ? "scale-100 opacity-100" : "scale-75 opacity-0",
      )}
    >
      <motion.span
        className="absolute h-3 w-3 rounded-full bg-slate-900"
        style={{ x: pupilX, y: pupilY }}
      />
    </span>
  );
}
