const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return result;
};

const create = async (sale) => {
  const itens = { itensSold: sale };
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne(itens);
  return { _id: insertedId, itensSold: sale };
};

module.exports = {
  getById,
  create,
};
