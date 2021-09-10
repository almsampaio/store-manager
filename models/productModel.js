const { ObjectId } = require('bson');
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

const findByName = async (name) => {
  const db = await connection();
  const productByName = await db.collection('products').findOne({ name });
  return productByName;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const editProduct = await connection().then((db) => db
  .collection('products').updateOne({
    _id: new ObjectId(id) }, { $set: { name, quantity } })).then(() => (
    { _id: id, name, quantity }
  ));

  return editProduct;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const removeProduct = db.collection('products').deleteOne({ _id: ObjectId(id) });
  return removeProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  findByName,
  update,
  exclude,
};
