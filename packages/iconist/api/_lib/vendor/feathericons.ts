import feather, { FeatherAttributes } from "feather-icons";

export async function generate(req: IconRequest): Promise<string> {
  if (!feather.icons[req.icon]) {
    throw `Feathericon ${req.icon} not found`;
  }

  // Load icon
  const icon = feather.icons[req.icon];

  // Update attrs
  const attrs: FeatherAttributes = {
    'stroke-width': req.stroke || 2,
    'width': req.size,
    'height': req.size,
  };

  if (req.color) {
    attrs['color'] = `#${req.color}`;
  }

  // Export icon
  const svg = icon.toSvg(attrs);

  return svg;
}
