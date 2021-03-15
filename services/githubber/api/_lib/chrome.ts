import { createBrowser } from "./chromium";

export async function getImage(chromeOptions: ChromeOptions, browserOptions: ChromeLaunchOptions = {}): Promise<Buffer> {
  let content = null;
  let browser = null;
  let page = null;

  try {
    browser = await createBrowser(browserOptions);
    page = await browser.newPage();

    if (chromeOptions.content) {
      await page.setContent(chromeOptions.content);
    } else if (chromeOptions.url) {
      await page.goto(chromeOptions.url);
    } else {
      console.error('Missing url or content');
      process.exit(255);
    }

    if (chromeOptions.wait) {
      await page.waitForTimeout(chromeOptions.wait);
    }

    if (chromeOptions.el) {
      const el = await page.$(chromeOptions.el);
      if (!el) {
        console.error(`No element ${chromeOptions.el} found`);
        process.exit(255);
      }

      content = await el.screenshot();
    } else {
      content = await page.screenshot();
    }

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

  if (Buffer.isBuffer(content)) {
    return content;
  } else {
    return Buffer.from(content as string);
  }
}

