const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return { sales };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const create = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });

  return { _id: result.insertedId, itensSold };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  
  const sale = await getSaleById(id);
  return sale;
};

const deleteSale = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  create,
  getSaleById,
  update,
  deleteSale,
};
