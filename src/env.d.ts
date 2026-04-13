/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  gtag_report_conversion?: (url?: string) => boolean;
}
