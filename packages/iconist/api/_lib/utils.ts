import fs from "fs";
import util from "util";
import fg from "fast-glob";
import { NowRequest } from "@now/node";

export const readFile = util.promisify(fs.readFile);

export function isDev(): boolean {
  return process.env.NOW_REGION === undefined || process.env.NOW_REGION === 'dev1';
}

export function clamp(min: number, num: number | string, max: number): number {
  return Math.min(max, Math.max(min, typeof num === 'number' ? num : parseInt(num)));
}

export function isEmpty(str: string | string[]): boolean {
  return !!str === false;
}

export function capitalize(str: any): string {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowercase(str: any): string {
  if (typeof str !== 'string') return '';
  return str.toLowerCase();
}

export async function readPackage(pattern: string, cwd: string): Promise<string[]> {
  return await fg([pattern], { dot: false, onlyFiles: true, cwd });
}

export function getOrigin(req: NowRequest): string {
  if (req.headers['x-now-deployment-url']) {
    return <string>req.headers['x-now-deployment-url'];
  }

  return '/';
}
