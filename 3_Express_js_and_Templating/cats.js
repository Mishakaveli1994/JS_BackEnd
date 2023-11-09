const fs = require('fs');
const catsData = require('./cats.json');
const cats = catsData.slice();

function add(name) {
  cats.push(name);
  fs.writeFile('./cats.json', JSON.stringify(cats), (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('The file has been saved!');
  });
}

function getAll() {
  return cats.slice();
}

module.exports = {
  add,
  getAll
};
