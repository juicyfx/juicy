import chromeAws from "chrome-aws-lambda";
const puppeteer = chromeAws.puppeteer as any;

export async function getPdf(source: PdfSource, options: object) {
  const browser = await puppeteer.launch({
    args: chromeAws.args,
    executablePath: await chromeAws.executablePath,
    headless: true
  });

  const page = await browser.newPage();

  if (source.url) {
    await page.goto(source.url, { waitUntil: "networkidle0" });
  } else if (source.raw) {
    await page.setContent(source.raw);
  } else {
    throw Error("Unsupported source");
  }

  await page.emulateMedia("screen");
  const content = await page.pdf({
    format: "A4",
    ...options
  });

  await browser.close();
  return content;
}
