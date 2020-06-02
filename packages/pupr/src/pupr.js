import { parse } from 'url';
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const IS_DEV = process.env.NOW_REGION === "dev1";
const CHROME_LOCAL = process.platform === 'win32'
  ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TIMEOUT = 10000;

export default async function handler(req, res) {
  try {
    const { query = {} } = parse(req.url || "", true);

    if (!query || !query.url) {
      sendError(res, "No ?url provided", 400);
      return;
    }

    // Create browser
    const browser = await createBrowser();
    const page = await browser.newPage();

    // Go to page and get response
    let response = undefined;
    try {
      response = await page.goto(query.url, {
        timeout: TIMEOUT,
        waitUntil: "networkidle0"
      });
    } catch (e) {
      console.error(e);
    }

    // No response obtained
    if (!response) {
      await page.close();
      sendError(res, "Response does not exist", 400);
      return;
    }

    // Remove script & import tags.
    await page.evaluate(stripPage);

    // Serialize page.
    const content = await page.evaluate("document.firstElementChild.outerHTML");

    await page.close();
    await browser.close();

    res.statusCode = response.status();
    res.end(content);
  } catch (e) {
    console.log(e);
    sendError(res, `Internal server error (${e.message})`);
    return;
  }
}

function sendError(res, text, code = 500) {
  res.statusCode = code;
  res.setHeader("Content-Type", "text/html");
  res.end(`Purp: ${text}`);
}

async function createBrowser() {
  let options = {};

  if (IS_DEV) {
    options = {
      args: [],
      executablePath: CHROME_LOCAL,
      headless: true
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }

  return puppeteer.launch(options);
}

/**
 * Executed on the page after the page has loaded. Strips script and
 * import tags to prevent further loading of resources.
 */
function stripPage() {
  // Strip only script tags that contain JavaScript (either no type attribute or one that contains "javascript")
  const elements = document.querySelectorAll(
    'script:not([type]), script[type*="javascript"], link[rel=import]'
  );
  for (const e of Array.from(elements)) {
    e.remove();
  }
}