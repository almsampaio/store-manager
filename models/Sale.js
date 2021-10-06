const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'sales';

const getAll = async () => {
  const sales = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).find().toArray())
    .then((data) => data)
    .catch((err) => {
      console.error(err);
    });

  return sales;
};

const getById = async (id) => {
  try {
    const sale = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));

    if (!sale) return null;

    return sale;
  } catch (err) {
    return null;
  }
};

const create = async (itensSold) => {
  const { ops } = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).insertOne({ itensSold }));

  return ops[0];
};

const update = async ({ id, itensSold }) => {
  await connection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME)
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  const sale = await getById(id);

  return sale;
};

const deleteById = async (id) => {
  try {
    const response = await connection.getConnection()
    .then((db) => db.collection(COLLECTION_NAME).findOneAndDelete({ _id: ObjectId(id) }));

    if (!response.value) {
      return null;
    }

    return response.value;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
