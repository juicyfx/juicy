import cheerio from "cheerio";
import path from "path";
import { readFile } from "../utils";

export async function generate(req: IconRequest): Promise<string> {
  try {
    // Read icon file
    var file = await readFile(path.resolve('node_modules', `ikonate/icons/${req.icon}.svg`));
  } catch (e) {
    throw `Ikonate ${req.icon}.svg not found`;
  }

  // Parse SVG to AST
  const $ = cheerio.load(file.toString('utf-8'));
  const $svg = $('svg');

  // Update attributes
  $svg.removeAttr('role');
  $svg.removeAttr('aria-labelledby');

  if (req.color) {
    $svg.attr('color', `#${req.color}`);
    $svg.attr('fill', `#${req.color}`);
  }

  $svg.attr('width', String(req.size));
  $svg.attr('height', String(req.size));

  // Update inner structure
  // $svg.remove('title');

  // Export icon
  const svg = $.html('svg');

  return svg;
}
