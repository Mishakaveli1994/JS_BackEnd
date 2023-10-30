const fs = require('fs')
const path = require('path')
const cats = require('../data/cats.json')

const baseURL = 'http://localhost:3000'
module.exports = (req, res) => {
  const fullURL = new URL(req.url, baseURL)
  const pathname = fullURL.pathname

  if (pathname === '/' && req.method === 'GET') {
    const filePath = path.normalize(
      path.join(__dirname, '../views/home/index.html')
    )

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 Not Found!')
        res.end()
        return
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
