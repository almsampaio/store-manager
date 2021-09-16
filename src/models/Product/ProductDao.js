const { ObjectId } = require('mongodb');
const Connection = require('../../config/databaseMongo');

const getAll = async () => {
  const mongo = await Connection();
  return mongo.collection('products')
    .find()
    .toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const mongo = await Connection();
  return mongo.collection('products').findOne({ _id: ObjectId(id) });
};

const findByName = async (name) => {
  const mongo = await Connection();
  return mongo.collection('products').findOne({ name });
};

const create = async (product) => {
  const mongo = await Connection();
  const result = await mongo.collection('products').insertOne(product);

  const [productSaved] = result.ops;

  return productSaved;
};

const update = async (id, product) => {
  const { name, quantity } = product;
  if (!ObjectId.isValid(id)) return null;

  const mongo = await Connection();
  const result = await mongo
    .collection('products')
    .replaceOne({ _id: ObjectId(id) }, { name, quantity });

  const [productUpdated] = result.ops;

  return productUpdated;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const mongo = await Connection();
  const result = await mongo.collection('products')
    .deleteOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
