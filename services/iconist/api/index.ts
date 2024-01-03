import { VercelRequest, VercelResponse } from '@vercel/node';
import { generate } from './_lib/handler/generate-handler';
import { clamp, isEmpty } from './_lib/utils';
import { NotFoundError } from './_lib/errors';
import { errorDefault, errorNotFound } from './_lib/handler/error-handler';
import { Vendor } from './_lib/app';

const CACHE_BROWSER = 60 * 60 * 24 * 14; // 14 days
const CACHE_CDN = 60 * 60 * 24 * 20; // 20 days

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url, req.query);

  try {
    const spec = !isEmpty(req.query['spec']) ? <string>req.query['spec'] : null;
    const color = !isEmpty(req.query['color']) ? <string>req.query['color'] : null;
    const size = !isEmpty(req.query['size']) ? <string>req.query['size'] : 32;
    const stroke = !isEmpty(req.query['stroke']) ? parseInt(<string>req.query['stroke']) : null;
    const style = !isEmpty(req.query['style']) ? <string>req.query['style'] : null;

    const iconReq: GenerateRequest = {
      vendor: <string>req.query.vendor as Vendor,
      icon: <string>req.query.icon,
      size: clamp(16, size, 512),
      spec,
      color,
      stroke,
      style
    };

    // Generate SVG icon by given requirements
    const icon = await generate(iconReq)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.end(icon);
  } catch (e: unknown) {
    if (e instanceof NotFoundError) {
      await errorNotFound(req, res, e);
    } else {
      errorDefault(req, res, e);
    }
  }
}
