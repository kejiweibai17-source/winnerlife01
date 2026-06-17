"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Copy from "./Copy";

const NAVY = "#0d417b";
const BEIGE = "#dad5d0";
const TH_BG = "#555555";
const HERO_IMAGE = "/images/summary/物件概要01.png";
const INTRO_IMAGE_02 = "/images/summary/物件概要02.png";
const INTRO_IMAGE_03 = "/images/summary/物件概要03.png";

const FLOOR_PLANS = [
  {
    floor: "1F Floor Plan",
    units: [
      { type: "A", layout: "2LDK", rooms: "101号室", area: "47.58 m²", tsubo: "14.39 坪" },
      { type: "B", layout: "1LDK", rooms: "102号室", area: "37.13 m²", tsubo: "11.23 坪" },
    ],
  },
  {
    floor: "2F–4F Floor Plan",
    units: [
      { type: "C", layout: "1LDK", rooms: "201 / 301 / 401 号室", area: "37.67 m²", tsubo: "11.40 坪" },
      { type: "D", layout: "1K", rooms: "202 / 302 / 402 号室", area: "20.66 m²", tsubo: "6.25 坪" },
      { type: "E", layout: "1LDK", rooms: "203 / 303 / 403 号室", area: "37.92 m²", tsubo: "11.47 坪" },
    ],
  },
  {
    floor: "5F Floor Plan",
    units: [
      { type: "F", layout: "1LDK", rooms: "501号室", area: "31.26 m²", tsubo: "9.46 坪" },
      { type: "G", layout: "1K", rooms: "502号室", area: "20.02 m²", tsubo: "6.06 坪" },
      { type: "H", layout: "1LDK", rooms: "503号室", area: "33.46 m²", tsubo: "10.12 坪" },
    ],
  },
];

const INTERIOR_ROWS = [
  { room: "ポーチ", floor: "磁器質タイル", floorSub: "—", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "—" },
  { room: "階段室・共用廊下", floor: "防滑性ビニル床シート", floorSub: "—", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "—" },
  { room: "玄関", floor: "磁器質タイル", floorSub: "セルフレベルリング材", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "2150" },
  { room: "LDK", floor: "フローリング", floorSub: "セルフレベルリング材", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "2100" },
  { room: "洋室", floor: "フローリング", floorSub: "セルフレベルリング材", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "2275" },
  { room: "CL", floor: "フローリング", floorSub: "セルフレベルリング材", baseboard: "木巾木", wall: "ビニルクロス貼り", wallSub: "PB t=12.5", ceiling: "ビニルクロス貼り", ceilingSub: "PB t=9.5", height: "2270" },
  { room: "トイレ", floor: "磁器質タイル", floorSub: "セルフレベルリング材", baseboard: "—", wall: "ビニルクロス貼り", wallSub: "耐水PB", ceiling: "ビニルクロス貼り", ceilingSub: "耐水PB", height: "2000" },
  { room: "洗面室", floor: "磁器質タイル", floorSub: "セルフレベルリング材", baseboard: "—", wall: "ビニルクロス貼り", wallSub: "耐水PB", ceiling: "ビニルクロス貼り", ceilingSub: "耐水PB", height: "2000" },
  { room: "洗濯機置場", floor: "磁器質タイル", floorSub: "セルフレベルリング材", baseboard: "—", wall: "ビニルクロス貼り", wallSub: "耐水PB", ceiling: "ビニルクロス貼り", ceilingSub: "耐水PB", height: "2000" },
  { room: "浴室", floor: "ユニットバス", floorSub: "—", baseboard: "—", wall: "ユニットバス", wallSub: "—", ceiling: "ユニットバス", ceilingSub: "—", height: "—" },
];

