const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

// ? Standard async way
async function main() {
  const uri = 'mongodb://localhost:27017';

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // await listDatabases(client);

    const db = await client.db('catagram');
    const cats = await db.collection('cats');
    let results = await cats.find({}).toArray();
    console.log(results);
    results = await cats.findOne({ name: 'Betty' });
    console.log(results);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// ? Not a cool way to do it as hard to use async statement
// client
//   .connect()
//   .then((res) => {
//     const db = client.db('catagram');
//     const cats = db.collection('cats');
//     return cats.find({}).toArray();
//   })
//   .then((res) => {
//     console.log(res);
//   });
