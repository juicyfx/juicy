import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(req: NowRequest, res: NowResponse) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');
  res.statusCode = 200;

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    res.end('Corsless Juicy(fx) by f3l1x.io');
  }
}
