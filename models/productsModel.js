const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'products';

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .catch((err) => console.log(err));
  return products;
};

const findById = async (id) => {
  const product = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return product;
};

const findByName = async (nameProduct) => {
  const resultSearch = await connection()
    .then((db) => db.collection(collectionName).findOne({ name: { $eq: nameProduct } }));
  return resultSearch;
};

const deleteById = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
};

const create = async (name, quantity) => {
  const db = await connection();
  const productCreated = await db.collection(collectionName).insertOne({ name, quantity })
    .then((result) => ({ _id: result.insertedId, name, quantity }))
    .catch((err) => console.log(err));
  return productCreated;
};

const update = async (id, name, quantity) => {
  const productUpdated = await connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }))
    .catch((err) => console.log(err));
  return productUpdated;  
};

module.exports = { getAll, findById, deleteById, create, update, findByName }; 