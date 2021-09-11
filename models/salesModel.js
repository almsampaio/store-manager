// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const itens = { itensSold: sale };
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne(itens);
  return { _id: insertedId, itensSold: sale };
};

module.exports = {
  create,
};
