const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(url) {
  if (url.endsWith('css')) {
    return 'text/css';
  } else if (url.endsWith('html')) {
    return 'text/html';
  } else if (url.endsWith('png')) {
    return 'image/png';
  } else if (url.endsWith('PNG')) {
    return 'image/png';
  } else if (url.endsWith('jpg')) {
    return 'image/jpg';
  } else if (url.endsWith('js')) {
    return 'text/javascript';
  } else if (url.endsWith('ico')) {
    return 'image/x-icon';
  }
}

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname.startsWith('/content') && req.method === 'GET') {
    let filePath = path.normalize(path.join(__dirname, `../${pathname}`));

    if (
      pathname.endsWith('png') ||
      pathname.endsWith('jpg') ||
      pathname.endsWith('JPG') ||
      pathname.endsWith('jpeg') ||
      pathname.endsWith('PNG') ||
      pathname.endsWith('ico')
    ) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });

          res.write('An error has occured');
          res.end();
          return;
        }

        res.writeHead(200, { 'Content-Type': getContentType(pathname) });

        res.write(data);
        res.end();
      });
    } else {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404, { 'Content-Type': 'text/plain' });

          res.write('An error has occured');
          res.end();
          return;
        }

        res.writeHead(200, { 'Content-Type': getContentType(pathname) });

        res.write(data);
        res.end();
      });
    }
  } else {
    return true;
  }
};
