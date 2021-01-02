interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface PackagistPackage {
  package: {
    downloads: {
      daily: number,
      monthly: number,
      total: number,
    }
  }
}

interface PackagistVendorList {
  packageNames: string[]
}

interface PackagistVendorStats {
  downloads: {
    daily: number,
    monthly: number,
    total: number,
  }
}
