import { createBrowser } from "./chromium";

export async function getImage(source: string): Promise<string> {
  let content = null;
  let browser = null;
  let page = null;

  try {
    browser = await createBrowser();
    page = await browser.newPage();
    await page.setContent(source);

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
