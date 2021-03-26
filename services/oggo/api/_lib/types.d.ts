interface ChromeOptions {
  content: string,
}

type ChromeLaunchOptions = import('puppeteer-core').LaunchOptions & import('puppeteer-core').BrowserLaunchArgumentOptions & import('puppeteer-core').BrowserConnectOptions;
