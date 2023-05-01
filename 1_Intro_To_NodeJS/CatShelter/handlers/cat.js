const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');

function postBreed(req, res) {
  let formData = '';

  req.on('data', (data) => {
    formData += data;
  });
  console.log(formData);
  req.on('end', () => {
    let body = qs.parse(formData);

    fs.readFile('./data/breeds.json', (err, data) => {
      if (err) {
        throw err;
      }

      let breeds = JSON.parse(data);
      breeds.push(body.breed);
      let json = JSON.stringify(breeds);

      fs.writeFile('./data/breeds.json', json, 'utf-8', () =>
        console.log('The breed was uploaded successfully.')
      );
    });
  });
  res.writeHead(302, { Location: '/' });

  res.end();
}

module.exports = async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/cats/add-cat' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../views/addCat.html'));
    const index = fs.createReadStream(filepath);
    index.on('data', (data) => {
      let catBreedPlaceholder = breeds.map(
        (breed) => `<option value="${breed}">${breed}</option>`
      );
      let modifiedData = data
        .toString()
        .replace('{{catBreeds}}', catBreedPlaceholder);
      res.write(modifiedData);
    });

    index.on('end', () => res.end());

    index.on('error', (err) => {
      console.log(err);
    });
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      let oldPath = files.upload.filepath;
      let newPath = path.normalize(
        path.join(
          __dirname,
          '../content/images/' + files.upload.originalFilename
        )
      );

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('File was uploaded successfully.');
      });

      fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
        if (err) throw err;

        let allCats = JSON.parse(data);
        allCats.push({
          id: allCats.length + 1,
          ...fields,
          image: files.upload.originalFilename,
        });
        let json = JSON.stringify(allCats);
        fs.writeFile('./data/cats.json', json, () => {});
      });
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
    let filepath = path.normalize(
      path.join(__dirname, '../views/addBreed.html')
    );
    const index = fs.createReadStream(filepath);

    index.on('data', (data) => {
      res.write(data);
    });

    index.on('end', () => res.end());

    index.on('error', (err) => {
      console.log(err);
    });
  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
    postBreed(req, res);
  } else {
    return true;
  }
};
