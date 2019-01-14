const chromium = require('chrome-aws-lambda');
// const puppeteer = require('puppeteer-core');
const puppeteer = chromium.puppeteer;

async function getScreenshot(url, type, quality, fullPage) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const file = await page.screenshot({ type, quality, fullPage });
    await browser.close();
    return file;
}

async function getPdf(source, options) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true,
    });

    const page = await browser.newPage();

    if (source.url) {
        await page.goto(source.url, { waitUntil: 'networkidle0' });
    } else if (source.raw) {
        await page.setContent(source.raw)
    } else {
        throw Error('Unsupported source');
    }

    await page.emulateMedia('screen');
    const content = await page.pdf({
        format: 'A4',
        ...options
    });

    await browser.close();
    return content;
}

module.exports = { getScreenshot, getPdf };
