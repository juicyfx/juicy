import chromeAws from "chrome-aws-lambda";
const puppeteer = chromeAws.puppeteer as any;

export async function getScreenshot(url, type, quality, fullPage) {
  const browser = await puppeteer.launch({
    args: chromeAws.args,
    executablePath: await chromeAws.executablePath,
    headless: chromeAws.headless
  });

  const page = await browser.newPage();
  await page.goto(url);
  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  return file;
}
