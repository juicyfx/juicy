interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface ReleaseNotes {
  owner: string,
  repo: string,
  base: string,
  head: string,
  changes: string[],
}
