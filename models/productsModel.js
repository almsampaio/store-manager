const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((result) => result || null);

const getAllProducts = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products);

const findProductById = async (id) => connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then((result) => result || null)
    .catch(() => null);

const changeProductInfo = async (id, name, quantity) => {
  const newProduct = { _id: id, name, quantity };

  return connection()
    .then((db) => db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, quantity } },
    ))
    .then(() => newProduct);
};

const remove = async (id) => {
  const productInfo = await findProductById(id);

  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: new ObjectId(id) }))
    .then(() => productInfo)
    .catch(() => null);
};

module.exports = {
  create,
  findByName,
  getAllProducts,
  findProductById,
  changeProductInfo,
  remove,
};
