import * as fontawesome from "../vendor/fontawesome";
import * as heroicons from "../vendor/heroicons";
import * as feathericons from "../vendor/feathericons";
import * as linearicons from "../vendor/linearicons";
import * as dripicons from "../vendor/dripicons";
import * as lineawesome from "../vendor/lineawesome";
import * as ikonate from "../vendor/ikonate";
import * as remixicon from "../vendor/remixicon";
import * as twemoji from "../vendor/twemoji";
import * as emojitwo from "../vendor/emojitwo";
import * as notoemoji from "../vendor/notoemoji";
import * as openmoji from "../vendor/openmoji";
import * as svgporn from "../vendor/svgporn";

export function generate(req: GenerateRequest): Promise<string> {
  if (req.vendor === Vendor.fontawesome) {
    return fontawesome.generate(req);
  }

  if (req.vendor === Vendor.heroicons) {
    return heroicons.generate(req);
  }

  if (req.vendor === Vendor.feathericons) {
    return feathericons.generate(req);
  }

  if (req.vendor === Vendor.linearicons) {
    return linearicons.generate(req);
  }

  if (req.vendor === Vendor.dripicons) {
    return dripicons.generate(req);
  }

  if (req.vendor === Vendor.lineawesome) {
    return lineawesome.generate(req);
  }

  if (req.vendor === Vendor.ikonate) {
    return ikonate.generate(req);
  }

  if (req.vendor === Vendor.remixicon) {
    return remixicon.generate(req);
  }

  if (req.vendor === Vendor.twemoji) {
    return twemoji.generate(req);
  }

  if (req.vendor === Vendor.emojitwo) {
    return emojitwo.generate(req);
  }

  if (req.vendor === Vendor.notoemoji) {
    return notoemoji.generate(req);
  }

  if (req.vendor === Vendor.openmoji) {
    return openmoji.generate(req);
  }

  if (req.vendor === Vendor.svgporn) {
    return svgporn.generate(req);
  }

  throw `Unknown icon vendor ${req.vendor}`;
}
