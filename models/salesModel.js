const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
  const db = await connection();
  const addProductSold = await db.collection('sales').insertOne({ itensSold });
  return { _id: addProductSold.insertedId, itensSold };
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return product;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }, { upsert: true });

  const sale = getSaleById(id);
  return sale;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = { createSales, getAllSales, getSaleById, updateSale, deleteSale }; 
