const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'products';

async function create(name, quantity) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const { insertedId } = await collection.insertOne({ name, quantity });

  return insertedId;
}

async function update(id, name, quantity) {
  const collection = await connection().then((db) => db.collection(collectionName));

  await collection.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
}

async function deleteDocument(id) {
  const collection = await connection().then((db) => db.collection(collectionName));

  await collection.deleteOne({ _id: ObjectId(id) });
}

async function getAll() {
  const collection = await connection().then((db) => db.collection(collectionName));
  const allDocuments = await collection.find().toArray();

  return allDocuments;
}

async function getById(id) {
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
  update,
  deleteDocument,
  getAll,
  getById,
  getByName,
};
