const express = require('express')

const app = express()

const port = 5000

app.get('/', (req, res) => {
  console.log('Root path accessed - console print')

  res.send('Hello World!')
})

app.listen(port, () => console.log(`The server is listening on port ${port}`))
