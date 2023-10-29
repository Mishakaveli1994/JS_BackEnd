const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

function requestHandler(req, res) {
  //   console.log(req.method);
  //   console.log(req.url);

  let reqUrl = url.parse(req.url);
  //   console.log(reqUrl);
  //   console.log(reqUrl.pathname);

  let queryParams = querystring.parse(reqUrl.query);
  //   console.log(queryParams);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  switch (reqUrl.pathname) {
    case '/cats':
      // res.write(`<h1>Hello Cats!</h1>`);
      fs.readFile(`./views/cats.html`, function(error, data){
        if (error) {
          console.log('kek Heheh');
          return;
        }
        res.write(data);
        // console.log(data);
        res.end();
      });

      break;
    case '/dogs':
      res.write(`<h1>Hello Dogs!</h1>`);
      res.end();
      break;
    default:
      res.write(`<h1>Hello Humans!</h1>`);
      res.end();
      break;
  }
}

const app = http.createServer(requestHandler);

let port = 5000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
