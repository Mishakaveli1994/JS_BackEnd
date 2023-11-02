const fs = require('fs')

function readDir(path) {
  fs.readdir(path, (err, data) => {
    if (err) throw err
    console.log('Reading directory...')
    console.log(data)
  })
}

function createDir(path) {
  fs.mkdir(path, (err) => {
    if (err) throw err
    console.log('Directory created!')
  })
}

function deleteDir(path) {
  fs.rmdir(path, (err) => {
    if (err) throw err
    console.log('Directory deleted!')
  })
}

readDir('.')
createDir('kek')
deleteDir('kek')
