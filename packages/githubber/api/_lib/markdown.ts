import { MemoryStream } from "./streams";
import consola from "console";

export function generateTable(data: any[]): string {
  const memory = new MemoryStream();
  const logger = new consola.Console({ stdout: memory });

  logger.table(data);

  return memory
    .toBuffer()
    .toString()
    .trim()
    .split("\n")
    .slice(1, -1)
    .join("\n")
    .replace(/^[┌|│|├|└][^┬|│|┼|┴]+/gm, '')
    .replace(/(┬|┐|┼|┴|┘|┤|│)/gm, '|')
    .replace(/(─)/gm, '-')
    .replace(/(|\s+)'(.+?)'(|\s+)/gm, '$1 $2 $3')
}
