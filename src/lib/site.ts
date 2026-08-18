/** 全站 SEO 與結構化資料共用的網站設定 */
export const siteConfig = {
  name: "忠訓地產",
  legalName: "忠訓地產開發有限公司",
 
  parentBrand: "OK忠訓國際集團",
  /** 建案名稱 */
  buildingName: "OK PRIME+ 白金高輪",
  /** 建案／網站主標 */
  projectName: "OK PRIME+",
  projectSubtitle: "白金高輪",
  description:
    "OK PRIME（OK PRIME+ 白金高輪）位於東京都港區三田5-5-10（〒108-0073）。全案14戶，白金高輪站步行約5分，串聯三田・田町・品川與羽田機場。ALSOK 保全與智慧設備完備，由忠訓地產提供日本置產與賞屋諮詢。",
  locale: "zh-TW",
  /**
   * 正式網域。務必在 Vercel / .env 設定 NEXT_PUBLIC_SITE_URL=https://okprime.winnerlife.com
   * （若正式網域為 ckprime.winnerlife.com 請改為該網域，與 Search Console 一致）
   * 否則 canonical / JSON-LD 會落到預覽網域，影響 Google 圖示與 sitelinks。
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://okprime.winnerlife.com",
  corporateUrl: "https://www.winnerlife.com",
  email: "service@winnerlife.com",
  phone: "+81-120-109-230",
  phoneDisplay: "0120-109-230",
  taipeiPhone: "+886-2-2713-1039",
  taipeiPhoneDisplay: "02-2713-1039",
  address: {
    streetAddress: "南京東路四段1號4樓",
    addressLocality: "松山區",
    addressRegion: "台北市",
    postalCode: "105",
    addressCountry: "TW",
  },
  /** 台北辦公室座標（南京東路四段一帶） */
  officeGeo: {
    latitude: 25.0516,
    longitude: 121.5484,
  },
  propertyAddress: {
    streetAddress: "三田5-5-10",
    addressLocality: "港区",
    addressRegion: "東京都",
    postalCode: "108-0073",
    addressCountry: "JP",
  },
  /** 建案／港区三田5-5-10 */
  propertyGeo: {
    latitude: 35.6463,
    longitude: 139.7383,
    mapUrl: "https://maps.google.com/?q=5-5-10+Mita,+Minato+City,+Tokyo+108-0073",
  },
  license: "北市代銷會證字第 110011 號",
  businessHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
  businessHoursDisplay: {
    zh: "營業時間：09:00~18:00　休六日(國定假日)",
    jp: "営業時間：09:00〜18:00　土日定休（祝日）",
  },
  areaServed: ["東京都", "日本", "台北市"],
  ogImage: "/images/og/home.jpg",
  ogImageAlt: {
    zh: "OK PRIME+ 白金高輪 運河水岸建案外觀",
    jp: "OK PRIME+ 白金高輪 運河沿いの外観",
  },
  ogImageWidth: 1200,
  ogImageHeight: 630,
  logo: "/images/js_logo_h1.png",
  /** Google / PWA 用正方形圖示（≥48px） */
  icons: {
    favicon: "/favicon.ico",
    icon48: "/icons/icon-48.png",
    icon96: "/icons/icon-96.png",
    icon192: "/icons/icon-192.png",
    icon512: "/icons/icon-512.png",
    apple: "/apple-touch-icon.png",
  },
  sameAs: [
    "https://www.winnerlife.com/",
    "https://www.facebook.com/ok.winnerlife/",
    "https://www.instagram.com/winnerlife914/",
    "https://page.line.me/qoi6885d?oat_content=url&openQrModal=true",
  ],
  keywords: [
    "OK PRIME",
    "OK PRIME 白金高輪",
    "OK PRIME+",
    "OK PRIME SHIROKANE TAKANAWA",
    "白金高輪",
    "忠訓地產",
    "WinnerLife",
    "日本置產",
    "海外不動產",
    "港區三田",
    "三田5-5-10",
    "品川",
    "港區",
    "東京住宅",
    "投資型公寓",
    "房源登記",
    "樣品屋參觀",
  ],
} as const;

