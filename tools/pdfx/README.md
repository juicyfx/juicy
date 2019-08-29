# Juicy(fx) / PDF[x]

> Generates PDF from many given sources (URL, raw, POST)
> https://pdfx.jfx.cz

## Usage

This lambda supports all [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v1.12.2&show=api-pagepdfoptions) `page.pdf(options)` options.

```
scale?: number
displayHeaderFooter?: boolean
headerTemplate?: string
footerTemplate?: string
printBackground?: boolean
landscape?: boolean
pageRanges?: string
format?: string
width?: string | number
height?: string | number
marginTop?: string | number
marginRight?: string | number
marginBottom?: string | number
marginLeft?: string | number
preferCSSPageSize?: boolean
```

For example: https://pdfx.jfx.cz/url/?url=https://f3l1x.io&format=A3

## Endpoints

### URL

> https://pdfx.jfx.cz/url/?url=https://f3l1x.io&format=A3

### RAW

> https://pdfx.jfx.cz/raw/?raw=RAW_STRING&format=A3

### POST

```sh
curl \
  -X POST \
  --data "This is plain data" \
  -H "Content-Type: text/plain" \
  https://pdfx.jfx.cz/post/ \
  -o pdf-plain.pdf
```

```sh
curl \
  -X POST \
  --data '{"data":"This is post data","format":"A3"}' \
  -H "Content-Type: application/json" \
  https://pdfx.jfx.cz/post/ \
  -o pdf-post.pdf
```

**Send data as file**

```json
// body.json
{
    "data": "This is file post data",
    "headerTemplate": "<div style='font-size: 30px;'>HEADER</div>",
    "footerTemplate": "<div style='font-size: 30px;'>FOOTER</div>",
    "displayHeaderFooter": true,
    "marginTop": 100,
    "marginBottom": 100
}
```

```
curl \
  -X POST \
  --data @body.json \
  -H "Content-Type: application/json" \
  https://pdfx.jfx.cz/post/ \
  -o pdf-post-file.pdf
```

## Extra

### Fonts

There are some fonts preinstalled.

- fa-regular-400.ttf
- fa-brands-400.ttf
- fa-solid-900.ttf
- Inter-Black.ttf
- Inter-Bold.ttf
- Inter-BoldItalic.ttf
- Inter-ExtraBold.ttf
- Inter-ExtraBoldItalic.ttf
- Inter-ExtraLight-BETA.ttf
- Inter-ExtraLightItalic-BETA.ttf
- Inter-Italic.ttf
- Inter-Light-BETA.ttf
- Inter-LightItalic-BETA.ttf
- Inter-Medium.ttf
- Inter-MediumItalic.ttf
- Inter-Regular.ttf
- Inter-SemiBold.ttf
- Inter-SemiBoldItalic.ttf
- Inter-Thin-BETA.ttf into
- Inter-ThinItalic-BETA.ttf
- Inter-UI-BlackItalic.ttf
- NotoColorEmoji.ttf (🔥👨🏻‍💻🚀)
- Pacifico.ttf
