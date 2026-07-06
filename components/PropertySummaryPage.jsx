"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getSummaryPageData } from "@/lib/summary-page-data";
import Copy from "./Copy";

const NAVY = "#0d417b";
const BEIGE = "#dad5d0";
const TH_BG = "#555555";
const HERO_IMAGE = "/images/summary/物件概要01.png";
const INTRO_IMAGE_02 = "/images/company-logo.svg";
const INTRO_IMAGE_03 = "/images/summary/物件概要03.png";

function WaveDivider() {
  return (
    <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 w-full overflow-hidden leading-[0]">
      <svg
        className="relative block h-[100px] md:h-[180px] lg:h-[250px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ width: "200%", marginLeft: 0 }}
      >
        <defs>
          <linearGradient
            id="summary-wave-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect x="0" y="95" width="2400" height="30" fill="#ffffff" />

        <path
          className="animate-wave-slow"
          d="M0,70 C400,90 800,30 1200,60 C1600,80 2000,60 2400,70 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.25"
        />
        <path
          className="animate-wave-mid"
          d="M0,60 C400,30 800,90 1200,60 C1600,30 2000,90 2400,60 L2400,120 L0,120 Z"
          fill="#ffffff"
          opacity="0.45"
        />
        <path
          className="animate-wave-fast"
          d="M0,80 C600,110 1000,40 1400,70 C1800,90 2100,50 2400,60 L2400,120 L0,120 Z"
          fill="url(#summary-wave-gradient)"
        />
      </svg>
    </div>
  );
}

