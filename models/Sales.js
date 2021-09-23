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
  const operation = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return operation;
};

module.exports = {
  create,
  getAll,
  getById,
};
