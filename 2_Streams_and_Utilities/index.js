const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')
const pubSub = require('./pubsub.js')
const events = require('events')
require('./init.js')

const port = 5000

const eventEmitter = new events.EventEmitter()

eventEmitter.on('cats', (name) => {
  console.log(`From event emitter: ${name}!`)
})

function requestHandler(req, res) {
  const reqUrl = url.parse(req.url)
  const queryParams = querystring.parse(reqUrl.query)
  const readStream = fs.createReadStream('./views/cats.html', { highWaterMark: 5, encoding: 'utf-8' }) // * Stream throttles intentionally
  // const readStream = fs.createReadStream('./views/cats.html', { encoding: 'utf-8' })
  // req.on('data', (data) => {
  //   console.log(data)
  // })

  readStream.pipe(res)

  switch (reqUrl.pathname) {
    case '/cats':
      res.writeHead(200, { 'Content-Type': 'text/html' })

      // fs.readFile('./views/cats.html', function (error, data) {
      //   if (error) {
      //     console.log('kek Heheh')
      //     return
      //   }
      //   res.write(data)
      //   // console.log(data);
      //   res.end()
      // })

      // readStream.on('data', (chunk) => {
      //   res.write(chunk)
      // })

      // readStream.on('end', () => {
      //   res.end()
      // })

      pubSub.publish('cats', queryParams.name)
      eventEmitter.emit('cats', queryParams.name)
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
