const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createSale = async (sales) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne({ itensSold: sales });

  return {
    _id,
    itensSold: sales,
  };
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find().toArray();
  return {
    sales,
  };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });

  if (!sale) return false;

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
