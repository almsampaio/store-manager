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
  // console.log(sales);
  return sales;
};

const updateSalesById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  // console.log(salesUp);
  return getSalesById(id);
};

const deleteSales = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const deletedSale = db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  return deletedSale;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSalesById,
  deleteSales,
};
