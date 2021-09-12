const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'sales';

// REQUISITO 5 _______________________________________________________________________//

const createSale = async (sales) => {
  const db = await connection();
  const addSales = await db.collection(COLLECTION_NAME).insertOne({ itensSold: sales });
  return addSales.ops[0];
};

// REQUISITO 6 _______________________________________________________________________//

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection(COLLECTION_NAME).find({}).toArray();
  return { sales };
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection(COLLECTION_NAME).findOne(ObjectId(id));
  return sale;
};

// __________________________________________________________________________________//

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