const EQUIPMENT_ROWS = [
  { part: "ポーチ", spec: "集合玄関機 ●メールボックス一体型宅配ボックス（防雨仕様）[NASTA] ●管理者連絡表示板（樹脂製）300×500 ●消火器 ●非常用照明 ●誘導灯" },
  { part: "階段室・共用廊下", spec: "階段手摺：樹脂手摺既製品 ●踏面・蹴込：防滑性ビニル床シート ●段鼻：ビニル床シート一体型 ●アクセントタイル：各住戸前 W200×H2000 ピッツモザイクボーダー・陶彩 BM-OLM-4795/CAR [ニッタイ工業]同等 ●階数表示板（SUS製） ●掲示板（A2サイズ） ●消火器 ●非常用照明 ●誘導灯" },
  { part: "玄関", spec: "下足入 ●床見切り（SUS-FB） ●ダウンライト" },
  { part: "LDK", spec: "システムキッチン ●レンジフード（ダクトはRW被覆） ●エアコン室内機（設備工事・下地・スリーブ） ●カーテンレール（W） ●給気口150φ（差圧式・FD付） ●住宅用火災警報器（熱感）" },
  { part: "洋室", spec: "エアコン室内機（設備工事・下地・スリーブ） ●カーテンレール（W） ●室内物干金物 ●給気口100φ ●住宅用火災警報器（煙感）" },
  { part: "CL", spec: "ハンガーパイプ（SUS32φ同等） ●枕棚D400" },
  { part: "トイレ", spec: "洋式便器（温水洗浄便座付/タンク上部手洗付） ●ペーパーホルダー ●タオルリング ●固定棚 ●ダウンライト ●換気設備（24時間換気）" },
  { part: "洗面室", spec: "洗面化粧台L600 ●タオルリング ●ダウンライト ●換気設備（24時間換気） ●分電盤" },
  { part: "洗濯機置場", spec: "洗濯機パン640□（洗濯機パン下を他配管が通過する場合、SL+120とし薄型タイプを基本とする。他配管が通過せず、配管を隠蔽可能な場合、高床タイプも可とする。）" },
  { part: "浴室", spec: "ユニットバス1014/1116 ●浴室換気暖房乾燥機（24時間換気） ●ハンガーパイプ（UB付属品）※JIS A4416に適合する。" },
];

const EXTERIOR_ROWS = [
  { part: "屋上", items: [
    { label: "屋根", value: "アスファルト防水（トーチ工法）" },
    { label: "パラペット", value: "外壁仕上と同仕様" },
    { label: "設備基礎", value: "モルタル仕上" },
    { label: "ハト小屋", value: "ガルバリウム鋼板 t=0.35" },
    { label: "屋上点検口", value: "アルミ製" },
  ]},
  { part: "ルーフバルコニー", items: [{ label: "", value: "アスファルト防水（トーチ工法）●手摺：アルミ製" }] },
  { part: "ルーフドレイン", items: [{ label: "", value: "ステンレス製" }] },
  { part: "竪樋", items: [{ label: "", value: "塩ビ製 色：外壁色に準ずる" }] },
  { part: "外壁", items: [{ label: "", value: "塗装：セラミックシリコン樹脂塗装 ●タイル：石目調タイル" }] },
  { part: "基礎立上り", items: [{ label: "", value: "モルタル仕上 色：外壁色に準ずる" }] },
  { part: "目地", items: [{ label: "", value: "シーリング材：ウレタン系" }] },
  { part: "開口部", items: [
    { label: "出入口", value: "アルミ製 断熱サッシ" },
    { label: "玄関ドア", value: "防火戸 断熱仕様" },
    { label: "窓", value: "アルミ製 断熱サッシ Low-E複層ガラス" },
    { label: "MB/PS", value: "アルミ製" },
  ]},
  { part: "外構", items: [
    { label: "アプローチ床", value: "磁器質タイル" },
    { label: "犬走り", value: "コンクリート仕上" },
    { label: "塀", value: "タイル貼り" },
    { label: "共用水栓", value: "ステンレス製" },
  ]},
  { part: "その他", items: [
    { label: "館銘板", value: "ステンレス製" },
    { label: "管理者連絡表示板", value: "樹脂製" },
    { label: "避難器具", value: "—" },
    { label: "物干金物", value: "ステンレス製" },
    { label: "消火器", value: "各階設置" },
  ]},
];

function CopyBlock({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Copy animateOnScroll delay={delay}>{children}</Copy>
    </div>
  );
}

