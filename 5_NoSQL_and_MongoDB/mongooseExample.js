const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const chalk = require('chalk');
const Cat = require('./models/Cat');

async function main() {
  try {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', console.log.bind(console, 'Connected to database!'));

    await mongoose.connect('mongodb://127.0.0.1:27017/catagram');
    const cat = new Cat({ name: faker.person.firstName(), age: Math.round(Math.random() * 100) });
    const res = await cat.save();
    console.log(chalk.blue('Cat saved!'));
    console.log(res);

    // ? Use created function for schema
    // await Cat.find({}).then((cats) => cats.forEach((x) => x.getInfo()));
    // ? Use created virtual columnn for schema
    // await Cat.find({}).then((cats) => cats.forEach((x) => console.log(`I am ${x.age} years old and was born in ${x.birthYear}.`)));
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}

main().catch(console.error);
