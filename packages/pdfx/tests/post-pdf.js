const https = require("https");
const fs = require("fs");

function createRequest(options, data, output) {
  const defaults = {
    hostname: "pdfx.vercel.app",
    path: "/post/",
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request({...defaults, ...options}, res => {
    const chunks = [];

    res.on("data", chunk => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      // console.log(Buffer.concat(chunks).toString());
      console.log(`Writing PDF into ${output}`);

      fs.writeFileSync(
        output,
        Buffer.concat(chunks).toString("binary"),
        "binary"
      );
    });
  });

  req.on("error", e => {
    console.log(`Problem with request: ${e.message}`);
  });

  req.end(data);
}

// PLAIN
createRequest(
  {
    path: '/post/',
    headers: {
      'Content-Type': 'text/plain'
    }
  },
  'HELLO JS RAW',
  __dirname + '/js-pdf1.pdf');

// JSON
createRequest(
  {
    path: '/post/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  JSON.stringify({data: 'HELLO JS JSON'}),
  __dirname + '/js-pdf2.pdf');

// JSON with header and footer
createRequest(
  {
    path: '/post/?displayHeaderFooter=1&marginTop=100&marginBottom=100',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  JSON.stringify({
    data: 'HELLO JS JSON',
    headerTemplate: `
    <div style="font-size: 30px">
      THIS IS HEADER
    </div>
  `,
    footerTemplate: `
    <div style="font-size: 30px">
      THIS IS FOOTER
    </div>
  `,
  }),
  __dirname + '/js-pdf3.pdf');
