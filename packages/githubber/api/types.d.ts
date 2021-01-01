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
