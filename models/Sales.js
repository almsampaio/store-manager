const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const operation = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
      .then((result) => result.ops[0]);

  return operation;
};

const getAll = async () => {
  const operation = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return operation;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const operation = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return operation;
};

const update = async (sale, id) => {
  const [{ productId, quantity }] = sale;
  await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { productId, quantity } }));

  return {
    _id: id,
    itensSold: sale,
  };
};

const deleteSales = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const result = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSales,
};
