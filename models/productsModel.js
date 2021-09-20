const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'products';

async function create(name, quantity) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const { insertedId } = await collection.insertOne({ name, quantity });

  return insertedId;
}

async function getAll() {
  const collection = await connection().then((db) => db.collection(collectionName));
  const allDocuments = await collection.find().toArray();

  return allDocuments;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const collection = await connection().then((db) => db.collection(collectionName));
  const document = await collection.findOne(new ObjectId(id));

  return document;
}

async function getByName(name) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const document = await collection.findOne({ name });

  return document;
}

module.exports = {
  create,
  getAll,
  getById,
  getByName,
};
