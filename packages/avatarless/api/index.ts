import { NowRequest, NowResponse } from '@now/node';
import * as errors from './_lib/errors';
import { pipeLogging, pipeCOORS } from './_lib/pipes';

export default async function handler(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    // Log everything
    pipeLogging(req, res);

    // Apply COORS
    pipeCOORS(req, res);

    // Send global usage
    res.end(errors.USAGE);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(e);
  }
}
