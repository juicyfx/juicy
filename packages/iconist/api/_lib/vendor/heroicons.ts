import cheerio from "cheerio";
import path from "path";
import { readFile, lowercase, readPackage } from "../utils";

export async function generate(req: GenerateRequest): Promise<string> {
  try {
    // Read icon file
    var file = await readFile(path.resolve('node_modules', `@obr/heroicons/dist/${lowercase(req.spec)}/${req.icon}.svg`));
  } catch (e) {
    throw `Heroicon ${req.spec}/${req.icon}.svg not found`;
  }

  // Parse SVG to AST
  const $ = cheerio.load(file.toString('utf-8'));
  const $svg = $('svg');

  // Update attributes
  $svg.attr('xmlns', 'http://www.w3.org/2000/svg');

  if (req.color) {
    $svg.attr('color', `#${req.color}`);
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
    .map(i => {
      const parsed = path.parse(i);
      return parsed.dir + path.sep + parsed.name;
    })
    .map(i => `${req.url}/hero/${i}`);

  return {
    vendor: req.vendor,
    count: icons.length,
    icons
  }
}
