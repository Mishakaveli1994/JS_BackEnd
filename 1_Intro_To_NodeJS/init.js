const pubSub = require('./pubSub.js');

const names = [];
const onCatsRequest = (name) => {
  if (names.includes(name)) {
    console.log(`Hello again ${name}`);
  } else {
    console.log(`We have a new cat named ${name}`);
    names.push(name);
  }
};

pubSub.subscribe('onCats', onCatsRequest);
