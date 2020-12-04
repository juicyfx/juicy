import { requestPackagist } from "./http";

export async function fetchVendorStats(vendor: string): Promise<PackagistVendorStats> {
  const org = vendor.split(' ').join('+');
  const res = await requestPackagist({ url: `https://packagist.now.sh/stats/${org}/`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Vendor errored`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}
