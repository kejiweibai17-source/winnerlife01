import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#292929] text-white pt-24 pb-12 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        {/* 上半部：雙品牌資訊區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">
          {/* 左側：忠訓地產 */}
          <div className="flex flex-col gap-8">
            {/* Logo 與 標語 */}
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <span className="text-[8px] tracking-[0.2em] leading-none mb-1 opacity-90">
                  WINNER LIFE
                </span>
                <span className="text-3xl font-medium tracking-[0.1em] leading-none">
                  忠訓地產
                </span>
              </div>
              <span className="text-sm tracking-wider mb-1 opacity-90">
                財富自由．享富人生
              </span>
            </div>

            {/* 公司資訊與地址 */}
            <div className="flex flex-col gap-4">
              <p className="text-sm tracking-widest opacity-90">
                忠訓地產開發有限公司
              </p>

              <div className="grid grid-cols-[70px_1fr] md:grid-cols-[70px_auto_auto] gap-x-6 gap-y-3 text-xs tracking-widest text-gray-300">
                <span>TAIPEI</span>
                <span>台北市松山區南京東路四段1號4樓</span>
                <Link
                  href="tel:0227131039"
                  className="hover:text-white transition-colors duration-300"
                >
                  TEL.(02) 2713-1039
                </Link>

                <span>E-MAIL</span>
                <Link
                  href="mailto:service@winnerlife.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  service@winnerlife.com
                </Link>
                <Link
                  href="https://www.winnerlife.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300"
                >
                  www.winnerlife.com
                </Link>
              </div>
            </div>
          </div>

          {/* 右側：OK忠訓國際集團 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="text-4xl font-serif tracking-wide leading-none">
                OK忠訓
              </span>
              <span className="text-sm tracking-wider mb-1 opacity-90">
                OK忠訓國際集團
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-sm tracking-widest opacity-90">
                海外投資置產 · 多元資產配置
              </p>

              <div className="grid grid-cols-[130px_1fr] md:grid-cols-[130px_auto_auto] gap-x-6 gap-y-3 text-xs tracking-widest text-gray-300">
                <span>JAPAN</span>
                <span>日本置產 · 投資說明會</span>
                <span>海外置產</span>

                <span>ASEAN</span>
                <span>泰國 · 馬來西亞</span>
                <span>海外置產</span>

                <span>EUROPE</span>
                <span>希臘 · 英國</span>
                <span>海外置產</span>
              </div>
            </div>
          </div>
        </div>

        {/* 下半部：版權聲明與 Legal */}
        <div className="mt-32 flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6 text-[11px] tracking-widest text-gray-500">
          <p>
            北市代銷會證字第 110011 號 ·{" "}
            <Link
              href="https://www.winnerlife.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors duration-300 underline-offset-2"
            >
              忠訓地產官網
            </Link>
          </p>
          <p className="shrink-0 text-gray-400">
            © 2026 WinnerLife Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
