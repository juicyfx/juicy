import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { getPdf } from "./utils/chromium";
import { parseRequest } from "./utils/request";
import { isValidUrl } from "./utils/validator";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const { query = {} } = parse(req.url || "", true);

  if (req.method === 'POST') {
    fromPost(req, res);
  } else if (query.url) {
    fromUrl(req, res);
  } else if (query.raw) {
    fromRaw(req, res);
  } else {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<h1>Server Error</h1><p>Invalid input given. Use <code>?url=https://example.com</code> or <code>?raw=hello!</code> or POST request </p>"
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

async function fromPost(req: IncomingMessage, res: ServerResponse) {
  try {
    const { query = {} } = parse(req.url || "", true);
    const { format = "A4" } = query;

    const parsed = await parseRequest(req);

    console.log('HTTP ' + req.url);
    console.log(parsed);

    if (!parsed.data) {
      throw new Error("Missing request.data in body");
    }

    const file = await getPdf({ raw: parsed.data }, { format });
    res.statusCode = 200;
    res.setHeader("Content-Type", `application/pdf`);
    res.end(file);

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
