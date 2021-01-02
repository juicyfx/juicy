import { NowRequest, NowResponse } from '@now/node';
import { isEmpty, getOrigin } from './_lib/utils';
import { VENDORS } from './_lib/app';
import { browse } from './_lib/handler/browse-handler';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url, req.query);

  res.setHeader("Content-Type", "application/json");

  if (isEmpty(req.query['vendor'])) {
    res.end(
      JSON.stringify(
        {
          vendors: VENDORS.map(v => ({
            name: v,
            url: `${getOrigin(req)}/_/?vendor=${v}`
          }))
        }
      )
    );
  } else {
    res.end(
      JSON.stringify(
        await browse({
          url: getOrigin(req),
          vendor: <string>req.query['vendor'] as Vendor,
        })
      )
    );
  }
}
