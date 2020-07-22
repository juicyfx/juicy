interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}
