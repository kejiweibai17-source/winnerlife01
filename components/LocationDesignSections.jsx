"use client";

import { useTranslations } from "next-intl";
import Copy from "./Copy";

const GOLD = "#fdcb67";
const NAVY = "#0d417b";

const IMAGES = {
  s2Icon: "/images/location/section-01/section-2-03.png",
  s2Banner: "/images/location/section-01/section-2-04.png",
  s2Hero: "/images/location/section-01/section-1-1.png",
  s4Left: "/images/location/section-01/section-2-01.png",
  s4Right: "/images/location/section-01/section-2-02.png",
  s1Hero: "/images/location/section-01/section-1-4.png",
  s5Map: "/images/location/section-01/section-1-9.png",
  s5Circle: "/images/location/section-01/circle.png",
  s3Hero: "/images/location/section-01/section-1-8.png",
};

export default function LocationDesignSections() {
  const t = useTranslations("location.designSections");
  const s1Paragraphs = t.raw("s1.paragraphs");
  const lifeItems = t.raw("s5.lifeItems");

  return (
    <>
      <style jsx global>{`
        .location-design-sections h2,
        .location-design-sections h3 {
          line-height: 1.25 !important;
        }
      `}</style>
      <div className="location-design-sections">
      {/* Section 2 — 大規模再開発 */}
      <section
        className="min-h-[640px] lg:h-screen overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        <div className="flex h-full flex-col lg:flex-row">
          <div
            className="flex w-full shrink-0 items-center justify-center border-b-2 py-10 lg:w-[15%] lg:border-b-0 lg:border-r-2 lg:py-0"
            style={{ borderColor: GOLD }}
          >
            <img
              src={IMAGES.s2Icon}
              alt=""
              className="w-[120px] md:w-[150px] lg:w-[180px]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className="flex w-full flex-col border-b-2 lg:w-[35%] lg:border-b-0 lg:border-r-2"
            style={{ borderColor: GOLD }}
          >
            <img
              src={IMAGES.s2Banner}
              alt=""
              className="w-full"
              loading="lazy"
              decoding="async"
            />
            <div className="txt mx-auto w-[88%] max-w-[700px] overflow-visible px-4 py-8 lg:py-10">
              <div className="overflow-visible">
                <Copy animateOnScroll>
                  <h2
                    className="m-0 pb-1 text-2xl font-bold leading-[1.25] whitespace-pre-line md:text-3xl lg:!text-[50px]"
                    style={{ color: GOLD }}
                  >
                    {t("s2.title")}
                  </h2>
                </Copy>
              </div>
              <Copy animateOnScroll delay={0.1}>
                <p
                  className="mt-5 m-0 text-sm leading-[2] md:text-base lg:!text-[18px]"
                  style={{ color: GOLD }}
                >
                  {t("s2.body")}
                </p>
              </Copy>
            </div>
          </div>

          <div className="relative min-h-[280px] w-full flex-1 lg:min-h-0 lg:w-[50%]">
            <img
              src={IMAGES.s2Hero}
              alt={t("s2.enTitle")}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Section 4 — ランドマーク */}
      <section
        className="overflow-hidden border-b-2 border-t-2 min-h-[640px] lg:h-screen"
        style={{ backgroundColor: NAVY, borderColor: GOLD }}
      >
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <div
            className="border-b-2 lg:border-b-0 lg:border-r-2"
            style={{ borderColor: GOLD }}
          >
            <img
              src={IMAGES.s4Left}
              alt=""
              className="block h-auto w-full lg:h-screen lg:object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-col">
            <img
              src={IMAGES.s4Right}
              alt=""
              className="w-full"
              loading="lazy"
              decoding="async"
            />
            <div className="txt mx-auto w-[88%] max-w-[700px] overflow-visible px-4 py-8 lg:py-10">
              <div className="overflow-visible">
                <Copy animateOnScroll>
                  <h2
                    className="m-0 pb-1 text-2xl font-bold leading-[1.25] whitespace-pre-line md:text-3xl lg:!text-[50px]"
                    style={{ color: GOLD }}
                  >
                    {t("s4.title")}
                  </h2>
                </Copy>
              </div>
              <Copy animateOnScroll delay={0.1}>
                <p
                  className="mt-5 m-0 text-sm leading-[2] md:text-base lg:!text-[18px]"
                  style={{ color: GOLD }}
                >
                  {t("s4.body")}
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — SHINAGAWA Sta. */}
      <section className="bg-white">
        <div className="relative flex min-h-[640px] flex-col items-center lg:min-h-[95vh] lg:flex-row lg:items-center lg:pl-12 xl:pl-20">
          <div className="relative flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-[30%] lg:px-0 lg:py-0">
            <div className="absolute top-6 left-4 z-10 sm:left-6 lg:top-10 lg:left-[10%]">
              <Copy animateOnScroll>
                <h2
                  className="m-0 text-4xl font-bold text-nowrap sm:text-5xl lg:!text-[102px]"
                  style={{ color: GOLD }}
                >
                  {t("s1.title")}
                </h2>
              </Copy>
            </div>
            <div className="txt relative w-full lg:w-[85%]">
              <div
                className="relative h-[120px] sm:h-[160px] lg:h-[200px]"
                aria-hidden
              />
              <Copy animateOnScroll delay={0.08}>
                <h3 className="m-0 text-xl font-normal leading-snug whitespace-pre-line lg:!text-[32px]">
                  {t("s1.subtitle")}
                </h3>
              </Copy>
              {s1Paragraphs.map((paragraph, index) => (
                <Copy key={index} animateOnScroll delay={0.12 + index * 0.06}>
                  <p
                    className={`m-0 text-base leading-[2] lg:!text-[18px] ${index === 0 ? "mt-5" : "mt-4"}`}
                  >
                    {paragraph}
                  </p>
                </Copy>
              ))}
            </div>
          </div>
          <div className="flex w-full items-center justify-center px-4 pb-12 lg:w-[70%] lg:px-0 lg:pb-0">
            <img
              src={IMAGES.s1Hero}
              alt={t("s1.imageAlt")}
              className="w-full max-w-[1000px] lg:w-[80%]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Section 5 — LOCATION */}
      <section className="relative border-b-2 border-t-2 bg-white" style={{ borderColor: GOLD }}>
        <img
          src={IMAGES.s5Circle}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-0 w-[200px] select-none sm:w-[260px] md:w-[300px] lg:w-[540px]"
        />

        <div className="relative z-10 px-6 py-10 sm:px-10 md:px-16 lg:px-20 xl:px-28">
          <div className="flex min-h-0 flex-col items-center lg:min-h-[95vh] lg:flex-row">
            <div className="flex w-full items-center lg:w-1/2 lg:min-h-[95vh] lg:pl-6 xl:pl-14">
              <div className="txt relative z-10 w-full max-w-[560px] text-left">
                <div
                  className="relative h-[100px] sm:h-[140px] lg:h-[200px]"
                  aria-hidden
                />
                <Copy animateOnScroll>
                  <h2
                    className="m-0 mb-6 text-5xl font-bold text-nowrap sm:text-6xl lg:!text-[122px]"
                    style={{ color: NAVY }}
                  >
                    {t("s5.title")}
                  </h2>
                </Copy>
                <Copy animateOnScroll delay={0.08}>
                  <h3
                    className="m-0 text-xl leading-snug font-normal whitespace-pre-line lg:!text-[32px]"
                    style={{ color: NAVY }}
                  >
                    {t("s5.subtitle")}
                  </h3>
                </Copy>
                <Copy animateOnScroll delay={0.12}>
                  <p
                    className="mt-5 m-0 text-base leading-[2] lg:!text-[18px]"
                    style={{ color: "rgba(13, 65, 123, 0.9)" }}
                  >
                    {t("s5.body")}
                  </p>
                </Copy>
              </div>
            </div>
            <div className="mt-8 flex w-full items-center justify-center px-0 sm:px-4 lg:mt-0 lg:w-1/2 lg:px-8">
              <img
                src={IMAGES.s5Map}
                alt={t("s5.title")}
                className="w-full max-w-[900px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="pt-8 pb-12 lg:pb-16">
            <Copy animateOnScroll>
              <p
                className="m-0 mb-6 text-sm font-semibold tracking-[0.2em] md:mb-8 md:text-base"
                style={{ color: NAVY }}
              >
                {t("s5.lifeInfoTitle")}
              </p>
            </Copy>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-8">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex flex-col gap-6 lg:gap-8">
                  {[0, 1].map((row) => {
                    const index = col + row * 3;
                    const item = lifeItems[index];
                    return (
                      <Copy
                        key={item.name}
                        animateOnScroll
                        delay={index * 0.05}
                      >
                        <div className="flex min-w-0 items-baseline gap-2">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium text-white"
                            style={{ backgroundColor: NAVY }}
                          >
                            {index + 1}
                          </span>
                          <span
                            className="shrink-0 text-[12px] tracking-wide sm:text-[13px]"
                            style={{ color: NAVY }}
                          >
                            {item.name}
                          </span>
                          <span
                            className="mx-1 min-w-[8px] flex-1 translate-y-[-3px] border-b border-dotted border-[#0d417b]/50"
                            aria-hidden
                          />
                          <span
                            className="shrink-0 text-[11px] tracking-wide whitespace-nowrap sm:text-[12px]"
                            style={{ color: NAVY }}
                          >
                            {item.time} / {item.distance}
                          </span>
                        </div>
                      </Copy>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — KEIO University */}
      <section
        id="keio"
        className="overflow-hidden border-b-2 min-h-[640px] lg:h-screen scroll-mt-24"
        style={{ backgroundColor: NAVY, borderColor: GOLD }}
      >
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-center justify-center px-6 py-14 lg:py-0">
            <div
              className="absolute top-0 left-0 z-0 h-[240px] w-[240px] sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px]"
              style={{ backgroundColor: "#f12d26" }}
              aria-hidden
            />
            <div className="txt relative z-10 mx-auto w-[88%] max-w-[700px]">
              <Copy animateOnScroll>
                <h2
                  className="m-0 text-5xl font-bold leading-none sm:text-6xl lg:!text-[130px]"
                  style={{ color: GOLD }}
                >
                  {t("s3.titleKeio")}
                </h2>
              </Copy>
              <Copy animateOnScroll delay={0.06}>
                <h2
                  className="m-0 text-2xl font-bold md:text-3xl lg:!text-[50px]"
                  style={{ color: GOLD }}
                >
                  {t("s3.titleUniversity")}
                </h2>
              </Copy>
              <Copy animateOnScroll delay={0.1}>
                <h3
                  className="mt-4 m-0 text-xl font-bold leading-snug whitespace-pre-line lg:!text-[30px]"
                  style={{ color: GOLD }}
                >
                  {t("s3.heading")}
                </h3>
              </Copy>
              <Copy animateOnScroll delay={0.14}>
                <p
                  className="mt-5 m-0 text-sm leading-[2] md:text-base lg:!text-[18px]"
                  style={{ color: GOLD }}
                >
                  {t("s3.quote")}
                </p>
              </Copy>
              <Copy animateOnScroll delay={0.18}>
                <p
                  className="mt-4 m-0 text-sm leading-[2] md:text-base lg:!text-[18px]"
                  style={{ color: GOLD }}
                >
                  {t("s3.body")}
                </p>
              </Copy>
            </div>
          </div>
          <div
            className="relative min-h-[320px] border-t-2 lg:min-h-0 lg:border-t-0 lg:border-l-2"
            style={{ borderColor: GOLD }}
          >
            <img
              src={IMAGES.s3Hero}
              alt={t("s3.title")}
              className="h-[320px] w-full object-cover lg:absolute lg:inset-0 lg:h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
