const fs = require('fs')

const readStream = fs.createReadStream('./views/cats.html', 'utf-8')
const writeStream = fs.createWriteStream('./write.txt', { encoding: 'utf8' })

let sequenceCounter = 0

function incrementCounter() {
  sequenceCounter++
  return sequenceCounter
}

readStream.on('data', (data) => {
  console.log(`${incrementCounter()}. Starting read stream`)
  writeStream.write(data)
  console.log(`${incrementCounter()}. Writing to write stream`)
  writeStream.write(data)
})

readStream.on('end', () => {
  console.log(`${incrementCounter()}. Finished reading`)
  writeStream.end() // It's here as the read and write are both asynchronous
})

writeStream.on('finish', () => {
  console.log(`${incrementCounter()}. Finished writing`)
})

console.log(`${incrementCounter()}. This is at the end of the file`)