export function absoluteUrl(path: string) {
  const base = siteConfig.url;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getProjectAlternateNames() {
  return [
    "OK PRIME",
    "OK PRIME+",
    "OK PRIME 白金高輪",
    "OK PRIME+ 白金高輪",
    "OK PRIME SHIROKANE TAKANAWA",
    "OK PRIME+ SHIROKANE-TAKANAWA",
  ];
}

/** 首頁瀏覽器分頁標題 */
export function getHomePageTitle(locale: "zh" | "jp" = "zh") {
  if (locale === "jp") {
    return `OK PRIME｜OK PRIME+ 白金高輪｜東京港区賃貸レジデンス・品川生活圏14戸｜${siteConfig.name}`;
  }
  return `OK PRIME｜OK PRIME+ 白金高輪｜東京港區出租公寓・品川生活圈14戶｜${siteConfig.name}`;
}

/** 首頁 meta description */
export function getHomeDescription(locale: "zh" | "jp" = "zh") {
  if (locale === "jp") {
    return "OK PRIME（OK PRIME+ 白金高輪）は東京都港区三田5-5-10（〒108-0073）の賃貸レジデンス。全14戸。白金高輪駅徒歩約5分、三田・田町も徒歩圏。ALSOK防犯・スマート設備完備。忠訓地產が見学予約・日本不動産相談をご案内。";
  }
  return siteConfig.description;
}

/**
 * 首頁 Sitelink 導覽（JSON-LD ItemList / SiteNavigationElement + 首頁可見導覽）。
 * 順序以 Google 常顯示的核心頁優先：地段 → 交通 → 概要 → 設備 → 聯絡。
 */
export const homeSitelinks = {
  zh: [
    { name: "地段核心", path: "/location", description: "港區三田5-5-10立地、文教區與周邊環境" },
    { name: "交通動線", path: "/transportation", description: "白金高輪站徒歩約5分、三田・田町・羽田成田" },
    { name: "物件概要", path: "/summary", description: "間取圖、仕上表與建案規格" },
    { name: "設備與保全系統", path: "/equipment", description: "廚衛設備、家電與 ALSOK 保全" },
    { name: "聯絡我們", path: "/contact", description: "賞屋預約、房源登記與置產諮詢" },
    { name: "建築特色", path: "/architecture", description: "外觀設計、建材與光影美學" },
    { name: "室內情境", path: "/interior", description: "室內設計情境與居住空間" },
    { name: "品牌故事", path: "/story", description: "OK PRIME 與忠訓地產品牌願景" },
  ],
  jp: [
    { name: "ロケーション", path: "/jp/location", description: "港区三田5-5-10の立地・文教エリア・周辺環境" },
    { name: "交通・アクセス", path: "/jp/transportation", description: "白金高輪駅徒歩約5分・三田・田町・羽田成田" },
    { name: "物件概要", path: "/jp/summary", description: "間取り図・仕様・建物概要" },
    { name: "設備・保全系統", path: "/jp/equipment", description: "キッチン・バス・ALSOK防犯" },
    { name: "お問い合わせ", path: "/jp/contact", description: "見学予約・登録・購入相談" },
    { name: "建築デザイン", path: "/jp/architecture", description: "外観・建材・光と影のデザイン" },
    { name: "インテリア", path: "/jp/interior", description: "室内デザインと居住空間" },
    { name: "ブランドストーリー", path: "/jp/developer", description: "OK PRIME・忠訓地產のブランド" },
  ],
} as const;

/** 建案完整顯示名稱（SEO、結構化資料用） */
export function getBuildingDisplayName() {
  return `${siteConfig.projectName} ${siteConfig.projectSubtitle}`;
}

/** 首頁 FAQ（與 HomePage 可見內容、JSON-LD FAQPage 同步） */
export const homeFaqItems = {
  zh: [
    {
      question: "OK PRIME 白金高輪位於哪裡？",
      answer:
        "OK PRIME（OK PRIME+ 白金高輪）位於東京都港區三田5-5-10（〒108-0073）。最近車站為白金高輪站（南北線・三田線，步行約5分），亦可利用三田站、田町站與泉岳寺站，輕鬆前往品川與羽田機場。",
    },
    {
      question: "如何預約樣品屋或索取資料？",
      answer: `請至「聯絡我們」頁面填寫表單，或致電 ${siteConfig.taipeiPhoneDisplay}、來信 ${siteConfig.email}，由忠訓地產專員協助預約與諮詢。`,
    },
    {
      question: "建案有哪些主要特色？",
      answer:
        "全案14戶，配備 ALSOK 保全與智慧設備，鄰近白金高輪・三田・田町交通樞紐與高輪 GATEWAY CITY，適合自住與日本置產規劃。",
    },
    {
      question: "網站有日文版本嗎？",
      answer: "有。中文版首頁為 /，日文版首頁為 /jp，各主要頁面均提供中日文對應內容。",
    },
  ],
  jp: [
    {
      question: "OK PRIME 白金高輪はどこにありますか？",
      answer:
        "OK PRIME（OK PRIME+ 白金高輪）は東京都港区三田5-5-10（〒108-0073）。最寄りは白金高輪駅（南北線・三田線、徒歩約5分）。三田駅・田町駅・泉岳寺駅も利用でき、品川や羽田空港へのアクセスも良好です。",
    },
    {
      question: "モデルルーム見学や資料請求はどうすればよいですか？",
      answer: `「お問い合わせ」ページからご予約ください。お電話（${siteConfig.taipeiPhoneDisplay}）またはメール（${siteConfig.email}）でも承ります。`,
    },
    {
      question: "物件の主な特長は？",
      answer:
        "全14戸。ALSOK防犯・スマート設備を備え、白金高輪・三田・田町の交通利便性と高輪 GATEWAY CITY に近い住まいです。",
    },
    {
      question: "中国語版のサイトはありますか？",
      answer: "はい。日本語トップは /jp、中国語トップは / です。主要ページは中日両言語でご確認いただけます。",
    },
  ],
} as const;
