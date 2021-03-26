interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface ChromeOptions {
  content: string,
}

type ChromeLaunchOptions = import('puppeteer-core').LaunchOptions & import('puppeteer-core').BrowserLaunchArgumentOptions & import('puppeteer-core').BrowserConnectOptions;
