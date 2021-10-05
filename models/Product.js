const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'products';

const getAll = async () => {
  const products = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).find().toArray())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });

  return products;
};

const getById = async (id) => {
  try {
    const product = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

    if (!product) return null;

    return product;
  } catch (err) {
    return null;
  }
};

const create = async ({ name, quantity }) => {
  const { ops } = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne({ name, quantity }));

  return ops[0];
};

const update = async ({ id, name, quantity }) => {
  await connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME)
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  const product = await getById(id);

  return product;
};

const deleteById = async (id) => {
  const response = await connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME).findOneAndDelete({ _id: ObjectId(id) }));

  if (!response.value) {
    return null;
  }

  return response.value;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
