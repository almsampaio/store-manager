const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const createSales = async (sales) => {
  const db = await connection();
  const { ops } = await db.collection('sales').insertOne({ itensSold: sales });

  return ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();

  return sales;
};

const getByIdSales = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale;
};

const getUpdateSales = async (id, sales) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } });

  return { _id: id, itensSold: sales };
};

const removeSale = async (id) => {
  const db = await connection();
  const sale = await getByIdSales(id);
  if (!sale) return false;

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSales,
  getUpdateSales,
  removeSale,
};
