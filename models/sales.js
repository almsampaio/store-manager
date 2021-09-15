const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (sales) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne(sales);
  return (newSale.ops[0]);
};

const findSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return ({ sales });
};

const findSalesById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const findSaleAndUpdate = async (id, sales) => {
  const db = await connection();
  const sale = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: sales } },
    { returnOriginal: false },
  );
  return sale.value;
};

const findSaleAndDelete = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOneAndDelete(
    { _id: ObjectId(id) },
  );
  return sale.value;
};

module.exports = {
  createSale,
  findSales,
  findSalesById,
  findSaleAndUpdate,
  findSaleAndDelete,
};