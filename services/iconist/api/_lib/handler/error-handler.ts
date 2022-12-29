import { VercelRequest, VercelResponse } from '@vercel/node';
import { NotFoundError } from "../errors";
import { fallback } from "./fallback-handler";

export function errorDefault(_req: VercelRequest, res: VercelResponse, error: any): void {
  console.error(error);

  res.statusCode = 500;
  res.setHeader("Content-Type", "text/html");
  res.end(typeof error === 'string' ? error : error.message);
}

export async function errorNotFound(req: VercelRequest, res: VercelResponse, error: NotFoundError): Promise<void> {
  console.error(error);

  if (req.query['strict']) {
    errorDefault(req, res, `Icon ${error.icon} in ${error.message} not found`);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(await fallback(req));
  }
}
