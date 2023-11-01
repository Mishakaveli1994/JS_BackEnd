const pubSub = require('./pubsub.js')

const names = []

const onCatsRequest = (name) => {
  if (names.includes(name)) {
    console.log(`Hello again ${name}!`)
  } else {
    console.log(`We have a new cat - ${name}`)
    names.push(name)
  }
}

pubSub.subscribe('cats', onCatsRequest)
