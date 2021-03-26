interface PdfSource {
    url?: string;
    raw?: string;
}

interface PostRequest {
    data: string;
    header?: string;
    footer?: string;
}

interface QueryParams {
    [key: string]: any
}

type ChromeLaunchOptions = import('puppeteer-core').LaunchOptions & import('puppeteer-core').BrowserLaunchArgumentOptions & import('puppeteer-core').BrowserConnectOptions;
