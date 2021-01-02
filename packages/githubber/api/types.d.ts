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

interface ReadmeNotes {
  owner: string,
  repo: string,
  composer: Composer.Composer,
  versions: ReadmeVersion[],
}

interface ReadmeAuthor {
  username: string,
}

interface ReadmeVersion {
  State: string,
  Version: string,
  Branch: string,
  Nette: string,
  PHP: string,
}

interface FlowPipe<T> {
  (data: FlowData<T>): Promise<void> | void
}

interface FlowCatcher<T> {
  (data: FlowData<T>, error: FlowError): Promise<void> | void
}

interface FlowData<T> {
  req: import('@vercel/node').NowRequest,
  res: import('@vercel/node').NowResponse,
  app: FlowApp,
  ctx: T,
}

interface FlowError {
  exception: any
}

interface FlowApp {
  json(code: number, data: any): void
}
