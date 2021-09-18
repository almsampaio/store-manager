const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const create = async (name, quantity) => getConnection()
.then((db) => db.collection('products').insertOne({
    name, quantity,
  }).then((result) => result.ops[0]));

  const getName = async (name) => getConnection()
  .then((db) => db.collection('products').findOne({ name }));

  const getAll = async () => getConnection()
  .then((db) => db.collection('products')
  .find({}).toArray().then((result) => ({ products: result })));

  const getProductsById = async (id) => getConnection()
  .then((db) => db.collection('products').findOne(new ObjectId(id)));

module.exports = {
  create,
  getName,
  getAll,
  getProductsById,
};
