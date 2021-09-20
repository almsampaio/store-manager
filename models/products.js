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

  const getById = async (id) => getConnection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

  const updateProduct = async (id, data) => {
    getConnection()
    .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }));
    const product = await getById(id);
    return product;
  };

  const deleteProduct = async (id) => {
    getConnection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  };

module.exports = {
  create,
  getName,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
