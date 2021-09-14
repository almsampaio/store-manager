const { ObjectID } = require('bson');
const getConnection = require('./connection');

const errMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format' },
  statusCode: 422 };

const getAll = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
  return product;
};

const create = async (name, quantity) => {
  const db = await getConnection();
  const findName = await db.collection('products').findOne({ name });
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('products')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
  return { id, name, quantity };
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) return errMessage;
  const db = await getConnection();
  const findProduct = await db.collection('products').findOne({ _id: ObjectID(id) });
  if (!findProduct) return errMessage;
  await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return findProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
