import Image from "next/image";
import Link from "next/link";

// 區塊標題
const SECTION_TITLE = "住まいを買う";

// 左右欄內容 — 替換 image、文案與連結即可
const COLUMNS = [
  {
    image: "/images/index/白金アエルシティ.png",
    imageAlt: "住宅購入イメージ（左）",
    ctaLabel: "住宅購入トップを見る",
    ctaHref: "#",
    description:
      "マンション・戸建てなど、さまざまな住まいの選択肢をご紹介。ライフスタイルに合わせた住まい探しをサポートします。",
  },
  {
    image: "/images/index/8f2716f6-12ae-4ff6-b310-1bfb8b3c20a7.png",
    imageAlt: "住宅購入イメージ（右）",
    ctaLabel: "住宅購入トップを見る",
    ctaHref: "#",
    description:
      "マンション・戸建てなど、さまざまな住まいの選択肢をご紹介。ライフスタイルに合わせた住まい探しをサポートします。",
  },
];

function PromoColumn({ image, imageAlt, ctaLabel, ctaHref, description }) {
  return (
    <article className="flex flex-col items-center">
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* 圖片底部淡出，銜接區塊背景 */}
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #f4f4f4 88%)",
          }}
        />
        <Link
          href={ctaHref}
          className="absolute bottom-5 left-5 md:bottom-6 md:left-6 z-10 inline-flex items-center gap-2 bg-[#3d7ab5] hover:bg-[#356ba3] text-white text-xs md:text-sm tracking-[0.12em] px-5 py-3 transition-colors duration-300"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden className="text-[10px]">
            &gt;
          </span>
        </Link>
      </div>

      <p className="mt-6 w-full max-w-md text-center text-[11px] md:text-xs leading-[2] tracking-[0.08em] text-[#4a4a4a]">
        {description}
      </p>
    </article>
  );
}

export default function HomeBottomPromo() {
  return (
    <section className="w-full bg-[#f4f4f4] py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <header className="flex flex-col items-center mb-12 md:mb-16">
          <span className="block w-px h-7 bg-[#c5c5c5] mb-5" aria-hidden />
          <h2 className="text-lg md:text-xl tracking-[0.35em] text-[#001f3f] font-serif font-normal">
            {SECTION_TITLE}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 lg:gap-14">
          {COLUMNS.map((column, index) => (
            <PromoColumn key={index} {...column} />
          ))}
        </div>
      </div>
    </section>
  );
}
