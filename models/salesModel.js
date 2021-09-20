const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (sales) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sales });
  return result.ops[0];
};

const getProductId = async (productId) => {
  if (!ObjectId.isValid(productId)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne({ productId: ObjectId(productId) });
  return result;
};

const getSales = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const getSalesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  addSales,
  getProductId,
  getSales,
  getSalesId,
};
