interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface Badgen {
  subject: string,
  status: string,
  color: string,
}

interface Hit {
  id: string,
  hits: number,
}

interface TemplateOptions {
  title: string,
  value: string,
  color: string,
}
