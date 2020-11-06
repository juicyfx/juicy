import { NowRequest, NowResponse } from '@now/node';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  // Apply optimistic CORS
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return
  }

  if (req.query.t) {
    try {
      // Generate QR-code from given URL params
      const url = await QRCode.toDataURL(
        Array.isArray(req.query.t) ? req.query.t.join('') : req.query.t,
        parseOptions(req)
      );

      // Set image headers
      res.setHeader('Content-Type', 'image/png')
      res.send(Buffer.from(url.split(",")[1], 'base64'));
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(JSON.stringify({ message: e.message, code: e.code }));
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end('Invalid usage, take a look at readme');
  }
}

function parseOptions(req: NowRequest): QRCodeToDataURLOptions {
  const options: QRCodeToDataURLOptions = { width: 256, margin: 0 };
  const query = req.query as { [key: string]: string };

  if (query.width) {
    options.width = Number.parseInt(query.width);
  }

  if (query.margin) {
    options.margin = Number.parseInt(query.margin);
  }

  if (query.scale) {
    options.scale = Number.parseInt(query.scale);
  }

  if (query.colorDark) {
    options.color = options.color || {};
    options.color.dark = query.colorDark;
  }

  if (query.colorLight) {
    options.color = options.color || {};
    options.color.light = query.colorLight;
  }

  return options;
}
