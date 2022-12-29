import fs from "fs";
import { VercelRequest } from '@vercel/node';

export async function fallback(req: VercelRequest): Promise<Buffer> {
  const icon = parseInt((<string>req.query['fallback']) || '1');

  return fs.promises.readFile(`${__dirname}/../../_misc/fallback${icon}.svg`);
}
