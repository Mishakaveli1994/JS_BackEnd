const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const breeds = require('../data/breeds.json')
const cats = require('../data/cats.json')

const baseURL = 'http://localhost:3000'
module.exports = (req, res) => {
  const fullURL = new URL(req.url, baseURL)
  const pathname = fullURL.pathname

  if (pathname === '/cats/add-breed' && req.method === 'GET') {
    fs.readFile(
      path.normalize(path.join(__dirname, '../views/addBreed.html')),
      'utf8',
      (err, data) => {
        if (err) {
          console.log(err)
          res.writeHead(404, 'There was an error when reading the file')
          return
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()
      }
    )
  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    fs.readFile(
      path.normalize(path.join(__dirname, '../views/addCat.html')),
      'utf8',
      (err, data) => {
        if (err) {
          console.log(err)
          res.writeHead(404, 'There was an error when reading the file')
          return
        }

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        res.end()
      }
    )
  } else {
    return true
  }
}
