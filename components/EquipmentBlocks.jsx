"use client";

import Copy from "./Copy";

/** 文字捲動上浮動畫 */
export function CopyBlock({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Copy animateOnScroll delay={delay}>
        {children}
      </Copy>
    </div>
  );
}

/** 圖片／圖文卡片：無上浮動畫 */
export function StaticBlock({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
