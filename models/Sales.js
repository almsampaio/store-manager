const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (itensSold) => {
  const db = await connection();
  const products = await db.collection('sales').insertOne({ itensSold });
  return products.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const findAllSales = await db.collection('sales').find().toArray();
  return findAllSales;
};

const getSaleById = async (idSale) => {
  if (!ObjectId.isValid(idSale)) return null;
  const db = await connection();
  const findByIdSale = await db.collection('sales').findOne({ _id: ObjectId(idSale) });
  // console.log(findByIdSale);
  return findByIdSale;
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
