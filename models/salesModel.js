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

module.exports = {
  addSales,
  getProductId,
};
