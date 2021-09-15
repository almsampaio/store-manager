const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () => {
  const productsFound = await connection().then((db) => db
    .collection('products').find({}, { sort: { title: 1 } }).toArray())
    .then((res) => res).catch((err) => console.log(err));
    return productsFound;
};

const createProduct = async (name, quantity) => {
  console.log('model createProduct on!');
  const product = await connection().then((db) => db
  .collection('products').insertOne({ name, quantity }))
  .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  return product;
};

const findByName = async (name) => {
  console.log('model findByName on!');
  const query = { name };
  const productFound = await connection().then((db) => db
    .collection('products').findOne(query))
    .then((res) => {
      console.log(res);
      return res;
    }).catch((err) => console.log(err));
    return productFound;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  console.log('model findById on!');
  const query = { _id: ObjectId(id) };
  const productFound = await connection().then((db) => db
    .collection('products').findOne(query))
    .then((res) => {
      console.log(res);
      return res;
    }).catch((err) => console.log(err));
  return productFound;
};

const update = async ({ _id, name, quantity }) => {
  if (!ObjectId.isValid(_id)) return null;
  const filter = { _id };
  const newProduct = {
    _id: new ObjectId(_id),
    name,
    quantity,
  };
  const updateProduct = {
    $set: newProduct,
  };
  const result = await connection().then((db) => db
    .collection('products').updateOne(filter, updateProduct))
    .then(() => newProduct).catch((err) => console.log(err));
  return result;
};

module.exports = {
  createProduct,
  getAll,
  findByName,
  findById,
  update,
};