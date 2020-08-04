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

export function browse(req: BrowseRequest): Promise<BrowseResponse> {
  if (req.vendor === Vendor.fontawesome) {
    return fontawesome.browse(req);
  }

  if (req.vendor === Vendor.heroicons) {
    return heroicons.browse(req);
  }

  if (req.vendor === Vendor.feathericons) {
    return feathericons.browse(req);
  }

  if (req.vendor === Vendor.linearicons) {
    return linearicons.browse(req);
  }

  if (req.vendor === Vendor.dripicons) {
    return dripicons.browse(req);
  }

  if (req.vendor === Vendor.lineawesome) {
    return lineawesome.browse(req);
  }

  if (req.vendor === Vendor.ikonate) {
    return ikonate.browse(req);
  }

  if (req.vendor === Vendor.remixicon) {
    return remixicon.browse(req);
  }

  if (req.vendor === Vendor.twemoji) {
    return twemoji.browse(req);
  }

  if (req.vendor === Vendor.emojitwo) {
    return emojitwo.browse(req);
  }

  if (req.vendor === Vendor.notoemoji) {
    return notoemoji.browse(req);
  }

  if (req.vendor === Vendor.openmoji) {
    return openmoji.browse(req);
  }

  if (req.vendor === Vendor.svgporn) {
    return svgporn.browse(req);
  }

  throw `Unknown icon vendor ${req.vendor}`;
}
