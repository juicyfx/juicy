import { IncomingMessage, ServerResponse, createServer } from "http";
import { parse } from "url";
import { getPdf } from "./utils/chromium";
import { isValidUrl } from "./utils/validator";

const isDev = !process.env.NOW_REGION;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const { query = {} } = parse(req.url || "", true);

  if (query.url) {
    fromUrl(req, res);
  } else if (query.raw) {
    fromRaw(req, res);
  } else {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<h1>Server Error</h1><p>Input input given. Use <code>?url=https://example.com</code> or <code>?raw=hello!</code> </p>"
    );
  }
}

async function fromUrl(req: IncomingMessage, res: ServerResponse) {
  try {
    const { query = {} } = parse(req.url || "", true);
    const { url, format = "A4" } = query;

    console.log('HTTP ' + req.url);

    if (Array.isArray(url)) {
      throw new Error("Expected a single URL");
    }

    if (!isValidUrl(url)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`
      );
    } else {
      const file = await getPdf({ url }, { format });
      res.statusCode = 200;
      res.setHeader("Content-Type", `application/pdf`);
      res.end(file);
    }
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${
        e.message
      }</p>`
    );
    console.error(e);
    console.error(e.message);
  }
}

async function fromRaw(req: IncomingMessage, res: ServerResponse) {
  try {
    const { query = {} } = parse(req.url || "", true);
    const { raw, format = "A4" } = query;

    console.log('HTTP ' + req.url);

    if (Array.isArray(raw)) {
      throw new Error("Expected a single raw");
    }

    if (!raw) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>Bad Request</h1><p>No raw source</p>`);
    } else {
      const file = await getPdf({ raw }, { format });
      res.statusCode = 200;
      res.setHeader("Content-Type", `application/pdf`);
      res.end(file);
    }
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${
        e.message
      }</p>`
    );
    console.error(e);
    console.error(e.message);
  }
}

if (isDev) {
  const PORT = process.env.PORT || 13463;
  const listen = () => console.log(`Listening on ${PORT}...`);
  createServer(handler).listen(PORT, listen);
}
