import { launch, Browser, LaunchOptions } from "puppeteer-core";
import chromeAws from "chrome-aws-lambda";
import { isDev } from "./utils";

export async function createBrowser(): Promise<Browser> {
  const defaults: LaunchOptions = {
    defaultViewport: {
      deviceScaleFactor: 1,
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

  // Extra fonts
  chromeAws.font('https://rawcdn.githack.com/rsms/inter/164e01df21ecb9e7122c33d321fb9e9ccb2d5bb4/docs/font-files/Inter-Regular.woff2');

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
