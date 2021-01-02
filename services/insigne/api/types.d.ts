interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface GithubberUnreleased {
  unreleased: number,
}

interface Badgen {
  subject: string,
  status: string,
  color: string,
}

interface PackagistVendorStats {
  downloads: {
    daily: number,
    monthly: number,
    total: number,
  }
}
