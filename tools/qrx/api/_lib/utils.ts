import { NowRequest } from '@now/node';
import { QRCodeToDataURLOptions } from 'qrcode';

export function parseOptions(req: NowRequest): QRCodeToDataURLOptions {
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
