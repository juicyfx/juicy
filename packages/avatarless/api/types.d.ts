interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface GravatarPipe {
  fallback: boolean
}

interface GravatarOptions {
  email: string,
  size: number,
  default: string
}

interface AvatarlessOptions {
  text: string | undefined,
  size: number,
  bgColor: string,
  textColor: string
  textSize: number,
}
