import { NowRequest, NowResponse } from '@now/node';
import QRCode from 'qrcode';
import * as errors from './_lib/errors';
import { applyCors } from './_lib/http';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  // Apply HTTP middlewares
  applyCors(req, res);

  if (req.query.t) {
    try {
      // Generate QR-code from given URL params
      const url = await QRCode.toDataURL(
        Array.isArray(req.query.t) ? req.query.t.join('') : req.query.t,
        { margin: 0, width: 512 }
      );

      // Set image headers
      res.setHeader('Content-Type', 'image/png')
      res.send(Buffer.from(url.split(",")[1], 'base64'));
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(e);
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(errors.USAGE);
  }
}