function SectionHeading({ title, subtitle, delay = 0 }) {
  return (
    <CopyBlock delay={delay} className="mb-8 md:mb-10">
      <div className="flex items-center gap-4">
        <span className="block h-8 w-px bg-gray-400 shrink-0" aria-hidden />
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="inline-block bg-[#f5c6cb] px-2 py-0.5 font-serif text-lg md:text-xl tracking-[0.08em] text-gray-900">
            {title}
          </span>
          {subtitle && (
            <span className="inline-block bg-[#f5c6cb]/70 px-2 py-0.5 text-sm tracking-[0.12em] text-gray-700">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </CopyBlock>
  );
}

function Th({ children, colSpan, rowSpan, className = "" }) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`border border-gray-300 px-3 py-2.5 text-xs md:text-sm font-normal text-center text-white whitespace-nowrap ${className}`}
      style={{ backgroundColor: TH_BG }}
    >
      {children}
    </th>
  );
}

function Td({ children, className = "", colSpan, rowSpan }) {
  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`border border-gray-300 px-3 py-2.5 text-xs md:text-[13px] text-gray-800 leading-relaxed align-top ${className}`}
    >
      {children}
    </td>
  );
}

function LabelCell({ children }) {
  return (
    <td
      className="border border-gray-300 px-3 py-2.5 text-xs md:text-sm text-white text-center align-middle whitespace-nowrap w-[120px] md:w-[140px]"
      style={{ backgroundColor: TH_BG }}
    >
      {children}
    </td>
  );
}

