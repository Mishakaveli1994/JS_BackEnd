const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const breeds = require('../data/breeds.json')
const allCats = require('../data/cats.json')

const baseURL = 'http://localhost:3000'
module.exports = (req, res) => {
  const fullURL = new URL(req.url, baseURL)
  const pathname = fullURL.pathname

  if (pathname === '/cats/add-breed' && req.method === 'GET') {
    fs.readFile(path.normalize(path.join(__dirname, '../views/addBreed.html')), 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, 'There was an error when reading the file')
        return
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      res.end()
    })
  } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
    let formData = ''
    req.on('data', (data) => {
      formData += data
    })

    req.on('end', () => {
      const body = qs.parse(formData)

      fs.readFile('./data/breeds.json', 'utf8', (err, data) => {
        if (err) {
          throw err
        }

        const breeds = JSON.parse(data)
        breeds.push(body.breed)

        const json = JSON.stringify(breeds)

        fs.writeFile('./data/breeds.json', json, 'utf8', () => {
          console.log('The breed has been uploaded successfully!')
        })
      })
      res.writeHead(302, { Location: '/' })
      res.end()
    })
  } else if (pathname === '/cats/add-cat' && req.method === 'GET') {
    fs.readFile(path.normalize(path.join(__dirname, '../views/addCat.html')), 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, 'There was an error when reading the file')
        return
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      const catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`)
      const modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder)
      res.write(modifiedData)
      res.end()
    })
  } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
    const form = new formidable.IncomingForm()

    form.parse(req, (err, fields, files) => {
      if (err) throw err
      const oldPath = files.upload[0].filepath
      const newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload[0].originalFilename))

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err
        console.log('The cat has been uploaded successfully!')
      })

      fs.readFile('./data/cats.json', 'utf8', (err, data) => {
        if (err) throw err

        console.log(JSON.parse(data))
        allCats.push({ id: allCats.length + 1, ...fields, image: files.upload[0].originalFilename })
        const json = JSON.stringify(allCats)
        console.log(json)
        fs.writeFile('./data/cats.json', json, (err) => {
          if (err) throw err
          res.writeHead(302, { Location: '/' })
          res.end()
        })
      })
    })
  } else {
    return true
  }
}
