import chromeAws from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const OPTIONS_DEFAULTS: PdfOptions = {
  format: 'A4'
};

export async function getPdf(source: PdfSource, options: PdfOptions): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: chromeAws.args,
    executablePath: await chromeAws.executablePath,
    headless: chromeAws.headless
  });

  const page = await browser.newPage();

  if (source.url) {
    await page.goto(source.url, { waitUntil: "networkidle0" });
  } else if (source.raw) {
    await page.setContent(source.raw, { waitUntil: "networkidle0" });
  } else {
    throw Error("Unsupported source");
  }

  await page.emulateMediaType("screen");

  const content = await page.pdf({
    ...OPTIONS_DEFAULTS,
    ...options
  });

  return content;
}
