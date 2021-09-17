const { ObjectID } = require('bson');
const connection = require('./mongoConnection');

const create = async (name, quantity) =>
  connection().then((db) =>
  db.collection('products').insertOne({ name, quantity }));

const getProducts = async () =>
  connection().then((db) => 
  db.collection('products').find().toArray());

const getProductsById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const update = (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  
  return connection().then((db) =>
    db.collection('products')
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { name, quantity } }));
};

module.exports = {
  create,
  getProducts,
  getProductsById,
  update,
};