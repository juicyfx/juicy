interface PageContext {
  page: string,
  tabs: string,
  width: number,
  height: number,
}

interface ChromeOptions {
  content: string,
  wait?: number
}

type ChromeLaunchOptions = import('puppeteer-core').LaunchOptions & import('puppeteer-core').BrowserLaunchArgumentOptions & import('puppeteer-core').BrowserConnectOptions;
