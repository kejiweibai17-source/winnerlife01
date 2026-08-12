/** Shared Lenis / native smooth scroll to an element id */
export function scrollToElementId(
  id: string,
  lenis: { scrollTo: (target: HTMLElement | number | string, opts?: object) => void } | null | undefined,
  options: { offset?: number; duration?: number } = {}
) {
  const el = document.getElementById(id);
  if (!el) return false;

  const offset = options.offset ?? -96;
  const duration = options.duration ?? 1.2;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  return true;
}

export const CONTACT_FORM_ID = "contact-form";
