const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 5000
const utils = require('./utils.js')
const util = require('util')

function requestHandler(req, res) {
  const reqUrl = url.parse(req.url)

  // let data = ''

  // * Proper way to convert callbacks to promises
  const readFilesAsync = util.promisify(fs.readFile)
  switch (reqUrl.pathname) {
    case '/cats':
      res.writeHead(200, { 'Content-Type': 'text/html' })

      console.log('cats')
      // ! Don't use the synchronous version of fs.readFile
      // data = fs.readFileSync('./views/cats.html', { encoding: 'utf8' }) // * Will read file synchronously - inconvenient for large files
      // res.write(data)
      // res.end()

      // ? Standard async version of fs.readFile
      // fs.readFile('./views/cats.html', { encoding: 'utf8' }, (err, data) => {
      //   if (err) throw err
      //   res.write(data)
      //   res.end()
      // })

      // ? Create a promise from a stream the hard way
      // utils.readFileAsync('./views/cats.html').then((data) => {
      //   res.write(data)
      //   res.end()
      // })

      readFilesAsync('./views/cats.html').then((data) => {
        res.write(data)
        res.end()
      })

      break
    case '/dogs':
      res.writeHead(200, { 'Content-Type': 'text/html' })

      res.write('<h1>Hello Dogs!</h1>')
      res.end()
      break
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' })

      res.write('<h1>Hello Humans!</h1>')
      res.end()
      break
  }
}

const app = http.createServer(requestHandler)

app.listen(port, () => console.log(`Server listening on port ${port}...`))