function OverviewTable({ t }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <tbody>
          <tr>
            <LabelCell>{l("name")}</LabelCell>
            <Td colSpan={5}>エルファーロプラス白金高輪 新築工事</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={2}>{l("location")}</LabelCell>
            <Th>{l("lotNumber")}</Th>
            <Td colSpan={4}>東京都港区三田5丁目1番52</Td>
          </tr>
          <tr>
            <Th>{l("address")}</Th>
            <Td colSpan={4}>東京都港区三田5丁目5番10号</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={7}>{l("siteOverview")}</LabelCell>
            <Th>{l("siteArea")}</Th>
            <Td colSpan={4}>148.83 ㎡（建築確認申請書 記載面積）</Td>
          </tr>
          <tr>
            <Th>{l("zoning")}</Th>
            <Td colSpan={4}>商業地域</Td>
          </tr>
          <tr>
            <Th>{l("fireZone")}</Th>
            <Td colSpan={4}>防火地域</Td>
          </tr>
          <tr>
            <Th>{l("coverage")}</Th>
            <Td colSpan={4}>80%（指定）100.00%（許容）（準防火地域内の耐火建築物）</Td>
          </tr>
          <tr>
            <Th>{l("far")}</Th>
            <Td colSpan={4}>500%（指定）320.00%（許容）（道路幅員 4m × 0.8）</Td>
          </tr>
          <tr>
            <Th>{l("heightDistrict")}</Th>
            <Td colSpan={4}>40m 高度地区</Td>
          </tr>
          <tr>
            <Th>{l("other")}</Th>
            <Td colSpan={4}>第二種文教地区</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={7}>{l("buildingOverview")}</LabelCell>
            <Th>{l("mainUse")}</Th>
            <Td>共同住宅（14戸）</Td>
            <Th>{l("totalFloorArea")}</Th>
            <Td colSpan={2}>541.28 ㎡</Td>
          </tr>
          <tr>
            <Th>{l("constructionType")}</Th>
            <Td>新築工事</Td>
            <Th>{l("buildingArea")}</Th>
            <Td>110.56 ㎡</Td>
            <Th>{l("buildingCoverage")}</Th>
            <Td>74.29%</Td>
          </tr>
          <tr>
            <Th colSpan={2}>{l("constructionPeriod")}</Th>
            <Td colSpan={4}>令和7年12月1日～令和8年11月上旬竣工（予定）</Td>
          </tr>
          <tr>
            <Th>{l("structure")}</Th>
            <Td>鉄筋コンクリート造・地上5階建て</Td>
            <Th>{l("farFloorArea")}</Th>
            <Td>466.86 ㎡</Td>
            <Th>{l("floorAreaRatio")}</Th>
            <Td>313.69%</Td>
          </tr>
          <tr>
            <Th>{l("fireResistance")}</Th>
            <Td>耐火建築物</Td>
            <Th>{l("elevator")}</Th>
            <Td>1基</Td>
            <Th>{l("parking")}</Th>
            <Td>—</Td>
          </tr>
          <tr>
            <Th>{l("permitNumber")}</Th>
            <Td>未定</Td>
            <Th>{l("bicycleParking")}</Th>
            <Td>1台（屋根なし）</Td>
            <Th>{l("motorcycleParking")}</Th>
            <Td>—</Td>
          </tr>
          <tr>
            <Th colSpan={2}>{l("privateArea")}</Th>
            <Td colSpan={4}>20.02 ㎡（1K）～ 47.58 ㎡（2LDK）</Td>
          </tr>
          <tr>
            <LabelCell>{l("developer")}</LabelCell>
            <Td colSpan={5}>
              東京都目黒区目黒2-10-11 目黒山手プレイス4階／株式会社明豊エンタープライズ
            </Td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function FloorPlanSection({ t }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title={t("floorPlan.title")}
          subtitle={t("floorPlan.subtitle")}
        />

        <div className="space-y-14 md:space-y-20">
          {FLOOR_PLANS.map((plan, planIndex) => (
            <div key={plan.floor}>
              <CopyBlock delay={planIndex * 0.05}>
                <h3 className="m-0 mb-6 font-serif text-base md:text-lg tracking-[0.08em] text-gray-800 border-b border-gray-300 pb-3">
                  • {plan.floor}
                </h3>
              </CopyBlock>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse">
                  <thead>
                    <tr>
                      <Th className="w-16">Type</Th>
                      <Th>{l("layout")}</Th>
                      <Th>{l("roomNo")}</Th>
                      <Th>{l("exclusiveArea")}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.units.map((unit) => (
                      <tr key={unit.type}>
                        <Td className="text-center font-medium">
                          <span
                            className="inline-flex h-8 w-8 items-center justify-center text-white text-xs"
                            style={{ backgroundColor: TH_BG }}
                          >
                            {unit.type}
                          </span>
                        </Td>
                        <Td className="text-center font-medium">{unit.layout}</Td>
                        <Td className="text-center">{unit.rooms}</Td>
                        <Td className="text-center">
                          {unit.area}
                          <span className="text-gray-500">（{unit.tsubo}）</span>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <CopyBlock delay={0.2} className="mt-10">
          <p className="m-0 text-[11px] md:text-xs text-gray-500 leading-relaxed">
            {t("floorPlan.footnote")}
          </p>
        </CopyBlock>
      </div>
    </section>
  );
}

function InteriorFinishSection({ t }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20" style={{ backgroundColor: BEIGE }}>
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          title={t("interior.title")}
          subtitle={t("interior.subtitle")}
        />

        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <Th rowSpan={2}>{l("part")}<br /><span className="text-[10px] font-light">{l("roomName")}</span></Th>
                <Th colSpan={2}>{l("floor")}</Th>
                <Th>{l("baseboard")}</Th>
                <Th colSpan={2}>{l("wall")}</Th>
                <Th colSpan={3}>{l("ceiling")}</Th>
              </tr>
              <tr>
                <Th>{l("finishMaterial")}</Th>
                <Th>{l("substrate")}</Th>
                <Th>—</Th>
                <Th>{l("finishMaterial")}</Th>
                <Th>{l("substrate")}</Th>
                <Th>{l("finishMaterial")}</Th>
                <Th>{l("substrate")}</Th>
                <Th>{l("ceilingHeight")}</Th>
              </tr>
            </thead>
            <tbody>
              {INTERIOR_ROWS.map((row) => (
                <tr key={row.room}>
                  <LabelCell>{row.room}</LabelCell>
                  <Td className="text-center">{row.floor}</Td>
                  <Td className="text-center text-gray-500">{row.floorSub}</Td>
                  <Td className="text-center">{row.baseboard}</Td>
                  <Td className="text-center">{row.wall}</Td>
                  <Td className="text-center text-gray-500">{row.wallSub}</Td>
                  <Td className="text-center">{row.ceiling}</Td>
                  <Td className="text-center text-gray-500">{row.ceilingSub}</Td>
                  <Td className="text-center">{row.height}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function EquipmentSection({ t }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading title={t("equipment.title")} />

        <div className="divide-y divide-gray-200 border border-gray-200 bg-white shadow-sm">
          {EQUIPMENT_ROWS.map((row, index) => (
            <div
              key={row.part}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-0"
            >
              <div
                className="flex items-center justify-center px-4 py-4 md:py-5 text-xs md:text-sm text-white text-center"
                style={{ backgroundColor: TH_BG }}
              >
                {row.part}
              </div>
              <CopyBlock delay={index * 0.03} className="px-4 py-4 md:py-5 md:px-6">
                <p className="m-0 text-xs md:text-[13px] leading-[2] text-gray-700">
                  {row.spec}
                </p>
              </CopyBlock>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExteriorFinishSection({ t }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 pb-24 md:pb-32" style={{ backgroundColor: BEIGE }}>
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title={t("exterior.title")}
          subtitle={t("exterior.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EXTERIOR_ROWS.map((group, gi) => (
            <div key={group.part} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <Th>{l("part")}</Th>
                    <Th>{l("specification")}</Th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, ii) => (
                    <tr key={ii}>
                      {ii === 0 ? (
                        <LabelCell rowSpan={group.items.length}>{group.part}</LabelCell>
                      ) : null}
                      <Td>
                        {item.label && (
                          <span className="text-gray-500 mr-1">{item.label}：</span>
                        )}
                        {item.value}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <CopyBlock delay={0.15} className="mt-10">
          <p className="m-0 text-[11px] md:text-xs text-gray-500 leading-relaxed">
            {t("overview.disclaimer")}
          </p>
        </CopyBlock>
      </div>
    </section>
  );
}

export default function PropertySummaryPage() {
  const t = useTranslations("summary");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full overflow-x-hidden font-sans text-gray-800 bg-white">
      <main className="pt-20 md:pt-24">
        {/* Hero & intro images */}
        <section className="w-full">
          <div className="relative w-full aspect-[16/7] md:aspect-[21/7]">
            <Image
              src={HERO_IMAGE}
              alt={t("heroAlt")}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          <div className="relative w-full">
            <Image
              src={INTRO_IMAGE_02}
              alt={t("intro.image02Alt")}
              width={1920}
              height={1080}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>

          <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16 bg-white">
            <div className="mx-auto max-w-[760px] text-center">
              <CopyBlock>
                <p className="m-0 text-sm md:text-[15px] leading-[2.2] text-gray-600 font-light whitespace-pre-line">
                  {t("intro.paragraph")}
                </p>
              </CopyBlock>
              <CopyBlock delay={0.1} className="mt-10 md:mt-12">
                <h2 className="m-0 font-serif text-xl md:text-2xl lg:text-[28px] tracking-[0.1em] leading-snug text-gray-900">
                  {t("intro.heading")}
                </h2>
              </CopyBlock>
            </div>
          </div>

          <div className="relative w-full">
            <Image
              src={INTRO_IMAGE_03}
              alt={t("intro.image03Alt")}
              width={1920}
              height={1080}
              className="w-full h-auto"
              sizes="100vw"
            />
          </div>
        </section>

        {/* Section 1: Overview table — split background */}
        <section className="relative">
          <div className="absolute inset-0 flex flex-col pointer-events-none" aria-hidden>
            <div className="h-1/2" style={{ backgroundColor: NAVY }} />
            <div className="h-1/2" style={{ backgroundColor: BEIGE }} />
          </div>

          <div className="relative z-10 px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-16 md:pb-24">
            <div className="mx-auto max-w-[1100px]">
              <SectionHeading
                title={t("overview.title")}
                subtitle={t("overview.subtitle")}
              />
              <OverviewTable t={t} />
              <CopyBlock delay={0.1} className="mt-6">
                <p className="m-0 text-[11px] md:text-xs text-white/80 md:text-gray-500 leading-relaxed">
                  {t("overview.disclaimer")}
                </p>
              </CopyBlock>
            </div>
          </div>
        </section>

        {/* Section 2–4: Floor plans */}
        <FloorPlanSection t={t} />

        {/* Section 5: Interior finish */}
        <InteriorFinishSection t={t} />

        {/* Section 6: Equipment */}
        <EquipmentSection t={t} />

        {/* Section 7: Exterior finish — still part of the 6 content blocks; equipment+exterior could count as 5+6 */}
        <ExteriorFinishSection t={t} />
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: NAVY }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
