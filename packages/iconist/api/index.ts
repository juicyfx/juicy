import { NowRequest, NowResponse } from '@now/node';
import { generate } from './_lib/manager';
import { clamp, isEmpty } from './_lib/utils';

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url, req.query);

  try {
    const spec = !isEmpty(req.query['spec']) ? <string>req.query['spec'] : null;
    const color = !isEmpty(req.query['color']) ? <string>req.query['color'] : null;
    const size = !isEmpty(req.query['size']) ? <string>req.query['size'] : 32;
    const stroke = !isEmpty(req.query['stroke']) ? parseInt(<string>req.query['stroke']) : null;

    const iconReq: GenerateRequest = {
      vendor: <string>req.query.vendor as Vendor,
      icon: <string>req.query.icon,
      size: clamp(16, size, 512),
      spec,
      color,
      stroke
    };

    // Generate SVG icon by given requirements
    const icon = await generate(iconReq)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.end(icon);
  } catch (e) {
    console.error(e);

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(typeof e === 'string' ? e : e.message);
  }
}
