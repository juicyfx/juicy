import { NowRequest, NowResponse } from '@now/node';

export function applyCors(req: NowRequest, res: NowResponse): void {
  // Optimistic CORS
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }
}
