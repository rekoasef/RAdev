export const GA_ID = "G-FBZB2DEMFR";

export const track = (
  event: string,
  params?: Record<string, any>
) => {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, {
    page: window.location.pathname,
    ...params,
  });
};