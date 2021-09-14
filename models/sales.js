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

module.exports = { createSale, findSales, findSalesById };