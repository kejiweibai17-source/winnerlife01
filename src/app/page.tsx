"use client";
import WovenStory from "../../components/WovenStory";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "../../components/Slider01";
import Slider from "../../components/Slider/Slider";
import ShowCase from "../../components/CollectionShowcase";
export default function InformationSection() {
  const cards = [
    {
      id: 1,
      title: "將持續演進的「品川地區」納入生活圈的「港區」地址",
      image: "https://www.shamaison.com/assets/img/about_image7.webp", // 東京都市景觀
    },
    {
      id: 2,
      title: "前往可搭乘兩條路線的天王洲艾爾站\n「平坦步道步行6分鐘※1」",
      image:
        "https://storage.googleapis.com/studio-design-asset-files/projects/91aPvjveOl/s-1770x1770_aa15b727-be97-4e9a-b267-8edeb78a40d1.webp", // 建築與車站
    },
    {
      id: 3,
      title: "233戶住宅，環繞著綠意與水景\n「向南可眺望運河的開闊地段」",
      image:
        "https://shinka-masumi.jp/wp-content/uploads/2025/12/IMG_20090411_103834.jpg", // 水岸建築
    },
  ];

  return (
    <>
      <Hero />

      <section className="relative w-full bg-[#fbfcfd] text-[#333] pt-24 pb-32 px-6 md:px-12 lg:px-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1a2c4e]/5 to-transparent pointer-events-none" />

        <div className="max-w-[1280px] mx-auto flex flex-col gap-24">
          {/* 上半部：資訊與聯絡按鈕區塊 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* 左側：INFORMATION */}
            <div className="flex flex-col gap-8">
              <h2 className="text-sm tracking-[0.2em] font-serif border-b border-gray-300 pb-4 inline-block w-full max-w-[200px]">
                INFORMATION
              </h2>
              <ul className="flex flex-col gap-4 text-sm md:text-base tracking-widest leading-relaxed font-medium">
                <li>銷售時程：現正依報名順序受理中</li>
                <li>樣品屋開放日期：樣品屋現正開放參觀</li>
                <li>現正受理物件登記及參觀預約！</li>
              </ul>
            </div>

            {/* 右側：行動呼籲 (CTA) 按鈕群 */}
            <div className="flex flex-col gap-6">
              {/* 深藍色按鈕：物件エントリー */}
              <Link
                href="#"
                className="group bg-[#16294d] text-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 hover:bg-[#203968] transition-colors duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-lg tracking-widest font-medium">
                    房源登記
                  </span>
                </div>
                <p className="text-xs sm:text-sm tracking-widest leading-relaxed opacity-80">
                  完成房源登記後，我們將寄送僅限房源登記者瀏覽的內容頁面網址。
                </p>
              </Link>

              {/* 金色按鈕：来場予約 */}
              <Link
                href="#"
                className="group bg-[#b29759] text-white p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 hover:bg-[#c7ab6b] transition-colors duration-300"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                  <span className="text-lg tracking-widest font-medium">
                    預約參觀
                  </span>
                </div>
                <p className="text-xs sm:text-sm tracking-widest leading-relaxed opacity-80">
                  如欲參觀公寓展示中心，請點此
                </p>
              </Link>

              {/* 白色聯絡資訊框 */}
              <div className="bg-white border border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
                <p className="text-xs tracking-widest text-gray-600">
                  如有任何疑問，請洽
                </p>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-3xl md:text-5xl font-serif tracking-wider text-gray-900">
                    0120-109-230
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs tracking-widest text-gray-500 mt-2">
                  營業時間：10:00～18:00　公休日：每週三、四、五（國定假日除外）
                </p>
              </div>
            </div>
          </div>

          {/* 下半部：三欄式質感圖片卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card) => (
              <Link
                key={card.id}
                href="#"
                className="group relative w-full aspect-[4/5] overflow-hidden bg-gray-200"
              >
                {/* 背景圖 (帶有 Hover 緩慢放大效果) */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* 底部深色漸層遮罩，讓白字清晰可見 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* 文字內容區塊 */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col gap-4">
                  <h3 className="text-white text-base md:text-lg font-medium leading-loose tracking-widest whitespace-pre-line drop-shadow-md">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-80">
                      Read More
                    </span>
                    <span className="text-white opacity-80 transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ShowCase />
      <WovenStory />
      <Slider />
    </>
  );
}
