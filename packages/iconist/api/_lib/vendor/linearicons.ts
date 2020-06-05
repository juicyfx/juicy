import cheerio from "cheerio";
import path from "path";
import { readFile } from "../utils";

export async function generate(req: IconRequest): Promise<string> {
  try {
    // Read icon file
    var file = await readFile(path.resolve('node_modules', `@obr/linearicons/dist/${req.icon}.svg`));
  } catch (e) {
    throw `Linearicon ${req.icon}.svg not found`;
  }

  // Parse SVG to AST
  const $ = cheerio.load(file.toString('utf-8'));
  const $svg = $('svg');

  // Update attributes
  $svg.attr('xmlns', 'http://www.w3.org/2000/svg');
  $svg.removeAttr('xlink');
  $svg.removeAttr('version');

  if (req.color) {
    $svg.attr('color', `#${req.color}`);
    $svg.attr('fill', `#${req.color}`);
  }

  $svg.attr('width', String(req.size));
  $svg.attr('height', String(req.size));

  // Update inner structure
  $svg.find('path').map((_index: number, el: CheerioElement) => {
    el.attribs['fill'] = 'currentColor';

    return el;
  });

  // Export icon
  const svg = $.html('svg');

  return svg;
}
