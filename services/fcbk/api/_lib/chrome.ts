import { LaunchOptions } from "puppeteer-core";
import { createBrowser } from "./chromium";

export async function getImage(source: string, browserOptions: LaunchOptions = {}, chromeOptions: ChromeOptions = {}): Promise<string> {
  let content = null;
  let browser = null;
  let page = null;

  try {
    browser = await createBrowser(browserOptions);
    page = await browser.newPage();
    await page.setContent(source);

    if (chromeOptions.wait) {
      await page.waitForTimeout(chromeOptions.wait);
    }

    content = await page.screenshot();
  } catch (error) {
    throw error;
  } finally {
    if (page !== null) {
      await page.close();
    }
    if (browser !== null) {
      await browser.close();
    }
  }

  return content;
}

