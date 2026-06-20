/** 全站 SEO 與結構化資料共用的網站設定 */
export const siteConfig = {
  name: "忠訓地產",
  legalName: "忠訓地產開發有限公司",
 
  parentBrand: "OK忠訓國際集團",
  /** 建案名稱 */
  buildingName: "EL FARO+ 白金高輪",
  /** 建案／網站主標 */
  projectName: "EL FARO+",
  projectSubtitle: "白金高輪",
  description:
    "EL FARO+ 白金高輪—東京都心超越時代與流行的東京港區出租公寓系列。233戶住宅環繞綠意與水景，結合品川・港區核心交通與 ALSOK 保全，由忠訓地產提供專業日本置產與賞屋諮詢。現正受理房源登記及樣品屋參觀預約。",
  locale: "zh-TW",
  /** 正式網域（部署後請在 .env.local 設定 NEXT_PUBLIC_SITE_URL） */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.winnerlife.com"),
  corporateUrl: "https://www.winnerlife.com",
  email: "service@winnerlife.com",
  phone: "+81-120-109-230",
  phoneDisplay: "0120-109-230",
  taipeiPhone: "+886-2-2713-1039",
  taipeiPhoneDisplay: "(02) 2713-1039",
  address: {
    streetAddress: "南京市東路四段1號4樓",
    addressLocality: "松山區",
    addressRegion: "台北市",
    postalCode: "105",
    addressCountry: "TW",
  },
  propertyAddress: {
    addressLocality: "港區",
    addressRegion: "東京都",
    addressCountry: "JP",
  },
  license: "北市代銷會證字第 110011 號",
  businessHours: "Mo-Fr 10:00-18:00",
  businessHoursDisplay: {
    zh: "營業時間：10:00～18:00（週三、四、五公休）",
    jp: "営業時間：10:00〜18:00（水・木・金定休）",
  },
  areaServed: ["東京都", "日本"],
  ogImage: "/images/index/運河.png",
  ogImageAlt: {
    zh: "EL FARO+ 白金高輪 運河水岸建案外觀",
    jp: "EL FARO+ 白金高輪 運河沿いの外観",
  },
  ogImageWidth: 1035,
  ogImageHeight: 852,
  logo: "/images/js_logo_h1.png",
  keywords: [
    "EL FARO+",
    "白金高輪",
    "忠訓地產",
    "WinnerLife",
    "日本置產",
    "海外不動產",
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

/** 首頁瀏覽器分頁標題 */
export function getHomePageTitle(locale: "zh" | "jp" = "zh") {
  if (locale === "jp") {
    return `EL FARO+ 白金高輪｜東京港区賃貸レジデンス・品川生活圏233戸｜ALSOK防犯｜${siteConfig.name}`;
  }
  return `EL FARO+ 白金高輪｜東京港區出租公寓・品川生活圈233戶運河水岸｜ALSOK保全｜${siteConfig.name}`;
}

/** 首頁 meta description */
export function getHomeDescription(locale: "zh" | "jp" = "zh") {
  if (locale === "jp") {
    return "EL FARO+ 白金高輪—東京の中心・港区の賃貸レジデンス。233戸が緑と水に囲まれ、品川・天王洲アイル駅徒歩圏。ALSOK防犯・スマート設備完備。忠訓地產が見学予約・日本不動産相談をご案内。";
  }
  return siteConfig.description;
}

/** 首頁 Sitelink 導覽（結構化資料・站內導覽一致） */
export const homeSitelinks = {
  zh: [
    { name: "建案理念", path: "/concept", description: "EL FARO+ 燈塔理念與 Urban Classic 設計願景" },
    { name: "區域再開發與周邊設施", path: "/amenities", description: "白金高輪都市更新、商業與生活設施" },
    { name: "地段核心", path: "/location", description: "港區地理位置、文教區與周邊環境" },
    { name: "交通動線", path: "/transportation", description: "三站五線交通、羽田成田直達" },
    { name: "建築特色", path: "/architecture", description: "外觀設計、建材與光影美學" },
    { name: "物件概要", path: "/summary", description: "間取圖、仕上表與建案規格" },
    { name: "室內情境", path: "/interior", description: "室內設計情境與居住空間" },
    { name: "設備與保全系統", path: "/equipment", description: "廚衛設備、家電與 ALSOK 保全" },
    { name: "品牌故事", path: "/story", description: "OK PRIME 與忠訓地產品牌願景" },
  ],
  jp: [
    { name: "コンセプト", path: "/jp/concept", description: "EL FARO+ 灯台コンセプトと Urban Classic" },
    { name: "地域再開発・周辺施設", path: "/jp/amenities", description: "白金高輪の都市更新と生活施設" },
    { name: "ロケーション", path: "/jp/location", description: "港区の立地・文教エリア・周辺環境" },
    { name: "交通・アクセス", path: "/jp/transportation", description: "3駅5路線・羽田成田アクセス" },
    { name: "建築デザイン", path: "/jp/architecture", description: "外観・建材・光と影のデザイン" },
    { name: "物件概要", path: "/jp/summary", description: "間取り図・仕様・建物概要" },
    { name: "インテリア", path: "/jp/interior", description: "室内デザインと居住空間" },
    { name: "設備・保全系統", path: "/jp/equipment", description: "キッチン・バス・ALSOK防犯" },
    { name: "ブランドストーリー", path: "/jp/developer", description: "OK PRIME・忠訓地產のブランド" },
  ],
} as const;

/** 建案完整顯示名稱（SEO、結構化資料用） */
export function getBuildingDisplayName() {
  return `${siteConfig.projectName} ${siteConfig.projectSubtitle}`;
}
