const http = require('http');
const url = require('url');
const now = require('./now.json');

const PORT = process.env.PORT || 3030;

const routes = now.routes.reduce((map, route) => {
  map[route.src] = require('.' + route.dest);
  return map;
}, {});

http
  .createServer(async (req, res) => {
    // filter out any query strings
    const { pathname } = url.parse(req.url);
    try {
      await routes[pathname](req, res);
    } catch (err) {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(PORT, () => console.log(`👂 Listening: http://localhost:${PORT}`));