const fs = require('fs')

const readStream = fs.createReadStream('./views/cats.html', 'utf-8')

readStream.on('data', (data) => {
  console.log(data)
})
