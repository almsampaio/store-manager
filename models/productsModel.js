const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => ({ _id: result.insertedId, name, quantity }));

const findProductByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .then((result) => result);

const getAll = () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return product;
};

const exclude = (id) => {
  console.log('Controller - exclude');
  
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = { 
  create,
  findProductByName,
  getAll,
  getById,
  update,
  exclude,
};
