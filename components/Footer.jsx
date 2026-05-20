import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#292929] text-white pt-24 pb-12 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        {/* 上半部：雙品牌資訊區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
          {/* 左側：SUKENO 區塊 */}
          <div className="flex flex-col gap-8">
            {/* Logo 與 標語 */}
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <span className="text-[8px] tracking-[0.2em] leading-none mb-1 opacity-90">
                  FOR YOUR AMBIENT.
                </span>
                <span className="text-3xl font-medium tracking-[0.1em] leading-none">
                  SUKENO
                </span>
              </div>
              <span className="text-sm tracking-wider mb-1 opacity-90">
                for your ambient. SUKENO
              </span>
            </div>

            {/* 公司資訊與地址 */}
            <div className="flex flex-col gap-4">
              <p className="text-sm tracking-widest opacity-90">
                株式会社 フォーユア アンビエント すけの
              </p>

              {/* 使用 Grid 確保對齊完美 */}
              <div className="grid grid-cols-[70px_1fr] md:grid-cols-[70px_auto_auto] gap-x-6 gap-y-3 text-xs tracking-widest text-gray-300">
                <span>TOKYO</span>
                <span>東京都港区南青山5-4-51</span>
                <span>TEL.03-6427-1255</span>

                <span>TOYAMA</span>
                <span>富山県高岡市三女子127</span>
                <span>TEL.0766-25-4190</span>
              </div>
            </div>
          </div>

          {/* 右側：Minotti 區塊 */}
          <div className="flex flex-col gap-8">
            {/* Logo 與 標語 */}
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              {/* 使用 font-serif 模擬 Minotti 的襯線體 Logo */}
              <span className="text-4xl font-serif tracking-wide leading-none">
                Minotti
              </span>
              <span className="text-sm tracking-wider mb-1 opacity-90">
                Minotti by SUKENO
              </span>
            </div>

            {/* 公司資訊與地址 */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="grid grid-cols-[130px_1fr] md:grid-cols-[130px_auto_auto] gap-x-6 gap-y-3 text-xs tracking-widest text-gray-300">
                <span>Minotti AOYAMA</span>
                <span>東京都港区南青山4-21-26</span>
                <span>TEL.03-6434-0142</span>

                <span>Minotti KOBE</span>
                <span>兵庫県神戸市中央区浪花町27</span>
                <span>TEL.078-954-8303</span>
              </div>
            </div>
          </div>
        </div>

        {/* 下半部：版權聲明與 Legal */}
        {/* 使用 mt-32 拉開與上方資訊的巨大留白，這是高級感的關鍵 */}
        <div className="mt-32 flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6 text-[11px] tracking-widest text-gray-500">
          <p>
            This site is protected by reCAPTCHA and the Google{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors duration-300 underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline hover:text-white transition-colors duration-300 underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </p>
          <p className="shrink-0 text-gray-400">
            © 2026 for your ambient. SUKENO CO.,LTD.
          </p>
        </div>
      </div>
    </footer>
  );
}
