# JuicyFx / Podfuk

> Generates PDF from many given sources (URL, raw, POST)
> https://podfuk.juicyfx1.now.sh

## Usage

This lambda supports all [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v1.12.2&show=api-pagepdfoptions) `page.pdf(options)` options. 

```
path?: string
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

For example: https://podfuk.juicyfx1.now.sh/url/?url=https://f3l1x.io&format=A3

## Endpoints

### URL

> https://podfuk.juicyfx1.now.sh/url/?url=https://f3l1x.io&format=A3

### RAW

> https://podfuk.juicyfx1.now.sh/raw/?raw=RAW_STRING&format=A3

### POST

```sh
curl \
  -X POST \
  --data "This is plain data" \
  -H "Content-Type: text/plain" \
  https://podfuk.juicyfx1.now.sh/post/ \
  -o pdf-plain.pdf
```

```sh
curl \
  -X POST \
  --data '{"data":"This is post data","format":"A3"}' \
  -H "Content-Type: application/json" \
  https://podfuk.juicyfx1.now.sh/post/ \
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
  https://podfuk.juicyfx1.now.sh/post/ \
  -o pdf-post-file.pdf
```
