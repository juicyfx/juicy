interface FacebookPageContext {
  page: string,
  tabs: string,
  theme: string,
  width: number,
  height: number,
}
interface TwitterProfileContext {
  profile: string,
  theme: string,
  width: number,
  height: number,
}

interface ChromeOptions {
  content: string,
  wait?: number
}

type ChromeLaunchOptions = import('puppeteer-core').LaunchOptions & import('puppeteer-core').BrowserLaunchArgumentOptions & import('puppeteer-core').BrowserConnectOptions;
