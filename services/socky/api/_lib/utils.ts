import { VercelRequest } from "@vercel/node";

export function queryNumber(req: VercelRequest, key: string, defaults: any): number {
  return parseInt(<string>req.query[key] || defaults);
}
