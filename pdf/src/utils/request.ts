import { IncomingMessage } from "http";

export function parseRequest(req: IncomingMessage): Promise<PostRequest> {
    return new Promise((resolve) => {
        let body: string = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            resolve(JSON.parse(body));
        });
    })
}