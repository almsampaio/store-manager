const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addSale = async (itensSold) => {
  const db = await connect();
  const product = await db.collection('sales').insertOne({ itensSold });
  return { _id: product.insertedId, itensSold };
};

const listSales = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const listSaleId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const saleId = await db.collection('sales').findOne(ObjectId(id));
  return saleId;
};

const updateSales = async (id, itensSold) => {
  const db = await connect();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return { _id: id, itensSold };
};

const excludeSales = async (id) => {
  const db = await connect();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addSale,
  listSales,
  listSaleId,
  updateSales,
  excludeSales,
};