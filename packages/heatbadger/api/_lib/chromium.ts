import { launch, Browser, LaunchOptions } from "puppeteer-core";
import chromeAws from "chrome-aws-lambda";
import { isDev } from "./utils";

export async function createBrowser(): Promise<Browser> {
  const defaults: LaunchOptions = {
    defaultViewport: {
      deviceScaleFactor: 2,
      hasTouch: false,
      width: 900,
      height: 350,
      isLandscape: true,
      isMobile: false,
    }
  };
  let options: LaunchOptions = {};

  if (isDev()) {
    options = {
      ...defaults,
      ...{
        args: [],
        executablePath: lookupChrome(),
        headless: true,
      }
    };
  } else {
    options = {
      ...defaults,
      ...{
        args: chromeAws.args,
        executablePath: await chromeAws.executablePath,
        headless: chromeAws.headless,
      }
    };
  }

  return await launch(options);
}

function lookupChrome(): string {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  }

  if (process.platform === 'darwin') {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }

  return 'google-chrome';
}
