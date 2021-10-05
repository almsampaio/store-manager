const { ObjectId } = require('mongodb');
const connection = require('./conection');

const createSale = (params) => (
  connection()
    .then((db) => (db.collection('sales').insertOne(params)))
    .then((result) => ({ _id: result.insertedId, ...params }))
);

const getAll = async () => (
  connection()
  .then((db) => db.collection('sales').find().toArray())
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return saleData;
};

module.exports = {
  createSale,
  getAll,
  findById,
};
