const connection = require('./connection');

const collectionName = 'products';

async function create(name, quantity) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const { insertedId } = await collection.insertOne({ name, quantity });

  return insertedId;
}

async function findByName(name) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const document = await collection.findOne({ name });

  return document;
}

module.exports = {
  create,
  findByName,
};
