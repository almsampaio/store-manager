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

module.exports = { createSales, getAllSales, getSaleById }; 
