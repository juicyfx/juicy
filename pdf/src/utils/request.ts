import { IncomingMessage } from "http";

export function parseRequest(req: IncomingMessage): Promise<string> {
  return new Promise(resolve => {
    let body: string = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
  });
}
export function parseJsonRequest(req: IncomingMessage): Promise<PostRequest> {
  return new Promise(resolve => {
    let body: string = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(JSON.parse(body));
    });
  });
}