function CopyBlock({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Copy animateOnScroll delay={delay}>
        {children}
      </Copy>
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

function OverviewTable({ t, overview }) {
  const l = (key) => t(`labels.${key}`);
  const o = overview;

  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <tbody>
          <tr>
            <LabelCell>{l("name")}</LabelCell>
            <Td colSpan={5}>{o.name}</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={2}>{l("location")}</LabelCell>
            <Th>{l("lotNumber")}</Th>
            <Td colSpan={4}>{o.lotNumber}</Td>
          </tr>
          <tr>
            <Th>{l("address")}</Th>
            <Td colSpan={4}>{o.address}</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={7}>{l("siteOverview")}</LabelCell>
            <Th>{l("siteArea")}</Th>
            <Td colSpan={4}>{o.siteArea}</Td>
          </tr>
          <tr>
            <Th>{l("zoning")}</Th>
            <Td colSpan={4}>{o.zoning}</Td>
          </tr>
          <tr>
            <Th>{l("fireZone")}</Th>
            <Td colSpan={4}>{o.fireZone}</Td>
          </tr>
          <tr>
            <Th>{l("coverage")}</Th>
            <Td colSpan={4}>{o.coverage}</Td>
          </tr>
          <tr>
            <Th>{l("far")}</Th>
            <Td colSpan={4}>{o.far}</Td>
          </tr>
          <tr>
            <Th>{l("heightDistrict")}</Th>
            <Td colSpan={4}>{o.heightDistrict}</Td>
          </tr>
          <tr>
            <Th>{l("other")}</Th>
            <Td colSpan={4}>{o.other}</Td>
          </tr>
          <tr>
            <LabelCell rowSpan={7}>{l("buildingOverview")}</LabelCell>
            <Th>{l("mainUse")}</Th>
            <Td>{o.mainUse}</Td>
            <Th>{l("totalFloorArea")}</Th>
            <Td colSpan={2}>{o.totalFloorArea}</Td>
          </tr>
          <tr>
            <Th>{l("constructionType")}</Th>
            <Td>{o.constructionType}</Td>
            <Th>{l("buildingArea")}</Th>
            <Td>{o.buildingArea}</Td>
            <Th>{l("buildingCoverage")}</Th>
            <Td>{o.buildingCoverage}</Td>
          </tr>
          <tr>
            <Th colSpan={2}>{l("constructionPeriod")}</Th>
            <Td colSpan={4}>{o.constructionPeriod}</Td>
          </tr>
          <tr>
            <Th>{l("structure")}</Th>
            <Td>{o.structure}</Td>
            <Th>{l("farFloorArea")}</Th>
            <Td>{o.farFloorArea}</Td>
            <Th>{l("floorAreaRatio")}</Th>
            <Td>{o.floorAreaRatio}</Td>
          </tr>
          <tr>
            <Th>{l("fireResistance")}</Th>
            <Td>{o.fireResistance}</Td>
            <Th>{l("elevator")}</Th>
            <Td>{o.elevator}</Td>
            <Th>{l("parking")}</Th>
            <Td>{o.parking}</Td>
          </tr>
          <tr>
            <Th>{l("permitNumber")}</Th>
            <Td>{o.permitNumber}</Td>
            <Th>{l("bicycleParking")}</Th>
            <Td>{o.bicycleParking}</Td>
            <Th>{l("motorcycleParking")}</Th>
            <Td>{o.motorcycleParking}</Td>
          </tr>
          <tr>
            <Th colSpan={2}>{l("privateArea")}</Th>
            <Td colSpan={4}>{o.privateArea}</Td>
          </tr>
          <tr>
            <LabelCell>{l("developer")}</LabelCell>
            <Td colSpan={5}>{o.developer}</Td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function FloorPlanSection({ t, floorPlans }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title={t("floorPlan.title")}
          subtitle={t("floorPlan.subtitle")}
        />

        <div className="space-y-14 md:space-y-20">
          {floorPlans.map((plan, planIndex) => (
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
                        <Td className="text-center font-medium">
                          {unit.layout}
                        </Td>
                        <Td className="text-center">{unit.rooms}</Td>
                        <Td className="text-center">
                          {unit.area}
                          <span className="text-gray-500">
                            （{unit.tsubo}）
                          </span>
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

function InteriorFinishSection({ t, interiorRows }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section
      className="px-6 md:px-10 lg:px-16 py-16 md:py-20"
      style={{ backgroundColor: BEIGE }}
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          title={t("interior.title")}
          subtitle={t("interior.subtitle")}
        />

        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <Th rowSpan={2}>
                  {l("part")}
                  <br />
                  <span className="text-[10px] font-light">
                    {l("roomName")}
                  </span>
                </Th>
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
              {interiorRows.map((row) => (
                <tr key={row.room}>
                  <LabelCell>{row.room}</LabelCell>
                  <Td className="text-center">{row.floor}</Td>
                  <Td className="text-center text-gray-500">{row.floorSub}</Td>
                  <Td className="text-center">{row.baseboard}</Td>
                  <Td className="text-center">{row.wall}</Td>
                  <Td className="text-center text-gray-500">{row.wallSub}</Td>
                  <Td className="text-center">{row.ceiling}</Td>
                  <Td className="text-center text-gray-500">
                    {row.ceilingSub}
                  </Td>
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

function EquipmentSection({ t, equipmentRows }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading title={t("equipment.title")} />

        <div className="divide-y divide-gray-200 border border-gray-200 bg-white shadow-sm">
          {equipmentRows.map((row, index) => (
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
              <CopyBlock
                delay={index * 0.03}
                className="px-4 py-4 md:py-5 md:px-6"
              >
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

function ExteriorFinishSection({ t, exteriorRows }) {
  const l = (key) => t(`labels.${key}`);

  return (
    <section
      className="px-6 md:px-10 lg:px-16 py-16 md:py-20 pb-24 md:pb-32"
      style={{ backgroundColor: BEIGE }}
    >
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          title={t("exterior.title")}
          subtitle={t("exterior.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exteriorRows.map((group, gi) => (
            <div
              key={group.part}
              className="bg-white border border-gray-200 shadow-sm overflow-hidden"
            >
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
                        <LabelCell rowSpan={group.items.length}>
                          {group.part}
                        </LabelCell>
                      ) : null}
                      <Td>
                        {item.label && (
                          <span className="text-gray-500 mr-1">
                            {item.label}：
                          </span>
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
  const pathname = usePathname();
  const locale = pathname.startsWith("/jp") ? "jp" : "zh";
  const data = getSummaryPageData(locale);
  const t = useTranslations("summary");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative w-full overflow-x-hidden font-sans text-gray-800 bg-white">
      <style jsx global>{`
        @keyframes waveSlow {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) scaleY(0.8);
          }
          100% {
            transform: translateX(-50%) scaleY(1);
          }
        }
        @keyframes waveMid {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-15%) scaleY(1.1);
          }
          100% {
            transform: translateX(-30%) scaleY(1);
          }
        }
        @keyframes waveFast {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-20%) scaleY(0.9);
          }
          100% {
            transform: translateX(-40%) scaleY(1);
          }
        }
        .animate-wave-slow {
          animation: waveSlow 15s linear infinite;
          transform-origin: bottom;
        }
        .animate-wave-mid {
          animation: waveMid 10s linear infinite;
          transform-origin: bottom;
        }
        .animate-wave-fast {
          animation: waveFast 8s linear infinite;
          transform-origin: bottom;
        }
      `}</style>
      <main className="bg-[#0d417b] pt-20">
        {/* Hero & intro images */}
        <section className="w-full">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/7]">
            <Image
              src={HERO_IMAGE}
              alt={t("heroAlt")}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          <div className="relative w-full bg-[#0d417b] pb-20">
            <Image
              src={INTRO_IMAGE_02}
              alt={t("intro.image02Alt")}
              width={1920}
              height={1080}
              className="w-[500px] mx-auto h-auto"
            />
            <WaveDivider />
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

          <div className="relative w-full bg-[#0d417b] ">
            <Image
              src={INTRO_IMAGE_03}
              alt={t("intro.image03Alt")}
              width={1920}
              height={1080}
              className="w-[500px] mx-auto h-auto"
            />
          </div>
        </section>

        {/* Section 1: Overview table — split background */}
        <section className="relative">
          <div
            className="absolute inset-0 flex flex-col pointer-events-none"
            aria-hidden
          >
            <div className="h-1/2" style={{ backgroundColor: NAVY }} />
            <div className="h-1/2" style={{ backgroundColor: BEIGE }} />
          </div>

          <div className="relative z-10 px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-16 md:pb-24">
            <div className="mx-auto max-w-[1100px]">
              <SectionHeading
                title={t("overview.title")}
                subtitle={t("overview.subtitle")}
              />
              <OverviewTable t={t} overview={data.overview} />
              <CopyBlock delay={0.1} className="mt-6">
                <p className="m-0 text-[11px] md:text-xs text-white/80 md:text-gray-500 leading-relaxed">
                  {t("overview.disclaimer")}
                </p>
              </CopyBlock>
            </div>
          </div>
        </section>

        {/* Section 2–4: Floor plans */}
        <FloorPlanSection t={t} floorPlans={data.floorPlans} />

        {/* Section 5: Interior finish */}
        <InteriorFinishSection t={t} interiorRows={data.interiorRows} />

        {/* Section 6: Equipment */}
        <EquipmentSection t={t} equipmentRows={data.equipmentRows} />

        {/* Section 7: Exterior finish — still part of the 6 content blocks; equipment+exterior could count as 5+6 */}
        <ExteriorFinishSection t={t} exteriorRows={data.exteriorRows} />
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-opacity hover:opacity-80"
        style={{ backgroundColor: NAVY }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
