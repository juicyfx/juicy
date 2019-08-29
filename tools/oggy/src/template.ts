import { readFileSync } from 'fs';
import * as marked from 'marked';
import { sanitizeHtml } from './sanitizer';

function getCss(fontSize: string) {
    const regular = readFileSync(`${__dirname}/../fonts/Inter-UI-Regular.woff2`).toString('base64');
    const bold = readFileSync(`${__dirname}/../fonts/Inter-UI-Bold.woff2`).toString('base64');

    return `
    @font-face {
        font-family: 'Inter UI';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    }

    @font-face {
        font-family: 'Inter UI';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
        height: 100vh;
        width: 100vw;
        display: flex;
        text-align: center;
        justify-content: center;
        margin: 0;
    }

    code {
        color: #D400FF;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, sans-serif;
        white-space: pre-wrap;
    }

    code:before, code:after {
        content: '\`';
    }


    .img-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-evenly;
        justify-items: center;
    }

    .logo {
        width: 225px;
        height: 225px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .wrapper {
        margin: 10px;
        //border: 5px double lightgray;
        flex: 1;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .heading {
        font-family: 'Inter UI', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: black;
    }`;
}


export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body class="theme-${theme}">
        <div class="wrapper">
            <div class="spacer">
            <div class="img-wrapper">
                <img class="logo" src="${sanitizeHtml(images[0])}" />
                ${images.slice(1).map(img => {
                    return `<div class="plus">+</div><img class="logo" src="${sanitizeHtml(img)}" />`;
                })}
            </div>
            <div class="spacer">
            <div class="heading">${md
                ? marked(text)
                : sanitizeHtml(text)}
            </div>
        </div>
    </body>
</html>`;
}
