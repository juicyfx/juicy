type Vendor =
  'fontawesome' |
  'heroicons' |
  'feathericons' |
  'linearicons' |
  'dripicons' |
  'lineawesome' |
  'ikonate' |
  'remixicon' |
  'twemoji' |
  'notoemoji' |
  'openmoji';

interface IconRequest {
  vendor: Vendor,
  icon: string,
  size: number,
  spec: string | null,
  color: string | null,
  stroke: number | null,
}
