import { NowRequest } from "@vercel/node";

export function queryNumber(req: NowRequest, key: string, defaults: any): number {
  return parseInt(<string>req.query[key] || defaults);
}
