const { ObjectId } = require('bson');
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

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};
