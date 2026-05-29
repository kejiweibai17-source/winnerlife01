/** 全站 SEO 與結構化資料共用的網站設定 */
export const siteConfig = {
  name: "忠訓地產",
  legalName: "忠訓地產開發有限公司",
  tagline: "財富自由．享富人生",
  parentBrand: "OK忠訓國際集團",
  /** 建案名稱 */
  buildingName: "白金高輪",
  /** 建案／網站主標 */
  projectName: "Premium Midsize Office",
  projectSubtitle: "品川・港區",
  description:
    "白金高輪—將持續演進的品川地區納入生活圈的港區住宅案。233戶住宅環繞綠意與水景，現正受理房源登記及樣品屋參觀預約。由忠訓地產開發有限公司提供專業日本置產與投資諮詢。",
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
  ogImage: "/images/index/2e1db6cf-3af3-452a-bc95-9e240c728533.png",
  logo: "/images/js_logo_h1.png",
  keywords: [
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
    "Premium Midsize Office",
  ],
} as const;

export function absoluteUrl(path: string) {
  const base = siteConfig.url;
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** 首頁瀏覽器分頁標題 */
export function getHomePageTitle() {
  return `${siteConfig.buildingName}｜${siteConfig.projectSubtitle} ${siteConfig.projectName}｜${siteConfig.name}`;
}

/** 建案完整顯示名稱（SEO、結構化資料用） */
export function getBuildingDisplayName() {
  return `${siteConfig.buildingName} ${siteConfig.projectSubtitle} ${siteConfig.projectName}`;
}
