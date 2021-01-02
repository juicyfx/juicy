import fs from "fs";
import { NowRequest } from "@now/node";

export async function fallback(req: NowRequest): Promise<Buffer> {
  const icon = parseInt((<string>req.query['fallback']) || '1');

  return fs.promises.readFile(`${__dirname}/../../_misc/fallback${icon}.svg`);
}
