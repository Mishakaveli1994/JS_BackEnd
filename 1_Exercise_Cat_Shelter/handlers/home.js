const fs = require('fs')
const path = require('path')

const baseURL = 'http://localhost:3000'
module.exports = (req, res) => {
  const fullURL = new URL(req.url, baseURL)
  const pathname = fullURL.pathname

  if (pathname === '/' && req.method === 'GET') {
    const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'))

    let cats = {}
    fs.readFile('./data/cats.json', 'utf8', (err, data) => {
      if (err) throw err

      cats = JSON.parse(data)
    })

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 Not Found!')
        res.end()
        return
      }

      res.writeHead(200, { 'Content-Type': 'text/html' })
      const modifiedCats = cats.map(
        (cat) => `<li>
        <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
          <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
          <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
        </ul>
      </li>
      `
      )
      const modifiedData = data.toString().replace('{{cats}}', modifiedCats)
      res.write(modifiedData)
      res.end()
    })
  } else {
    return true
  }
}
