import cheerio from "cheerio";
import path from "path";
import { readFile, readPackage } from "../utils";
import { NotFoundError } from "../errors";
import { Vendor } from "../app";

export async function generate(req: GenerateRequest): Promise<string> {
  try {
    // Read icon file
    var file = await readFile(path.resolve('node_modules', `@obr/lineawesome/dist/${req.icon}.svg`));
  } catch (e: unknown) {
    throw new NotFoundError(Vendor.lineawesome, req.icon);
  }

  // Parse SVG to AST
  const $ = cheerio.load(file.toString('utf-8'));
  const $svg = $('svg');

  // Update attributes
  if (req.color) {
    $svg.attr('color', `#${req.color}`);
    $svg.attr('fill', `#${req.color}`);
  }

  $svg.attr('width', String(req.size));
  $svg.attr('height', String(req.size));

  // Export icon
  const svg = $.html('svg');

  return svg;
}

export async function browse(req: BrowseRequest): Promise<BrowseResponse> {
  const pkg = path.resolve('node_modules', `@obr/${req.vendor}`);
  const files = await readPackage(`**/*.svg`, `${pkg}/dist`);

  const icons = files
    .map(i => path.parse(i).name)
    .map(i => `${req.url}/line/${i}`);

  return {
    vendor: req.vendor,
    count: icons.length,
    icons
  }
}
