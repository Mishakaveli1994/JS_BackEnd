const http = require('http')
const port = 3000
const handlers = require('./handlers')

http
  .createServer((req, res) => {
    // eslint-disable-next-line prefer-const
    for (let handler of handlers) {
      if (!handler(req, res)) {
        break
      }
    }
  })
  .listen(port, () => console.log(`Server running at http://localhost:${port}`))
