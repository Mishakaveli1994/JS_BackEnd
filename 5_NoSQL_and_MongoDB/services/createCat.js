const Person = require('../models/Person.js');
const Cat = require('../models/Cat.js');
function createCat(catName, catBreed, ownerName) {
  const person = new Person({ name: ownerName, age: Math.round(Math.random() * 100) });
  person
    .save()
    .then((person) => {
      const cat = new Cat({ name: catName, breed: catBreed, age: Math.round(Math.random() * 10), owner: person });
      return cat.save();
    })
    .then((createdCat) => console.log(createdCat));
}

module.exports = createCat;
