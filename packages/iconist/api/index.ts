import { NowRequest, NowResponse } from '@now/node';
import { generate } from './_lib/generator';
import { clamp, isEmpty } from './_lib/utils';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url, req.query);

  try {
    const spec = !isEmpty(req.query['spec']) ? <string>req.query['spec'] : null;
    const color = !isEmpty(req.query['color']) ? <string>req.query['color'] : null;
    const size = !isEmpty(req.query['size']) ? <string>req.query['size'] : 32;
    const stroke = !isEmpty(req.query['stroke']) ? parseInt(<string>req.query['stroke']) : null;

    const iconReq: IconRequest = {
      vendor: <Vendor>req.query.vendor,
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
    res.setHeader('Cache-Control', `max-age=${60 * 60 * 24}, s-maxage=${60 * 60 * 24}, public`);
    res.end(icon);
  } catch (e) {
    console.error(e);

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(typeof e === 'string' ? e : e.message);
  }
}
