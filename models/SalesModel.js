const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const createSale = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

const getProductsSold = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').findOne({ itensSold });
  return result;
};

const getAll = async () => {
  const db = await getConnection();
  const result = await db.collection('sales').find({}).toArray();
  return result;
};

const getById = async (saleId) => {
  if (!ObjectID.isValid(saleId)) return null;
  const db = await getConnection();
  const result = await db.collection('sales').findOne({ _id: ObjectID(saleId) });
  return result;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
   await db.collection('sales')
  .updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }, { upsert: true });
  const result = await getById(id);
  return result;
};

const deleteSale = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await getConnection();
  const result = await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return result;
};

module.exports = {
  createSale,
  getProductsSold,
  getAll,
  getById,
  updateSale,
  deleteSale,
};