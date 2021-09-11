const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = db.collection('sales').find().toArray();
  return result;
};

const create = async (sale) => {
  const itens = { itensSold: sale };
  const db = await connection();
  const { insertedId } = await db.collection('sales').insertOne(itens);
  return { _id: insertedId, itensSold: sale };
};

const update = async (id, prodId, qtd) => 
  // const db = await connection();
  // const result = await db.collection('sales').updateOne({ _id: ObjectID(id) },
  //   { $set: { 'productId.$[quantity]': qtd } },
  //   { multi: true, arrayFilters: [{ quantity: { $eq: prodId } }] });
  ({ id, prodId, qtd });

module.exports = {
  getById,
  getAll,
  create,
  update,
};
