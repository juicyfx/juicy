import type { Vendor } from "./_lib/app";

declare global {
  interface GenerateRequest {
    vendor: Vendor,
    icon: string,
    size: number,
    spec: string | null,
    color: string | null,
    stroke: number | null,
    style: string | null,
  }

  interface BrowseRequest {
    vendor: Vendor,
    url: string,
  }

  interface BrowseResponse {
    vendor: Vendor,
    count: number,
    icons: string[],
  }
}
