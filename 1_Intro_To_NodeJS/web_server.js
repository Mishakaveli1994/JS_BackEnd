const http = require('http');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');
const pubSub = require('./pubSub.js');
require('./init');

const port = 5000;

function requestHandler(req, res) {
  let reqURL = url.parse(req.url);
  let params = queryString.parse(reqURL.query);

  switch (reqURL.pathname) {
    case '/cats':
      res.writeHead(200, { 'Content-type': 'text/html' });

      fs.readFile('./views/cats.html', function (err, data) {
        if (err) {
          console.log(err);
          return;
        }
        res.write(data);
        res.end();
      });
      pubSub.publish("onCats", params.name)
      break;
    case '/dogs':
      res.writeHead(200, { 'Content-type': 'text/plain' });

      res.write('Hello Dogs!');
      res.end();
      break;
    default:
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end();
      break;
  }
}

const app = http.createServer(requestHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
