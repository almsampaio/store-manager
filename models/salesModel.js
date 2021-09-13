const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (itensSold) => {
  const db = await connect();
  const salesItens = await db.collection('sales').insertOne({ itensSold });
  return salesItens.ops[0];
};

const getAllSales = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await connect();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  console.log(sales);
  return sales;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
};
