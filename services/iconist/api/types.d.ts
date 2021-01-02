declare const enum Vendor {
  fontawesome = 'fontawesome',
  heroicons = 'heroicons',
  feathericons = 'feathericons',
  linearicons = 'linearicons',
  dripicons = 'dripicons',
  lineawesome = 'lineawesome',
  ikonate = 'ikonate',
  remixicon = 'remixicon',
  twemoji = 'twemoji',
  emojitwo = 'emojitwo',
  notoemoji = 'notoemoji',
  openmoji = 'openmoji',
  svgporn = 'svgporn'
}

interface GenerateRequest {
  vendor: Vendor,
  icon: string,
  size: number,
  spec: string | null,
  color: string | null,
  stroke: number | null,
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
