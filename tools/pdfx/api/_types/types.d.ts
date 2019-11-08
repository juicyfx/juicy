interface PdfSource {
    url?: string;
    raw?: string;
}

interface PostRequest {
    data: string;
    header?: string;
    footer?: string;
}

interface PdfOptions {
    path?: string;
    scale?: number;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    printBackground?: boolean;
    landscape?: boolean;
    pageRanges?: string;
    format?: import('puppeteer-core').PDFFormat;
    width?: string | number;
    height?: string | number;
    margin?: {
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
    };
    preferCSSPageSize?: boolean
}

interface QueryParams {
    [key: string]: any
}
