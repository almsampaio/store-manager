const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const getSalesById = await db.collection('sales').findOne({ _id: ObjectID(id) });
  return getSalesById;
};

const createSale = async (itensSold) => {
  const db = await connection();
  const createdSale = await db.collection('sales').insertMany([{ itensSold }]);
  return { _id: Object.values(createdSale.insertedIds).toString(), itensSold };
};

const updateSale = async (id, itensSold) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales')
  .updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }, { upsert: true });
  const updatedSale = await getSaleById(id);
  return updatedSale;
};

const deleteSale = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectID(id) });
  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
