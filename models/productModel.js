const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const products = await connection().then((db) => db
  .collection('products').find({}).toArray()).then((response) => {
    console.log(response, 'getAll product model');
    return response;
  });

  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) => db
  .collection('products').findOne({ _id: ObjectId(id) }))
  .then((response) => {
    console.log(response, 'getById product model');
    return response;
  }).catch((err) => console.log(err));

  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) => db
  .collection('products').insertOne({ name, quantity }))
  .then((response) => {
    console.log(response.ops[0]);
    return response.ops[0];
  }).catch((err) => console.log(err));

  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};
