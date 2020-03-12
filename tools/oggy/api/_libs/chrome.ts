import { createBrowser } from "./chromium";

export async function getScreenshot(source: string, type: FileType): Promise<Buffer> {
  let content = null;
  let browser = null;
  let page = null;

  try {
    browser = await createBrowser();
    page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(source);
    content = await page.screenshot({ type });
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
