// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (productId, quantity) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: { productId, quantity } });
  return { _id: newSale.insertedId, newSale }; 
};

const getAllSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

module.exports = {
  createSale,
  getAllSales,
};
