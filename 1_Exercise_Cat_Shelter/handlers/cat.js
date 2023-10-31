const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const breeds = require('../data/breeds.json')
// const allCats = require('../data/cats.json')

let allCats = []

function getCatId(path) {
  return Number(path.split('/')[2])
}

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
        allCats = JSON.parse(data)
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
  } else if (pathname.includes('/cats-edit') && req.method === 'GET') {
    fs.readFile('./data/cats.json', 'utf8', (err, data) => {
      if (err) throw err
      allCats = JSON.parse(data)
    })
    fs.readFile(path.normalize(path.join(__dirname, '../views/editCat.html')), 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, 'There was an error when reading the file')
        return
      }
      const currentCat = allCats.find((obj) => obj.id === getCatId(pathname))

      res.writeHead(200, { 'Content-Type': 'text/html' })
      let modifiedData = data.toString().replace('{{id}}', currentCat.id)
      modifiedData = modifiedData.replace('{{name}}', currentCat.name)
      modifiedData = modifiedData.replace('{{description}}', currentCat.description)

      const breedAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`)
      modifiedData = modifiedData.replace('{{catBreeds}}', breedAsOptions.join('/'))

      modifiedData = modifiedData.replace('{{breed}}', currentCat.breed)
      res.write(modifiedData)
      res.end()
    })
  } else if (pathname.includes('/cats-find-new-home') && req.method === 'GET') {
    // Finish
  } else if (pathname.includes('/cats-edit') && req.method === 'POST') {
    const form = new formidable.IncomingForm()
    const catId = getCatId(pathname)
    form.parse(req, (err, fields, files) => {
      if (err) throw err
      const oldPath = files.upload[0].filepath
      const newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload[0].originalFilename))
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err
        console.log('The cat photo has been updated successfully!')
      })

      fs.readFile('./data/cats.json', 'utf8', (err, data) => {
        if (err) throw err
        allCats = JSON.parse(data)
        console.log(JSON.parse(data))
        const newCats = allCats.map((cat) => (cat.id === catId ? { id: catId, ...fields, image: files.upload[0].originalFilename } : cat))
        const json = JSON.stringify(newCats)
        console.log(json)
        fs.writeFile('./data/cats.json', json, (err) => {
          if (err) throw err
          res.writeHead(302, { Location: '/' })
          res.end()
        })
      })
    })
  } else if (pathname.includes('/cats-find-new-home') && req.method === 'POST') {
    // Finish
  } else {
    return true
  }
}
