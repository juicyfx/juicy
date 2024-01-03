import { NowRequest, NowResponse } from '@vercel/node';
import { pipeLogging, pipeCORS } from './_lib/pipes';

export default async function handler(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    // Log everything
    pipeLogging(req, res);

    // Apply COORS
    pipeCORS(req, res);

    // Send global usage
    res.statusCode = 302;
    res.setHeader('Location', 'https://avatarless.vercel.app/');
    res.end();
  } catch (e: unknown) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(e);
  }
}
