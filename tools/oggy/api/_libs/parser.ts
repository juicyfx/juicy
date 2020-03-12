import { IncomingMessage } from 'http';
import { parse } from 'url';

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url);
  const parsedUrl = parse(req.url || '', true);

  const query = parsedUrl.query || {};
  const pathname = parsedUrl.pathname || '/';

  const { fontSize, images, theme, md } = query;
  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize');
  }
  if (Array.isArray(theme)) {
    throw new Error('Expected a single theme');
  }

  const arr = pathname.slice(1).split('.');
  let extension = '';
  let text = '';
  if (arr.length === 0) {
    text = '';
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join('.');
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    theme: theme === 'dark' ? 'dark' : 'light',
    md: md === '1' || md === 'true',
    fontSize: fontSize || '96px',
    images: [],
  };

  if (Array.isArray(images)) {
    parsedRequest.images = images;
  } else if (images) {
    parsedRequest.images = [images];
  }

  return parsedRequest;
}
