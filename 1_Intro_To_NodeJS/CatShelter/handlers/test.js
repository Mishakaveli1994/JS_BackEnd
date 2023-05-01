const fs = require('fs');
const path = require('path')

let breeds = {}
fs.readFile(path.normalize(path.join(__dirname,'../data/breeds.json')), (err, data) => {
  if (err) {
    throw err;
  }
  breeds = JSON.parse(data);
});

console.log(breeds);
