import { request } from "./http";

export async function fetchPackage(vendor: string, pkg: string): Promise<PackagistPackage> {
  const res = await request({ url: `https://packagist.org/packages/${vendor}/${pkg}.json`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Package ${vendor}/${pkg} not found`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}

export async function fetchVendors(vendors: string[]): Promise<PackagistVendorStats> {
  const responses = await Promise.all(
    vendors.map(v => {
      return fetchVendor(v)
    })
  );

  const stats = responses.reduce<PackagistVendorStats>((acc, res) => {
    acc.downloads.daily += res.downloads.daily;
    acc.downloads.monthly += res.downloads.monthly;
    acc.downloads.total += res.downloads.total;

    return acc;
  }, {
    downloads: {
      daily: 0,
      monthly: 0,
      total: 0
    }
  });

  return stats;
}

export async function fetchVendor(vendor: string): Promise<PackagistVendorStats> {
  const packages = await listVendor(vendor);

  const requests = packages.packageNames.map(name => {
    const [org, pkg] = name.split('/');
    return fetchPackage(org, pkg);
  });

  const responses = await Promise.all(requests);

  const stats = responses.reduce<PackagistVendorStats>((acc, res) => {
    acc.downloads.daily += res.package.downloads.daily;
    acc.downloads.monthly += res.package.downloads.monthly;
    acc.downloads.total += res.package.downloads.total;

    return acc;
  }, {
    downloads: {
      daily: 0,
      monthly: 0,
      total: 0
    }
  });

  return stats;
}

export async function listVendor(vendor: string): Promise<PackagistVendorList> {
  const res = await request({ url: `https://packagist.org/packages/list.json?vendor=${vendor}`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Vendor ${vendor} not found`);
  }

  const data: PackagistVendorList = JSON.parse(res.data.toString('utf-8'));

  data.packageNames = patchVendorList(vendor, data.packageNames);

  return data;
}

function patchVendorList(vendor: string, list: string[]): string[] {
  if (vendor === 'contributte') {
    list.push('ublaboo/datagrid');
  }

  return list;
}
